import { NextRequest, NextResponse } from "next/server";
import { generateDomainNames } from "@find-my-domain/core";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface GenerateRequest {
  keywords: string[];
  domains: string[];
  count: number;
  model?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as GenerateRequest;
    const { keywords, domains, count, model = "gpt-4o-mini" } = body;

    // Validate API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key is not configured. Set OPENAI_API_KEY environment variable." },
        { status: 500 }
      );
    }

    // Validate input
    if (!keywords && !domains) {
      return NextResponse.json(
        { error: "Please provide either keywords or example domains" },
        { status: 400 }
      );
    }

    if (count < 1 || count > 100) {
      return NextResponse.json(
        { error: "Count must be between 1 and 100" },
        { status: 400 }
      );
    }

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
    });
  } catch (error) {
    console.error("Error generating domains:", error);
    return NextResponse.json(
      {
        error: "Failed to generate domain names",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

