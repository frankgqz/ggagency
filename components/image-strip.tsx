const stripItems = [
  "Live", "Stage", "Host", "Star", "Show", "Dance",
  "Sing", "Crowd", "Glow", "Vibe", "Night", "Cheers",
];

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
          {stripItems.map((label, i) => (
            <div
              key={i}
              className={`relative h-[345px] w-[121px] shrink-0 overflow-hidden rounded-lg bg-gradient-to-b ${gradients[i % gradients.length]}`}
            >
              <div className="absolute inset-0 flex items-end justify-center pb-6">
                <span className="text-xs font-medium text-white/80">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
