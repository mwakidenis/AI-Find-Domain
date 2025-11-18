import { NextRequest, NextResponse } from "next/server";
import { checkDomainStatus } from "@find-my-domain/core";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface CheckDomainRequest {
  domain: string;
}

interface CheckMultipleDomainsRequest {
  domains: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CheckDomainRequest | CheckMultipleDomainsRequest;

    // Handle single domain check
    if ("domain" in body) {
      const { domain } = body;

      if (!domain) {
        return NextResponse.json(
          { error: "Domain is required" },
          { status: 400 }
        );
      }

      const result = await checkDomainStatus(domain);

      return NextResponse.json({
        success: true,
        result,
      });
    }

    // Handle multiple domains check
    if ("domains" in body) {
      const { domains } = body;

      if (!domains || domains.length === 0) {
        return NextResponse.json(
          { error: "Domains array is required" },
          { status: 400 }
        );
      }

      if (domains.length > 50) {
        return NextResponse.json(
          { error: "Maximum 50 domains can be checked at once" },
          { status: 400 }
        );
      }

      // Check all domains with a small delay between requests
      const results = [];
      for (const domain of domains) {
        try {
          const result = await checkDomainStatus(domain);
          results.push({
            ...result,
            domain: domain,
          });
          // Small delay to avoid rate limiting
          await new Promise((resolve) => setTimeout(resolve, 200));
        } catch (error) {
          results.push({
            domain: domain,
            ok: false,
            available: false,
            sale: false,
            duration: 0,
            error: error instanceof Error ? error.message : "Unknown error",
          });
        }
      }

      return NextResponse.json({
        success: true,
        results,
        total: results.length,
      });
    }

    return NextResponse.json(
      { error: "Invalid request format" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error checking domain:", error);
    return NextResponse.json(
      {
        error: "Failed to check domain availability",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

