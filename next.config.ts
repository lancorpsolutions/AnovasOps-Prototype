import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "host", value: "anovas-ops-prototype.vercel.app" }],
        destination: "/anovasos",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
