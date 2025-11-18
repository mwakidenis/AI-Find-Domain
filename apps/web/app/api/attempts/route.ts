import { NextRequest, NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { handleApiError, getRequestId, ApiError } from "@/lib/errors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 10;

const MAX_ATTEMPTS = 5;

interface AttemptsMetadata {
  domainGenerationAttempts?: number;
}

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);
  try {
    const authObj = await auth();
    if (!authObj.userId)
      throw new ApiError("Unauthorized", 401, "UNAUTHORIZED");

    const client = await clerkClient();
    const user = await client.users.getUser(authObj.userId);
    const metadata = user.publicMetadata as AttemptsMetadata;
    const attempts = metadata.domainGenerationAttempts ?? MAX_ATTEMPTS;

    return NextResponse.json({
      success: true,
      remaining: attempts,
      max: MAX_ATTEMPTS,
    });
  } catch (error) {
    return handleApiError(error, requestId);
  }
}

export async function POST(request: NextRequest) {
  const requestId = getRequestId(request);
  try {
    const authObj = await auth();
    if (!authObj.userId)
      throw new ApiError("Unauthorized", 401, "UNAUTHORIZED");

    const client = await clerkClient();
    const user = await client.users.getUser(authObj.userId);
    const metadata = user.publicMetadata as AttemptsMetadata;
    const currentAttempts = metadata.domainGenerationAttempts ?? MAX_ATTEMPTS;

    if (currentAttempts <= 0)
      throw new ApiError("No attempts remaining", 403, "NO_ATTEMPTS");

    const newAttempts = currentAttempts - 1;
    await client.users.updateUser(authObj.userId, {
      publicMetadata: {
        ...user.publicMetadata,
        domainGenerationAttempts: newAttempts,
      },
    });

    return NextResponse.json({
      success: true,
      remaining: newAttempts,
      max: MAX_ATTEMPTS,
    });
  } catch (error) {
    return handleApiError(error, requestId);
  }
}

// DELETE endpoint removed for security - prevents unlimited rate limit resets
