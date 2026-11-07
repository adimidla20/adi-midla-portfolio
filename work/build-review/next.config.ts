import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: ".next-review-build",
  images: { formats: ["image/avif", "image/webp"] },
  experimental: {
    cpus: 1,
    webpackBuildWorker: false,
  },
};

export default nextConfig;

