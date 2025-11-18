import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://clerk.com https://*.clerk.accounts.dev; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.openai.com https://clerk.com https://*.clerk.accounts.dev; frame-src https://*.clerk.accounts.dev;",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@find-my-domain/core"],
  typescript: { ignoreBuildErrors: false },
  experimental: { serverActions: { bodySizeLimit: "1mb" } },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/api/:path*",
        headers: [
          ...securityHeaders,
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
