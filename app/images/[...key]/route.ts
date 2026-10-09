import { getCloudflareContext } from "@opennextjs/cloudflare";

const TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  svg: "image/svg+xml",
};

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ key: string[] }> }
) {
  const { key } = await ctx.params;
  const objectKey = key.join("/");

  if (objectKey.includes("..")) {
    return new Response("Not found", { status: 404 });
  }

  const { env } = await getCloudflareContext({ async: true });
  const object = await env.ggagency_images.get(objectKey);
  if (!object) {
    return new Response("Not found", { status: 404 });
  }

  const ext = objectKey.split(".").pop()?.toLowerCase() ?? "";
  const headers = new Headers();
  headers.set(
    "content-type",
    object.httpMetadata?.contentType ?? TYPES[ext] ?? "application/octet-stream"
  );
  headers.set("cache-control", "public, max-age=86400");
  headers.set("etag", object.httpEtag);

  return new Response(object.body, { headers });
}
