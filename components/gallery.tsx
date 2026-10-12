"use client";

import { useEffect, useMemo, useState } from "react";

type Item = { n: number; key: string; type: "image" | "video" | "youtube"; w: number; h: number };

// Real media served from R2 via /images/* — numbered = order of appearance.
// 17.mp4 is the hero video (kept out of the gallery).
// 1.mp4 (6-min long-form) lives on YouTube: https://youtu.be/XJlMWchGuXs
const galleryItems: Item[] = [
  { n: 1, key: "XJlMWchGuXs", type: "youtube", w: 16, h: 9 },
  { n: 2, key: "gallery/2.mp4", type: "video", w: 1920, h: 1080 },
  { n: 3, key: "gallery/3.mp4", type: "video", w: 608, h: 1080 },
  { n: 4, key: "gallery/4.mp4", type: "video", w: 832, h: 464 },
  { n: 5, key: "gallery/5.webp", type: "image", w: 1600, h: 1200 },
  { n: 6, key: "gallery/6.webp", type: "image", w: 1600, h: 900 },
  { n: 7, key: "gallery/7.mp4", type: "video", w: 1920, h: 1080 },
  { n: 8, key: "gallery/8.webp", type: "image", w: 1600, h: 1066 },
  { n: 9, key: "gallery/9.webp", type: "image", w: 1600, h: 1200 },
  { n: 10, key: "gallery/10.webp", type: "image", w: 1600, h: 1200 },
  { n: 11, key: "gallery/11.mp4", type: "video", w: 480, h: 848 },
  { n: 12, key: "gallery/12.mp4", type: "video", w: 848, h: 480 },
  { n: 13, key: "gallery/13.mp4", type: "video", w: 848, h: 480 },
  { n: 14, key: "gallery/14.mp4", type: "video", w: 480, h: 848 },
  { n: 15, key: "gallery/15.mp4", type: "video", w: 480, h: 848 },
  { n: 16, key: "gallery/16.webp", type: "image", w: 900, h: 1600 },
  { n: 18, key: "gallery/18.webp", type: "image", w: 1600, h: 1066 },
  { n: 19, key: "gallery/19.webp", type: "image", w: 1390, h: 926 },
  { n: 20, key: "gallery/20.webp", type: "image", w: 1066, h: 1600 },
  { n: 21, key: "gallery/21.webp", type: "image", w: 1600, h: 1066 },
  { n: 22, key: "gallery/22.webp", type: "image", w: 1600, h: 1066 },
  { n: 23, key: "gallery/23.webp", type: "image", w: 739, h: 1600 },
  { n: 24, key: "gallery/24.webp", type: "image", w: 739, h: 1600 },
  { n: 25, key: "gallery/25.webp", type: "image", w: 739, h: 1600 },
  { n: 26, key: "gallery/26.webp", type: "image", w: 1067, h: 1600 },
  { n: 27, key: "gallery/27.webp", type: "image", w: 900, h: 1600 },
  { n: 28, key: "gallery/28.webp", type: "image", w: 900, h: 1600 },
  { n: 29, key: "gallery/29.webp", type: "image", w: 1200, h: 1600 },
  { n: 30, key: "gallery/30.webp", type: "image", w: 900, h: 1600 },
  { n: 31, key: "gallery/31.webp", type: "image", w: 900, h: 1600 },
  { n: 32, key: "gallery/32.webp", type: "image", w: 900, h: 1600 },
  { n: 33, key: "gallery/33.webp", type: "image", w: 1060, h: 1600 },
  { n: 34, key: "gallery/34.webp", type: "image", w: 1066, h: 1600 },
  { n: 35, key: "gallery/35.webp", type: "image", w: 1355, h: 901 },
  { n: 36, key: "gallery/36.webp", type: "image", w: 1354, h: 900 },
  { n: 37, key: "gallery/37.webp", type: "image", w: 1359, h: 903 },
  { n: 38, key: "gallery/38.webp", type: "image", w: 598, h: 899 },
  { n: 39, key: "gallery/39.webp", type: "image", w: 599, h: 901 },
  { n: 40, key: "gallery/40.webp", type: "image", w: 597, h: 903 },
  { n: 41, key: "gallery/41.webp", type: "image", w: 1354, h: 898 },
  { n: 42, key: "gallery/42.webp", type: "image", w: 1355, h: 901 },
  { n: 43, key: "gallery/43.webp", type: "image", w: 1361, h: 906 },
];

function colsFor(width: number) {
  return width >= 1024 ? 4 : width >= 640 ? 3 : 2;
}

export function Gallery() {
  const [open, setOpen] = useState<Item | null>(null);
  const [cols, setCols] = useState(4);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    const calc = () => setCols(colsFor(window.innerWidth));
    calc();
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", calc);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", calc);
    };
  }, []);

  // Row-major order (1 top-left, flowing right then down), balanced by height:
  // each item goes into the currently shortest column.
  const columns = useMemo(() => {
    const colsArr: { items: Item[]; height: number }[] = Array.from(
      { length: cols },
      () => ({ items: [], height: 0 }),
    );
    for (const item of galleryItems) {
      const target = colsArr.reduce(
        (min, c) => (c.height < min.height ? c : min),
        colsArr[0],
      );
      target.items.push(item);
      target.height += item.h / item.w;
    }
    return colsArr.map((c) => c.items);
  }, [cols]);

  return (
    <section className="w-full bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-12 sm:px-6 lg:py-8">
        <h2 className="text-[2.5rem] font-normal leading-tight text-heading sm:text-[3.125rem]">
          Gallery
        </h2>
        {/* Row-major masonry: order reads left-right, then down */}
        <div className="flex w-full items-start gap-1.5 sm:gap-3">
          {columns.map((col, ci) => (
            <div key={ci} className="flex flex-1 flex-col gap-1.5 sm:gap-3">
              {col.map((item) => (
            <button
              key={item.n}
              type="button"
              onClick={() => setOpen(item)}
              aria-label={`Open gallery item ${item.n}`}
              className="group relative block w-full overflow-hidden rounded-lg bg-panel"
              style={{ aspectRatio: `${item.w} / ${item.h}` }}
            >
              {item.type === "youtube" ? (
                <>
                  <img
                    src={`https://i.ytimg.com/vi/${item.key}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                  <span className="pointer-events-none absolute bottom-1.5 left-1.5 rounded-full bg-red-600/90 px-2 py-0.5 text-[10px] font-medium text-white">
                    YouTube
                  </span>
                </>
              ) : item.type === "image" ? (
                <img
                  src={`/images/${item.key}`}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                />
              ) : (
                <>
                  <video
                    src={`/images/${item.key}`}
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster={`/images/gallery/${item.n}-poster.jpg`}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    onMouseEnter={(e) => {
                      e.currentTarget.play().catch(() => {});
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />
                  <span className="pointer-events-none absolute bottom-1.5 left-1.5 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white">
                    Video
                  </span>
                </>
              )}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:scale-110 hover:bg-white/25"
            onClick={() => setOpen(null)}
          >
            x
          </button>
          {open.type === "youtube" ? (
            <iframe
              src={`https://www.youtube.com/embed/${open.key}?autoplay=1`}
              title="GG Agency video"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="aspect-video w-full max-w-[92vw] rounded-lg bg-black"
              onClick={(e) => e.stopPropagation()}
            />
          ) : open.type === "image" ? (
            <img
              src={`/images/${open.key}`}
              alt=""
              className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <video
              src={`/images/${open.key}`}
              controls
              autoPlay
              className="max-h-[88vh] max-w-[92vw] rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </section>
  );
}
