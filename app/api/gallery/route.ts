import { getCloudflareContext } from "@opennextjs/cloudflare";

// Tiny read endpoint: one prepared query, no Payload init. The admin (Payload)
// is the write side; this is the lean read side — both share the same tables.
export async function GET() {
  const { env } = await getCloudflareContext({ async: true });
  const { results } = await env.ggagency_db
    .prepare('SELECT "order", kind, key, youtube_id, width, height FROM gallery ORDER BY "order" ASC')
    .all();
  const items = (results as any[]).map((r) => ({
    order: r.order,
    kind: r.kind,
    key: r.key,
    youtubeId: r.youtube_id,
    width: r.width,
    height: r.height,
  }));
  return new Response(JSON.stringify(items), {
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}
