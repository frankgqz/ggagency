// Minimal Cloudflare bindings typing.
// TODO: switch to `@cloudflare/workers-types` (add as devDependency on the
// host) for full typing — this hand-rolled slice keeps node_modules untouched.

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<unknown>;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface R2ObjectBody {
  body: ReadableStream | null;
  httpEtag: string;
  httpMetadata?: { contentType?: string };
}

interface R2Bucket {
  get(key: string): Promise<R2ObjectBody | null>;
}

interface CloudflareEnv {
  ggagency_db: D1Database;
  ggagency_images: R2Bucket;
  // vars (wrangler.jsonc) — non-secret config
  CONTACT_NOTIFY_TO?: string; // comma-separated recipient list
  CONTACT_FROM?: string; // e.g. "GG Agency Forms <forms@ggagency.com.au>"
  // secret (wrangler secret put RESEND_API_KEY)
  RESEND_API_KEY?: string;
}
