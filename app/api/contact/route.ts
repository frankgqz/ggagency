import { getCloudflareContext } from "@opennextjs/cloudflare";

const LIMITS = { name: 200, whatsapp: 40, email: 320, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const b = (body ?? {}) as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const whatsapp = typeof b.whatsapp === "string" ? b.whatsapp.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";

  if (!name || !whatsapp || !email || !message) {
    return Response.json({ ok: false, error: "Please fill in every field." }, { status: 400 });
  }
  if (
    name.length > LIMITS.name ||
    whatsapp.length > LIMITS.whatsapp ||
    email.length > LIMITS.email ||
    message.length > LIMITS.message
  ) {
    return Response.json({ ok: false, error: "One of the fields is too long." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: "That email doesn't look right." }, { status: 400 });
  }

  const { env } = await getCloudflareContext({ async: true });
  const db = env.ggagency_db as D1Database;

  await db
    .prepare("INSERT INTO contact_submissions (name, whatsapp, email, message) VALUES (?, ?, ?, ?)")
    .bind(name, whatsapp, email, message)
    .run();

  // Notify by email — fail-soft: the D1 row above is the source of truth.
  const to = (env.CONTACT_NOTIFY_TO ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (to.length > 0 && env.RESEND_API_KEY) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: env.CONTACT_FROM ?? "GG Agency Forms <forms@ggagency.com.au>",
          to,
          reply_to: email,
          subject: `New enquiry from ${name}`,
          text: `Name: ${name}\nWhatsApp: ${whatsapp}\nEmail: ${email}\n\n${message}`,
        }),
      });
    } catch {
      // notification failure must never lose the submission
    }
  }

  return Response.json({ ok: true });
}
