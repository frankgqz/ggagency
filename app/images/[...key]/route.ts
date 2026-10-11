import { getCloudflareContext } from "@opennextjs/cloudflare";

const TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  svg: "image/svg+xml",
  mp4: "video/mp4",
  webm: "video/webm",
  mov: "video/quicktime",
};

export async function GET(
  req: Request,
  ctx: { params: Promise<{ key: string[] }> }
) {
  const { key } = await ctx.params;
  const objectKey = key.join("/");

  if (objectKey.includes("..")) {
    return new Response("Not found", { status: 404 });
  }

  const { env } = await getCloudflareContext({ async: true });
  // Range passthrough: video seeking needs 206 partial responses.
  const object = await env.ggagency_images.get(objectKey, { range: req.headers });
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
  headers.set("accept-ranges", "bytes");

  let status = 200;
  if (object.range) {
    const start = object.range.offset;
    const end = start + (object.range.length ?? object.size) - 1;
    status = 206;
    headers.set("content-range", `bytes ${start}-${end}/${object.size}`);
    headers.set("content-length", String(end - start + 1));
  } else {
    headers.set("content-length", String(object.size));
  }

  return new Response(object.body, { status, headers });
}
