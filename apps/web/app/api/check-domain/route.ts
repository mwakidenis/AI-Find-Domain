import { NextRequest, NextResponse } from "next/server";
import { checkDomainStatus } from "@find-my-domain/core";
import { z } from "zod";
import { handleApiError, getRequestId, getClientIp, ApiError } from "@/lib/errors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const BLOCKED_PATTERNS = ["localhost", "127.0.0.1", "0.0.0.0", "192.168.", "10.", "172.16.", "169.254.", "metadata", ".local", ".internal", ".private", "example.com", "test.com"];
const SUSPICIOUS_PATTERNS = [/(.)\1{5,}/, /[<>{}[\]\\]/];

const validateDomain = (domain: string) => {
  const lower = domain.toLowerCase();
  if (BLOCKED_PATTERNS.some(p => lower.includes(p)) || /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(domain)) {
    throw new ApiError(`Domain blocked: ${domain}`, 400, "BLOCKED_DOMAIN");
  }
  if (SUSPICIOUS_PATTERNS.some(p => p.test(domain))) {
    throw new ApiError("Suspicious domain format", 400, "INVALID_DOMAIN");
  }
};

const DomainSchema = z.string().min(3).max(253).regex(/^[a-z0-9][a-z0-9-]*[a-z0-9](\.[a-z0-9][a-z0-9-]*[a-z0-9])*\.[a-z]{2,}$/i);
const CheckDomainSchema = z.object({ domain: DomainSchema });
const CheckMultipleDomainsSchema = z.object({ domains: z.array(DomainSchema).min(1).max(15) });

export async function POST(request: NextRequest) {
  const requestId = getRequestId(request);
  const clientIp = getClientIp(request);
  
  try {
    const body = await request.json();

    if ("domain" in body) {
      const { domain } = CheckDomainSchema.parse(body);
      validateDomain(domain);
      const result = await checkDomainStatus(domain);
      console.log(`[${requestId}] SINGLE: ip=${clientIp}, domain=${domain}, available=${result.available}`);
      return NextResponse.json({ success: true, result });
    }

    if ("domains" in body) {
      const { domains } = CheckMultipleDomainsSchema.parse(body);
      domains.forEach(validateDomain);

      if (new Set(domains).size !== domains.length) {
        throw new ApiError("Duplicate domains detected", 400, "DUPLICATE_DOMAINS");
      }

      const results = await Promise.all(
        domains.map(async (domain, i) => {
          await new Promise(r => setTimeout(r, i * 250)); // Stagger requests
          try {
            const result = await checkDomainStatus(domain);
            return { ...result, domain };
          } catch (error) {
            return { domain, ok: false, available: false, sale: false, duration: 0, error: "Check failed" };
          }
        })
      );

      console.log(`[${requestId}] MULTI: ip=${clientIp}, count=${domains.length}`);
      return NextResponse.json({ success: true, results, total: results.length });
    }

    throw new ApiError("Invalid request", 400, "INVALID_REQUEST");
  } catch (error) {
    console.error(`[${requestId}] ERROR: ip=${clientIp}`);
    return handleApiError(error, requestId);
  }
}
