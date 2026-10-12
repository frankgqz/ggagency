import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  // Template-exact: only workerd-specific packages. (Do NOT add drizzle-kit
  // here — withPayload's source documents that Turbopack turns these into
  // hashed external ids OpenNext can't resolve; the stub alias below is the
  // correct Turbopack-layer port of the template's webpack trick.)
  serverExternalPackages: ["jose", "pg-cloudflare"],
  turbopack: {
    resolveAlias: {
      "drizzle-kit": "./lib/drizzle-kit-stub.js",
      "drizzle-kit/api": "./lib/drizzle-kit-stub.js",
    },
  },
  images: {
    localPatterns: [
      { pathname: "/api/media/file/**" },
      { pathname: "/images/**" },
    ],
  },
  webpack: (webpackConfig: any) => {
    webpackConfig.resolve.extensionAlias = {
      ".cjs": [".cts", ".cjs"],
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    };
    return webpackConfig;
  },
};

// Makes `next dev` see the wrangler.jsonc bindings (D1 etc.) like production.
// Dev uses LOCAL mock bindings (standard split): the deployed worker always
// reads the real D1/R2 — `remote` flags in wrangler.jsonc are dev-time hints.
initOpenNextCloudflareForDev();

// withPayload (template-exact): devBundleServerPackages:false keeps
// server-only packages (drizzle-kit, esbuild, libsql natives) out of the
// dev bundle — that's the fix for the "Unknown module type" / libsql errors.
export default withPayload(nextConfig, { devBundleServerPackages: false });
