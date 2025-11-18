import { NextRequest, NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { handleApiError, getRequestId, ApiError } from "@/lib/errors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 10;

const MAX_ATTEMPTS = 5;

const getAuthUser = async () => {
  const { userId } = await auth();
  if (!userId) throw new ApiError("Unauthorized", 401, "UNAUTHORIZED");
  const user = await (await clerkClient()).users.getUser(userId);
  return { userId, user, attempts: (user.publicMetadata.domainGenerationAttempts as number) ?? MAX_ATTEMPTS };
};

export async function GET(req: NextRequest) {
  try {
    const { attempts } = await getAuthUser();
    return NextResponse.json({ success: true, remaining: attempts, max: MAX_ATTEMPTS });
  } catch (error) {
    return handleApiError(error, getRequestId(req));
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, user, attempts } = await getAuthUser();
    if (attempts <= 0) throw new ApiError("No attempts remaining", 403, "NO_ATTEMPTS");
    const newAttempts = attempts - 1;
    await (await clerkClient()).users.updateUser(userId, {
      publicMetadata: { ...user.publicMetadata, domainGenerationAttempts: newAttempts },
    });
    return NextResponse.json({ success: true, remaining: newAttempts, max: MAX_ATTEMPTS });
  } catch (error) {
    return handleApiError(error, getRequestId(req));
  }
}

// DELETE removed for security
