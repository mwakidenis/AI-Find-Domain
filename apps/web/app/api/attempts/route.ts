import { NextRequest, NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_ATTEMPTS = 5;

interface AttemptsMetadata {
  domainGenerationAttempts?: number;
}

export async function GET(request: NextRequest) {
  try {
    const authObj = await auth();

    if (!authObj.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
    console.error("Error getting attempts:", error);
    return NextResponse.json(
      {
        error: "Failed to get attempts",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authObj = await auth();

    if (!authObj.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clerkClient();
    const user = await client.users.getUser(authObj.userId);

    const metadata = user.publicMetadata as AttemptsMetadata;
    const currentAttempts = metadata.domainGenerationAttempts ?? MAX_ATTEMPTS;

    if (currentAttempts <= 0) {
      return NextResponse.json(
        {
          error: "No attempts remaining",
          remaining: 0,
          max: MAX_ATTEMPTS,
        },
        { status: 403 },
      );
    }

    // Decrement attempts
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
    console.error("Error decrementing attempts:", error);
    return NextResponse.json(
      {
        error: "Failed to decrement attempts",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authObj = await auth();

    if (!authObj.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clerkClient();
    const user = await client.users.getUser(authObj.userId);

    // Reset attempts to MAX_ATTEMPTS
    await client.users.updateUser(authObj.userId, {
      publicMetadata: {
        ...user.publicMetadata,
        domainGenerationAttempts: MAX_ATTEMPTS,
      },
    });

    return NextResponse.json({
      success: true,
      remaining: MAX_ATTEMPTS,
      max: MAX_ATTEMPTS,
    });
  } catch (error) {
    console.error("Error resetting attempts:", error);
    return NextResponse.json(
      {
        error: "Failed to reset attempts",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
