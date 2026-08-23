import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Coolify Docker deploy — copies a minimal server into .next/standalone
  output: "standalone",
};

export default nextConfig;
