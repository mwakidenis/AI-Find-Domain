import { NextRequest, NextResponse } from "next/server";
import { checkDomainStatus } from "@find-my-domain/core";
import { z } from "zod";
import {
  handleApiError,
  getRequestId,
  getClientIp,
  ApiError,
} from "@/lib/errors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const BLOCKED = [
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "192.168.",
  "10.",
  "172.16.",
  "169.254.",
  "metadata",
  ".local",
  ".internal",
  ".private",
  "example.com",
  "test.com",
];
const IP_REGEX = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
const SUSPICIOUS_REGEX = /(.)\1{5,}|[<>{}[\]\\]/;

const DomainSchema = z
  .string()
  .min(3)
  .max(253)
  .regex(
    /^[a-z0-9][a-z0-9-]*[a-z0-9](\.[a-z0-9][a-z0-9-]*[a-z0-9])*\.[a-z]{2,}$/i,
    "Invalid format",
  )
  .transform((v) => v.toLowerCase())
  .superRefine((d, ctx) => {
    if (IP_REGEX.test(d))
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "IP not allowed" });
    if (BLOCKED.some((p) => d.includes(p)))
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Blocked domain" });
    if (SUSPICIOUS_REGEX.test(d))
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Suspicious format",
      });
  });

const SingleSchema = z.object({ domain: DomainSchema });
const MultiSchema = z
  .object({ domains: z.array(DomainSchema).min(1).max(15) })
  .refine((d) => new Set(d.domains).size === d.domains.length, {
    message: "Duplicates detected",
    path: ["domains"],
  });

export async function POST(req: NextRequest) {
  const requestId = getRequestId(req),
    clientIp = getClientIp(req);
  try {
    const body = await req.json();

    if ("domain" in body) {
      const { domain } = SingleSchema.parse(body);
      const result = await checkDomainStatus(domain);
      console.log(
        `[${requestId}] SINGLE: ip=${clientIp}, domain=${domain}, available=${result.available}`,
      );
      return NextResponse.json({ success: true, result });
    }

    if ("domains" in body) {
      const { domains } = MultiSchema.parse(body);
      const results = await Promise.all(
        domains.map(async (domain, i) => {
          await new Promise((r) => setTimeout(r, i * 250));
          try {
            return { ...(await checkDomainStatus(domain)), domain };
          } catch {
            return {
              domain,
              ok: false,
              available: false,
              sale: false,
              duration: 0,
              error: "Check failed",
            };
          }
        }),
      );
      console.log(
        `[${requestId}] MULTI: ip=${clientIp}, count=${domains.length}`,
      );
      return NextResponse.json({
        success: true,
        results,
        total: results.length,
      });
    }

    throw new ApiError("Invalid request", 400, "INVALID_REQUEST");
  } catch (error) {
    console.error(`[${requestId}] ERROR: ip=${clientIp}`);
    return handleApiError(error, requestId);
  }
}
