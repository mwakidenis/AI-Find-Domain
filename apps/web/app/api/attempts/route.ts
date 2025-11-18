import { NextRequest, NextResponse } from "next/server";
import { handleApiError, getRequestId, ApiError } from "@/lib/errors";
import { getAuthUser } from "@/lib/auth";
import {
  MAX_ATTEMPTS,
  ERROR_MESSAGES,
  ERROR_CODES,
} from "@/lib/constants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 10;

export async function GET(req: NextRequest) {
  const requestId = getRequestId(req);
  try {
    const { userId, user } = await getAuthUser();
    const attempts =
      (user.publicMetadata.domainGenerationAttempts as number) ?? MAX_ATTEMPTS;
    console.log(
      `[${requestId}] GET attempts: user=${userId}, remaining=${attempts}`,
    );
    return NextResponse.json({
      success: true,
      remaining: attempts,
      max: MAX_ATTEMPTS,
    });
  } catch (error) {
    return handleApiError(error, requestId);
  }
}

export async function POST(req: NextRequest) {
  const requestId = getRequestId(req);
  try {
    const { userId, user, client } = await getAuthUser();
    const attempts =
      (user.publicMetadata.domainGenerationAttempts as number) ?? MAX_ATTEMPTS;
    if (attempts <= 0)
      throw new ApiError(
        ERROR_MESSAGES.NO_ATTEMPTS,
        403,
        ERROR_CODES.NO_ATTEMPTS,
      );
    const newAttempts = attempts - 1;
    await client.users.updateUser(userId, {
      publicMetadata: {
        ...user.publicMetadata,
        domainGenerationAttempts: newAttempts,
      },
    });
    console.log(
      `[${requestId}] POST decrement: user=${userId}, remaining=${newAttempts}`,
    );
    return NextResponse.json({
      success: true,
      remaining: newAttempts,
      max: MAX_ATTEMPTS,
    });
  } catch (error) {
    return handleApiError(error, requestId);
  }
}
