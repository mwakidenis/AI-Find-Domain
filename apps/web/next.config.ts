import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@find-my-domain/core"],
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
