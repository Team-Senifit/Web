import type { NextConfig } from "next";

// /api 프록시 타겟: .env의 NEXT_PUBLIC_API_URL 사용 (없으면 로컬 기본값)
// - 예: NEXT_PUBLIC_API_URL=https://localhost:8443
// - 예: NEXT_PUBLIC_API_URL=https://dev.api.example.com/api  (베이스 경로 포함 가능)
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "https://localhost:8443")
  .trim()
  .replace(/\/+$/, ""); // trailing slash 제거

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.senifit.co.kr", port: "8443" },
      { protocol: "https", hostname: "picsum.photos" },
      {
        protocol: "https",
        hostname: "senifit-program-bk.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_BASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
