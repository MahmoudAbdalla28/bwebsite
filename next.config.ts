import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/bastion",
  trailingSlash: true,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
