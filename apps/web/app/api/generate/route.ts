import { NextRequest, NextResponse } from "next/server";
import { generateDomainNames } from "@find-my-domain/core";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";
import { handleApiError, getRequestId, getClientIp, ApiError } from "@/lib/errors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const MAX_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

const requestLog = new Map<string, { count: number; timestamp: number }>();

const GenerateRequestSchema = z.object({
  keywords: z.array(z.string().min(1).max(50).regex(/^[a-zA-Z0-9\s-]+$/)).max(10).optional(),
  domains: z.array(z.string().min(1).max(63).regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/i)).max(10).optional(),
  count: z.number().int().min(1).max(25),
});

interface AttemptsMetadata {
  domainGenerationAttempts?: number;
  emailVerified?: boolean;
  lastGenerationTime?: number;
}

const checkRateLimit = (key: string): boolean => {
  const now = Date.now();
  const record = requestLog.get(key);
  
  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    requestLog.set(key, { count: 1, timestamp: now });
    return true;
  }
  
  if (record.count >= MAX_REQUESTS_PER_WINDOW) return false;
  
  record.count++;
  return true;
};

export async function POST(request: NextRequest) {
  const requestId = getRequestId(request);
  const clientIp = getClientIp(request);
  
  try {
    // Rate limit by IP
    if (!checkRateLimit(clientIp)) {
      throw new ApiError("Too many requests. Please try again later.", 429, "RATE_LIMIT_EXCEEDED");
    }

    const authObj = await auth();
    if (!authObj.userId) throw new ApiError("Unauthorized", 401, "UNAUTHORIZED");

    // Rate limit by user
    if (!checkRateLimit(authObj.userId)) {
      throw new ApiError("Too many requests. Please slow down.", 429, "RATE_LIMIT_EXCEEDED");
    }

    const client = await clerkClient();
    const user = await client.users.getUser(authObj.userId);
    
    // Check email verification
    const emailVerified = user.emailAddresses?.[0]?.verification?.status === "verified";
    if (!emailVerified) {
      throw new ApiError("Please verify your email before using this service", 403, "EMAIL_NOT_VERIFIED");
    }

    const metadata = user.publicMetadata as AttemptsMetadata;
    const currentAttempts = metadata.domainGenerationAttempts ?? MAX_ATTEMPTS;

    if (currentAttempts <= 0) {
      throw new ApiError("No attempts remaining", 403, "NO_ATTEMPTS");
    }

    // Prevent race conditions with timestamp check
    const now = Date.now();
    const lastGen = metadata.lastGenerationTime || 0;
    if (now - lastGen < 2000) {
      throw new ApiError("Please wait before generating again", 429, "TOO_FAST");
    }

    const body = await request.json();
    const { keywords = [], domains = [], count } = GenerateRequestSchema.parse(body);

    if (keywords.length === 0 && domains.length === 0) {
      throw new ApiError("Provide keywords or domains", 400, "MISSING_INPUT");
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new ApiError("Service unavailable", 503, "SERVICE_ERROR");

    const newAttempts = currentAttempts - 1;
    await client.users.updateUser(authObj.userId, {
      publicMetadata: {
        ...user.publicMetadata,
        domainGenerationAttempts: newAttempts,
        lastGenerationTime: now,
      },
    });

    const names = await generateDomainNames({
      keywords,
      domains,
      count,
      apiKey,
      model: "gpt-4o-mini",
    });

    console.log(`[${requestId}] SUCCESS: user=${authObj.userId}, ip=${clientIp}, count=${count}, remaining=${newAttempts}`);

    return NextResponse.json({ success: true, names, count: names.length, remaining: newAttempts });
  } catch (error) {
    console.error(`[${requestId}] ERROR: ip=${clientIp}, error=${error instanceof Error ? error.message : "unknown"}`);
    return handleApiError(error, requestId);
  }
}
