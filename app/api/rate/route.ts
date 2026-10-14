// Tiny rate endpoint — module-level cache keeps it one external fetch per
// isolate per hour (the free-tier shape: near-zero CPU per request).
const CACHE: { rate: number | null; ts: number } = { rate: null, ts: 0 };
const TTL_MS = 60 * 60 * 1000;

export async function GET() {
  if (CACHE.rate !== null && Date.now() - CACHE.ts < TTL_MS) {
    return Response.json({ rate: CACHE.rate }, {
      headers: { "cache-control": "public, max-age=300" },
    });
  }
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await res.json();
    const rate = Math.round(data.rates.AUD * 1000) / 1000; // 3 decimal places
    CACHE.rate = rate;
    CACHE.ts = Date.now();
    return Response.json({ rate }, {
      headers: { "cache-control": "public, max-age=300" },
    });
  } catch {
    // fail-soft: last known rate (may be null) rather than an error
    return Response.json({ rate: CACHE.rate }, {
      headers: { "cache-control": "public, max-age=60" },
    });
  }
}
