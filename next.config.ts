import type { NextConfig } from "next";
const config: NextConfig = {
  agentRules: false,
  turbopack: { root: process.cwd() },
  poweredByHeader: false,
  devIndicators: false,
  // All content is compiled from the local wiki; no database or runtime API is needed.
  output: "export",
  trailingSlash: true,
};
export default config;
