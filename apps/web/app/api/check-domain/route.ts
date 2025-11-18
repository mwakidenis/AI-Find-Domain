import { NextRequest, NextResponse } from "next/server";
import { checkDomainStatus } from "@find-my-domain/core";
import { z } from "zod";
import {
  handleApiError,
  getRequestId,
  getClientIp,
  ApiError,
} from "@/lib/errors";
import {
  MAX_DOMAINS_CHECK,
  MAX_DOMAIN_LENGTH,
  MIN_DOMAIN_LENGTH,
  BLOCKED_DOMAINS,
  REGEX,
  ERROR_MESSAGES,
  ERROR_CODES,
  WHOIS_STAGGER_DELAY_MS,
} from "@/lib/constants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const DomainSchema = z
  .string()
  .min(MIN_DOMAIN_LENGTH)
  .max(MAX_DOMAIN_LENGTH)
  .regex(REGEX.DOMAIN_FULL, "Invalid format")
  .transform((v) => v.toLowerCase())
  .superRefine((d, ctx) => {
    if (REGEX.IP.test(d))
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "IP not allowed" });
    if (BLOCKED_DOMAINS.some((p) => d.includes(p)))
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Blocked domain" });
    if (REGEX.SUSPICIOUS.test(d))
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Suspicious format",
      });
  });

const SingleSchema = z.object({ domain: DomainSchema });
const MultiSchema = z
  .object({ domains: z.array(DomainSchema).min(1).max(MAX_DOMAINS_CHECK) })
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
          await new Promise((r) => setTimeout(r, i * WHOIS_STAGGER_DELAY_MS));
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

    throw new ApiError(
      ERROR_MESSAGES.INVALID_REQUEST,
      400,
      ERROR_CODES.INVALID_REQUEST,
    );
  } catch (error) {
    console.error(`[${requestId}] ERROR: ip=${clientIp}`);
    return handleApiError(error, requestId);
  }
}
