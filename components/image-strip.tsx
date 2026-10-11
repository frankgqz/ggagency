"use client";

import { useEffect, useRef, useState } from "react";

// Images served from the R2 bucket via the Worker route /images/*
// (app/images/[...key]/route.ts) — no public dev URL involved.
const R2_BASE = "/images";

const stripImages = Array.from({ length: 12 }, (_, i) => ({
  src: `${R2_BASE}/strip/${String(i + 1).padStart(2, "0")}.jpg`,
  label: `Photo ${i + 1}`,
}));

// Horizontal travel covers in 0.7x the vertical scroll distance (1.4x speed).
const SPEED = 0.7;

export function ImageStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const track = trackRef.current;
    if (!section || !frame || !track) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const viewportH = window.innerHeight;
      const travel = Math.max(track.scrollWidth - frame.clientWidth, 0);
      section.style.height = `${viewportH + travel * SPEED + 48}px`;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - viewportH;
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      track.style.transform = `translate3d(${-progress * travel}px, 0, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section ref={sectionRef} className="relative w-full bg-white">
      <div ref={frameRef} className="sticky top-0 h-screen">
        <div className="mx-auto flex h-full max-w-7xl items-center overflow-hidden px-4 sm:px-6">
          <div ref={trackRef} className="flex gap-1.5 will-change-transform">
            {stripImages.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`View ${img.label} larger`}
                className="relative aspect-[121/345] h-[clamp(320px,58vh,540px)] shrink-0 cursor-zoom-in overflow-hidden rounded-lg transition hover:opacity-90"
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

      {open !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
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
            className="absolute top-5 right-6 rounded-full bg-white/15 px-3 py-1.5 font-sans text-sm text-white transition hover:bg-white/30"
          >
            ✕ Close
          </button>
        </div>
      )}
    </section>
  );
}
