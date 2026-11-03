const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // This app lives in a subfolder of a repo whose root is another Next.js app.
  // Pin the workspace root to this folder so Turbopack never infers the repo
  // root (and pulls in the parent app's src/proxy.ts) when a parent lockfile
  // exists.
  turbopack: {
    root: path.join(__dirname),
  },
  outputFileTracingRoot: path.join(__dirname),
};

module.exports = nextConfig;
