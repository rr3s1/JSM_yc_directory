import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  // Enables caching for components to support PPR
  cacheComponents: true,

  experimental: {
    // Enables the unstable_after API for non-blocking server tasks
  },

  devIndicators: {
    position: "bottom-right",
  },
};

export default nextConfig;