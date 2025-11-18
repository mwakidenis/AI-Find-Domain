import { NextRequest, NextResponse } from "next/server";
import { generateDomainNames } from "@find-my-domain/core";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_ATTEMPTS = 5;

interface GenerateRequest {
  keywords: string[];
  domains: string[];
  count: number;
  model?: string;
}

interface AttemptsMetadata {
  domainGenerationAttempts?: number;
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authObj = await auth();
    if (!authObj.userId) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in to use the domain generator." },
        { status: 401 },
      );
    }

    // Check and decrement attempts
    const client = await clerkClient();
    const user = await client.users.getUser(authObj.userId);
    const metadata = user.publicMetadata as AttemptsMetadata;
    const currentAttempts = metadata.domainGenerationAttempts ?? MAX_ATTEMPTS;

    if (currentAttempts <= 0) {
      return NextResponse.json(
        {
          error: "No attempts remaining. You have used all 5 free generations.",
          remaining: 0,
        },
        { status: 403 },
      );
    }

    const body = (await request.json()) as GenerateRequest;
    const { keywords, domains, count, model = "gpt-4o-mini" } = body;

    // Validate API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "OpenAI API key is not configured. Set OPENAI_API_KEY environment variable.",
        },
        { status: 500 },
      );
    }

    // Validate input
    if (!keywords && !domains) {
      return NextResponse.json(
        { error: "Please provide either keywords or example domains" },
        { status: 400 },
      );
    }

    if (count < 1 || count > 25) {
      return NextResponse.json(
        { error: "Count must be between 1 and 25" },
        { status: 400 },
      );
    }

    // Decrement attempts BEFORE generation to prevent abuse
    const newAttempts = currentAttempts - 1;
    await client.users.updateUser(authObj.userId, {
      publicMetadata: {
        ...user.publicMetadata,
        domainGenerationAttempts: newAttempts,
      },
    });

    // Generate domain names using the core package
    const names = await generateDomainNames({
      keywords: keywords || [],
      domains: domains || [],
      count,
      apiKey,
      model,
    });

    return NextResponse.json({
      success: true,
      names,
      count: names.length,
      remaining: newAttempts,
    });
  } catch (error) {
    console.error("Error generating domains:", error);
    return NextResponse.json(
      {
        error: "Failed to generate domain names",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
