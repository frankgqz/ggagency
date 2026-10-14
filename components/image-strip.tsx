"use client";

import { useEffect, useState } from "react";

// Images served from the R2 bucket via the Worker route /images/*
// (app/images/[...key]/route.ts) — no public dev URL involved.
const R2_BASE = "/images";

const stripImages = Array.from({ length: 12 }, (_, i) => ({
  src: `${R2_BASE}/strip/${String(i + 1).padStart(2, "0")}.jpg`,
  label: `Photo ${i + 1}`,
}));

// Standard horizontal strip — native scroll, click to zoom (Frank 2026-10-15).

export function ImageStrip() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section className="relative w-full bg-background py-12">
      <div className="mx-auto max-w-6xl px-4 pb-8 text-center sm:px-6">
        <h2 className="font-heading text-[2rem] font-normal leading-tight text-heading sm:text-[2.5rem]">
          Moments Along The Way
        </h2>
        <p className="mt-2 text-[17px] leading-[1.73] text-subtext">
          The GG Agency journey, in pictures.
        </p>
      </div>
      <div className="overflow-x-auto">
        <div className="flex w-max items-center px-4 pb-2 sm:px-6">
          <div className="flex gap-1.5">
            {stripImages.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`View ${img.label} larger`}
                className="relative aspect-[121/345] h-[clamp(300px,46vh,480px)] shrink-0 cursor-zoom-in overflow-hidden rounded-lg transition hover:opacity-90"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.label}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mx-auto max-w-6xl px-4 pt-6 text-center text-[17px] leading-[1.73] text-subtext sm:px-6">
        Tap any photo to view it larger.
      </p>

      {open !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-6"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={stripImages[open].src}
            alt={stripImages[open].label}
            className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close"
            className="absolute top-5 right-6 rounded-full bg-background/15 px-3 py-1.5 font-sans text-sm text-on-ink transition hover:bg-background/30"
          >
            ✕ Close
          </button>
        </div>
      )}
    </section>
  );
}
