import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", //for docker build
};

export default nextConfig;
