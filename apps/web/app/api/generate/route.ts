import { NextRequest, NextResponse } from "next/server";
import { generateDomainNames } from "@find-my-domain/core";
import { z } from "zod";
import {
  handleApiError,
  getRequestId,
  getClientIp,
  ApiError,
} from "@/lib/errors";
import { getAuthUser } from "@/lib/auth";
import {
  MAX_ATTEMPTS,
  MAX_DOMAINS_TO_GENERATE,
  MAX_KEYWORDS,
  MAX_KEYWORD_LENGTH,
  MAX_DOMAIN_PART_LENGTH,
  MAX_EXAMPLE_DOMAINS,
  MIN_DOMAIN_COUNT,
  MIN_KEYWORD_LENGTH,
  RATE_LIMIT_DELAY_MS,
  OPENAI_MODEL,
  REGEX_PATTERNS,
  ERROR_MESSAGES,
  ERROR_CODES,
} from "@/lib/constants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const Schema = z
  .object({
    keywords: z
      .array(
        z
          .string()
          .min(MIN_KEYWORD_LENGTH)
          .max(MAX_KEYWORD_LENGTH)
          .regex(REGEX_PATTERNS.KEYWORD),
      )
      .max(MAX_KEYWORDS)
      .optional()
      .default([]),
    domains: z
      .array(
        z
          .string()
          .min(MIN_KEYWORD_LENGTH)
          .max(MAX_DOMAIN_PART_LENGTH)
          .regex(REGEX_PATTERNS.DOMAIN_PART),
      )
      .max(MAX_EXAMPLE_DOMAINS)
      .optional()
      .default([]),
    count: z.number().int().min(MIN_DOMAIN_COUNT).max(MAX_DOMAINS_TO_GENERATE),
  })
  .refine((d) => d.keywords.length || d.domains.length, {
    message: "Provide keywords or domains",
    path: ["keywords"],
  });

export async function POST(req: NextRequest) {
  const requestId = getRequestId(req),
    ip = getClientIp(req);
  try {
    const { userId, user, client } = await getAuthUser();
    if (user.emailAddresses?.[0]?.verification?.status !== "verified")
      throw new ApiError(
        ERROR_MESSAGES.EMAIL_NOT_VERIFIED,
        403,
        ERROR_CODES.EMAIL_NOT_VERIFIED,
      );

    const meta = user.publicMetadata as {
      domainGenerationAttempts?: number;
      lastGenerationTime?: number;
    };
    const attempts = meta.domainGenerationAttempts ?? MAX_ATTEMPTS,
      now = Date.now();

    if (attempts <= 0)
      throw new ApiError(
        ERROR_MESSAGES.NO_ATTEMPTS,
        403,
        ERROR_CODES.NO_ATTEMPTS,
      );
    if (now - (meta.lastGenerationTime || 0) < RATE_LIMIT_DELAY_MS)
      throw new ApiError(ERROR_MESSAGES.TOO_FAST, 429, ERROR_CODES.TOO_FAST);

    const { keywords, domains, count } = Schema.parse(await req.json());

    const names = await generateDomainNames({
      keywords,
      domains,
      count,
      apiKey: process.env.OPENAI_API_KEY!,
      model: OPENAI_MODEL,
    });

    const newAttempts = attempts - 1;
    await client.users.updateUser(userId, {
      publicMetadata: {
        ...user.publicMetadata,
        domainGenerationAttempts: newAttempts,
        lastGenerationTime: now,
      },
    });

    console.log(
      `[${requestId}] SUCCESS: user=${userId}, ip=${ip}, count=${count}, remaining=${newAttempts}`,
    );
    return NextResponse.json({
      success: true,
      names,
      count: names.length,
      remaining: newAttempts,
    });
  } catch (error) {
    console.error(
      `[${requestId}] ERROR: ip=${ip}, error=${error instanceof Error ? error.message : "unknown"}`,
    );
    return handleApiError(error, requestId);
  }
}
