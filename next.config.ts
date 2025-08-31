import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.senifit.co.kr", port: "8443" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
