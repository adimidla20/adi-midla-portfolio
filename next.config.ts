import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  experimental: {
    cpus: 1,
    webpackBuildWorker: false,
  },
};

export default nextConfig;
