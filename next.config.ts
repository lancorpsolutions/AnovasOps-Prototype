import type { NextConfig } from "next";

const MARKETING_SITE_ORIGIN = "http://site.anovasintegratedsystems.com";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      fallback: [
        {
          source: "/:path*",
          destination: `${MARKETING_SITE_ORIGIN}/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
