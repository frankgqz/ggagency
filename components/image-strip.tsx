// Images served from the R2 bucket via the Worker route /images/*
// (app/images/[...key]/route.ts) — no public dev URL involved.
const R2_BASE = "/images";

const stripImages = Array.from({ length: 12 }, (_, i) => ({
  src: `${R2_BASE}/strip/${String(i + 1).padStart(2, "0")}.jpg`,
  label: `Photo ${i + 1}`,
}));

const gradients = [
  "from-orange-300 to-brand-orange/60",
  "from-sky-200 to-brand-navy/40",
  "from-amber-200 to-orange-400",
  "from-rose-200 to-brand-pink/50",
  "from-indigo-200 to-brand-navy/50",
  "from-purple-200 to-brand-pink/40",
];

export function ImageStrip() {
  return (
    <section className="w-full overflow-hidden bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex gap-3 overflow-x-auto pb-4 [scrollbar-width:thin]">
          {stripImages.map((img, i) => (
            <div
              key={i}
              className="relative h-[345px] w-[121px] shrink-0 overflow-hidden rounded-lg"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.label}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
