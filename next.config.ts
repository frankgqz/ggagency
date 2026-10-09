import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  /* config options here */
};

// Makes `next dev` see the wrangler.jsonc bindings (D1 etc.) like production.
initOpenNextCloudflareForDev();

export default nextConfig;
