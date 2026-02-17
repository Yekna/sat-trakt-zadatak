import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "jobicy.com" }],
  },
};

export default nextConfig;
