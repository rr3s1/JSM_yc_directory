// Imports the NextConfig type for type-checking the configuration object.
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignores TypeScript build errors.
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configuration for Next.js Image optimization.
  images: {
    // Allows the use of SVG images from remote sources, which is disabled by default for security.
    dangerouslyAllowSVG: true,
    // Defines patterns for allowed external image sources.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*", // Allows images from any hostname under the https protocol.
      },
    ],
  },
  // Enables Partial Prerendering (PPR) via cacheComponents.
  cacheComponents: true,
  devIndicators: {
    position: "bottom-right",
  },
};

export default nextConfig;