import { NextRequest, NextResponse } from "next/server";
import { generateDomainNames } from "@find-my-domain/core";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";
import { handleApiError, getRequestId, getClientIp, ApiError } from "@/lib/errors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const MAX_ATTEMPTS = 5;
const RATE_LIMIT = { window: 60000, max: 10 };
const requestLog = new Map<string, { count: number; timestamp: number }>();

const Schema = z.object({
  keywords: z.array(z.string().min(1).max(50).regex(/^[a-zA-Z0-9\s-]+$/)).max(10).optional().default([]),
  domains: z.array(z.string().min(1).max(63).regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/i)).max(10).optional().default([]),
  count: z.number().int().min(1).max(25),
}).refine((d) => d.keywords.length || d.domains.length, { message: "Provide keywords or domains", path: ["keywords"] });

const checkRate = (key: string) => {
  const now = Date.now(), rec = requestLog.get(key);
  if (!rec || now - rec.timestamp > RATE_LIMIT.window) { requestLog.set(key, { count: 1, timestamp: now }); return true; }
  if (rec.count >= RATE_LIMIT.max) return false;
  rec.count++; return true;
};

export async function POST(req: NextRequest) {
  const requestId = getRequestId(req), ip = getClientIp(req);
  try {
    if (!checkRate(ip)) throw new ApiError("Rate limit exceeded", 429, "RATE_LIMIT");
    
    const { userId } = await auth();
    if (!userId) throw new ApiError("Unauthorized", 401, "UNAUTHORIZED");
    if (!checkRate(userId)) throw new ApiError("Rate limit exceeded", 429, "RATE_LIMIT");
    
    const user = await (await clerkClient()).users.getUser(userId);
    if (user.emailAddresses?.[0]?.verification?.status !== "verified") throw new ApiError("Verify email first", 403, "EMAIL_NOT_VERIFIED");
    
    const meta = user.publicMetadata as { domainGenerationAttempts?: number; lastGenerationTime?: number };
    const attempts = meta.domainGenerationAttempts ?? MAX_ATTEMPTS, now = Date.now();
    
    if (attempts <= 0) throw new ApiError("No attempts remaining", 403, "NO_ATTEMPTS");
    if (now - (meta.lastGenerationTime || 0) < 2000) throw new ApiError("Wait before generating", 429, "TOO_FAST");
    
    const { keywords, domains, count } = Schema.parse(await req.json());
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new ApiError("Service unavailable", 503, "SERVICE_ERROR");
    
    const newAttempts = attempts - 1;
    await (await clerkClient()).users.updateUser(userId, {
      publicMetadata: { ...user.publicMetadata, domainGenerationAttempts: newAttempts, lastGenerationTime: now },
    });
    
    const names = await generateDomainNames({ keywords, domains, count, apiKey, model: "gpt-4o-mini" });
    console.log(`[${requestId}] SUCCESS: user=${userId}, ip=${ip}, count=${count}, remaining=${newAttempts}`);
    return NextResponse.json({ success: true, names, count: names.length, remaining: newAttempts });
  } catch (error) {
    console.error(`[${requestId}] ERROR: ip=${ip}, error=${error instanceof Error ? error.message : "unknown"}`);
    return handleApiError(error, requestId);
  }
}
