import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true }, // 빌드 시 ESLint 스킵
  typescript: { ignoreBuildErrors: true }, // 빌드 시 타입체크 스킵
};

export default nextConfig;
