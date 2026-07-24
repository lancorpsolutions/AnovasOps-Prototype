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
      {
        source: "/growth-score",
        destination: "/aros-growth-score",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
