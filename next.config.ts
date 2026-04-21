import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/bastion",
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
