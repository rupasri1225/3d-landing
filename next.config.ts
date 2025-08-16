import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Skip ESLint checks during build (optional)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
