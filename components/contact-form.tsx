"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // TODO: wire to a server action / Workers endpoint
    await new Promise((r) => setTimeout(r, 500));
    setStatus("sent");
  }

  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 sm:px-6 lg:py-24">
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
          {/* Name + WhatsApp side by side */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              required
              name="name"
              placeholder="Name"
              className="h-[37px] w-full border border-neutral-400 bg-transparent px-2.5 py-[3px] font-sans text-sm text-black outline-none transition focus:border-black"
            />
            <input
              required
              name="whatsapp"
              type="tel"
              placeholder="Whatsapp #"
              className="h-[37px] w-full border border-neutral-400 bg-transparent px-2.5 py-[3px] font-sans text-sm text-black outline-none transition focus:border-black"
            />
          </div>
          <input
            required
            name="email"
            type="email"
            placeholder="Email"
            className="h-[37px] w-full border border-neutral-400 bg-transparent px-2.5 py-[3px] font-sans text-sm text-black outline-none transition focus:border-black"
          />
          <textarea
            required
            name="message"
            placeholder="Message"
            rows={3}
            className="min-h-[67px] w-full resize-none border border-neutral-400 bg-transparent px-2.5 pt-2.5 pb-[3px] font-sans text-sm text-black outline-none transition focus:border-black"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="h-9 w-[140px] bg-black font-sans text-sm text-white transition hover:opacity-80 disabled:opacity-50"
          >
            {status === "sending"
              ? "Sending…"
              : status === "sent"
                ? "Sent ✓"
                : "Send"}
          </button>
        </form>
      </div>
    </section>
  );
}
