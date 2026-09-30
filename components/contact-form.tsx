"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

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
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 px-4 py-16 sm:px-6 lg:py-24">
        <h2 className="text-4xl font-normal text-brand-orange sm:text-5xl">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <input
            required
            name="name"
            placeholder="Name"
            className="h-12 w-full rounded-lg border border-neutral-300 px-4 text-base text-brand-navy outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
          />
          <input
            required
            name="whatsapp"
            type="tel"
            placeholder="Whatsapp #"
            className="h-12 w-full rounded-lg border border-neutral-300 px-4 text-base text-brand-navy outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
          />
          <input
            required
            name="email"
            type="email"
            placeholder="Email"
            className="h-12 w-full rounded-lg border border-neutral-300 px-4 text-base text-brand-navy outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
          />
          <textarea
            required
            name="message"
            placeholder="Message"
            rows={5}
            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-base text-brand-navy outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
          />
          <Button
            type="submit"
            size="lg"
            disabled={status === "sending"}
            className="h-12 rounded-full bg-brand-orange px-10 text-base font-medium text-white hover:bg-brand-orange/90"
          >
            {status === "sending"
              ? "Sending…"
              : status === "sent"
                ? "Sent ✓"
                : "Send"}
          </Button>
        </form>
      </div>
    </section>
  );
}
