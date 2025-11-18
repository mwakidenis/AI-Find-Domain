import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/api/generate(.*)",
  "/api/attempts(.*)",
  "/api/check-domain(.*)",
]);

const allowedOrigins = [
  process.env.NEXT_PUBLIC_BASE_URL || "https://find-my-domain.vercel.app",
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : null,
].filter(Boolean);

export default clerkMiddleware(async (auth, req) => {
  const requestId = crypto.randomUUID();
  const origin = req.headers.get("origin");

  // CORS preflight
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigins.includes(origin!)
          ? origin!
          : "",
        "Access-Control-Allow-Methods": "GET, POST",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400",
        "X-Request-ID": requestId,
      },
    });
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  const response = NextResponse.next();
  response.headers.set("X-Request-ID", requestId);
  if (allowedOrigins.includes(origin!)) {
    response.headers.set("Access-Control-Allow-Origin", origin!);
    response.headers.set("Access-Control-Allow-Credentials", "true");
  }
  return response;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
