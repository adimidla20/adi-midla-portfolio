import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: ".next-build-single",
  images: { formats: ["image/avif", "image/webp"] },
  experimental: {
    cpus: 1,
    webpackBuildWorker: false,
  },
};

export default nextConfig;
