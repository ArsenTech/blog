import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/blog",
  output: "export",
  images: {
    unoptimized: true
  }
};

export default nextConfig;
