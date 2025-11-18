import { NextResponse } from "next/server";
import { z } from "zod";
import { ERROR_MESSAGES, ERROR_CODES } from "./constants";

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = ERROR_CODES.INTERNAL_ERROR,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const sanitizeLog = (data: any) => {
  const str = JSON.stringify(data);
  return str.replace(
    /(api[_-]?key|token|password|secret)["']?\s*[:=]\s*["']?[^"',}\s]+/gi,
    "$1=REDACTED",
  );
};

export function handleApiError(
  error: unknown,
  requestId?: string,
): NextResponse {
  console.error(
    `[${requestId || "UNKNOWN"}]`,
    sanitizeLog({
      timestamp: new Date().toISOString(),
      error:
        error instanceof Error
          ? { name: error.name, message: error.message }
          : error,
    }),
  );

  if (error instanceof z.ZodError) {
    return NextResponse.json(
      {
        error: ERROR_MESSAGES.VALIDATION_ERROR,
        code: ERROR_CODES.VALIDATION_ERROR,
        details: error.issues[0]?.message,
      },
      { status: 400 },
    );
  }

  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.statusCode },
    );
  }

  return NextResponse.json(
    {
      error: "An unexpected error occurred.",
      code: ERROR_CODES.INTERNAL_ERROR,
    },
    { status: 500 },
  );
}

export const getRequestId = (req: Request) =>
  req.headers.get("x-request-id") || crypto.randomUUID();
export const getClientIp = (req: Request) =>
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  req.headers.get("x-real-ip") ||
  "unknown";
