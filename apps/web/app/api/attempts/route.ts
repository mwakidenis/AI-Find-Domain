import { NextRequest, NextResponse } from "next/server";
import { handleApiError, getRequestId, ApiError } from "@/lib/errors";
import { getAuthUser } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 10;

const MAX_ATTEMPTS = 5;

export async function GET(req: NextRequest) {
  try {
    const { user } = await getAuthUser();
    const attempts =
      (user.publicMetadata.domainGenerationAttempts as number) ?? MAX_ATTEMPTS;
    return NextResponse.json({
      success: true,
      remaining: attempts,
      max: MAX_ATTEMPTS,
    });
  } catch (error) {
    return handleApiError(error, getRequestId(req));
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, user, client } = await getAuthUser();
    const attempts =
      (user.publicMetadata.domainGenerationAttempts as number) ?? MAX_ATTEMPTS;
    if (attempts <= 0)
      throw new ApiError("No attempts remaining", 403, "NO_ATTEMPTS");
    const newAttempts = attempts - 1;
    await client.users.updateUser(userId, {
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
    return handleApiError(error, getRequestId(req));
  }
}

// DELETE removed for security
