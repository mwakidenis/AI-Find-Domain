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

// 🔥 100% ZOD VALIDATION - Using full power of Zod
const DomainSchema = z
  .string()
  .min(3, "Domain too short")
  .max(253, "Domain too long")
  .regex(
    /^[a-z0-9][a-z0-9-]*[a-z0-9](\.[a-z0-9][a-z0-9-]*[a-z0-9])*\.[a-z]{2,}$/i,
    "Invalid domain format",
  )
  .transform((val) => val.toLowerCase())
  .superRefine((domain, ctx) => {
    // Block IP addresses
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(domain)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "IP addresses not allowed",
      });
    }
    // Block internal/private domains
    const blocked = [
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
    if (blocked.some((p) => domain.includes(p))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Blocked domain pattern",
      });
    }
    // Block suspicious patterns (repeated chars, injection attempts)
    if (/(.)\1{5,}/.test(domain) || /[<>{}[\]\\]/.test(domain)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Suspicious domain format",
      });
    }
  });

const CheckDomainSchema = z.object({ domain: DomainSchema });

const CheckMultipleDomainsSchema = z
  .object({
    domains: z
      .array(DomainSchema)
      .min(1, "At least 1 domain required")
      .max(15, "Max 15 domains"),
  })
  .refine((data) => new Set(data.domains).size === data.domains.length, {
    message: "Duplicate domains detected",
    path: ["domains"],
  });

export async function POST(request: NextRequest) {
  const requestId = getRequestId(request);
  const clientIp = getClientIp(request);

  try {
    const body = await request.json();

    // Single domain check
    if ("domain" in body) {
      const { domain } = CheckDomainSchema.parse(body); // Zod handles all validation
      const result = await checkDomainStatus(domain);
      console.log(
        `[${requestId}] SINGLE: ip=${clientIp}, domain=${domain}, available=${result.available}`,
      );
      return NextResponse.json({ success: true, result });
    }

    // Multiple domains check
    if ("domains" in body) {
      const { domains } = CheckMultipleDomainsSchema.parse(body); // Zod handles validation + duplicates

      const results = await Promise.all(
        domains.map(async (domain, i) => {
          await new Promise((r) => setTimeout(r, i * 250)); // Stagger requests
          try {
            const result = await checkDomainStatus(domain);
            return { ...result, domain };
          } catch (error) {
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
