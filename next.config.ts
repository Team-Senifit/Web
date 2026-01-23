import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_API_URL
          ? new URL(process.env.NEXT_PUBLIC_API_URL).hostname
          : "api.senifit.co.kr",
        port: process.env.NEXT_PUBLIC_API_URL
          ? new URL(process.env.NEXT_PUBLIC_API_URL).port
          : "8443",
      },
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
        destination: `${process.env.NEXT_PUBLIC_API_URL || "https://api.senifit.co.kr:8443"}/:path*`,
      },
    ];
  },
};

export default nextConfig;
