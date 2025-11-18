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

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const MAX_ATTEMPTS = 5;

const Schema = z
  .object({
    keywords: z
      .array(
        z
          .string()
          .min(1)
          .max(50)
          .regex(/^[a-zA-Z0-9\s-]+$/),
      )
      .max(10)
      .optional()
      .default([]),
    domains: z
      .array(
        z
          .string()
          .min(1)
          .max(63)
          .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/i),
      )
      .max(10)
      .optional()
      .default([]),
    count: z.number().int().min(1).max(25),
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
      throw new ApiError("Verify email first", 403, "EMAIL_NOT_VERIFIED");

    const meta = user.publicMetadata as {
      domainGenerationAttempts?: number;
      lastGenerationTime?: number;
    };
    const attempts = meta.domainGenerationAttempts ?? MAX_ATTEMPTS,
      now = Date.now();

    if (attempts <= 0)
      throw new ApiError("No attempts remaining", 403, "NO_ATTEMPTS");
    if (now - (meta.lastGenerationTime || 0) < 2000)
      throw new ApiError("Wait before generating", 429, "TOO_FAST");

    const { keywords, domains, count } = Schema.parse(await req.json());

    const names = await generateDomainNames({
      keywords,
      domains,
      count,
      apiKey: process.env.OPENAI_API_KEY!,
      model: "gpt-4o-mini",
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
