const galleryItems = [
  {
    label: "Live Events",
    className: "aspect-[270/153]",
  },
  {
    label: "Community",
    className: "aspect-[270/152]",
  },
  {
    label: "Highlights",
    className: "aspect-[785/480] sm:col-span-2",
  },
  {
    label: "Moments",
    className: "aspect-[360/200]",
  },
  {
    label: "Our Streamers",
    className: "aspect-[121/345]",
  },
];

const gradients = [
  "from-orange-200 to-brand-orange/50",
  "from-sky-100 to-brand-navy/30",
  "from-amber-100 to-orange-300",
  "from-rose-100 to-brand-orange/40",
  "from-indigo-100 to-brand-navy/40",
];

export function Gallery() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-16 sm:px-6 lg:py-24">
        <h2 className="text-4xl font-normal text-brand-orange sm:text-5xl">
          Gallery
        </h2>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${gradients[i % gradients.length]} ${item.className}`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-medium text-brand-navy/70">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
