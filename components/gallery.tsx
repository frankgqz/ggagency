"use client";

import { useEffect, useState } from "react";

export type GalleryItem = {
  order: number;
  kind: "image" | "video" | "youtube";
  key?: string | null;
  youtubeId?: string | null;
  width?: number | null;
  height?: number | null;
};

function colsFor(width: number) {
  return width >= 1024 ? 4 : width >= 640 ? 3 : 2;
}

export function Gallery({ items: initial }: { items: GalleryItem[] }) {
  const [items, setItems] = useState<GalleryItem[]>(initial);
  const [open, setOpen] = useState<GalleryItem | null>(null);
  const [cols, setCols] = useState(4);

  useEffect(() => {
    // Fresh rows on every load: admin edits appear on refresh, with zero
    // server-side rendering (one tiny JSON fetch).
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((fresh: GalleryItem[]) => {
        if (Array.isArray(fresh) && fresh.length) setItems(fresh);
      })
      .catch(() => {
        // offline / first paint — keep the build-time rows
      });
  }, []);

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

  // Row-major order (first item top-left, flowing right then down), balanced
  // by height: each item goes into the currently shortest column.
  const columns = (() => {
    const colsArr: { items: GalleryItem[]; height: number }[] = Array.from(
      { length: cols },
      () => ({ items: [], height: 0 }),
    );
    for (const item of items) {
      const target = colsArr.reduce(
        (min, c) => (c.height < min.height ? c : min),
        colsArr[0],
      );
      target.items.push(item);
      target.height += (item.height ?? 1) / (item.width ?? 1);
    }
    return colsArr.map((c) => c.items);
  })();

  return (
    <section className="w-full bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-12 sm:px-6 lg:py-8">
        <h2 className="text-[2.5rem] font-normal leading-tight text-heading sm:text-[3.125rem]">
          Gallery
        </h2>
        <div className="flex w-full items-start gap-1.5 sm:gap-3">
          {columns.map((col, ci) => (
            <div key={ci} className="flex flex-1 flex-col gap-1.5 sm:gap-3">
              {col.map((item) => (
                <button
                  key={item.order}
                  type="button"
                  onClick={() => setOpen(item)}
                  aria-label={`Open gallery item ${item.order}`}
                  className="group relative block w-full overflow-hidden rounded-lg bg-panel"
                  style={{ aspectRatio: `${item.width ?? 1} / ${item.height ?? 1}` }}
                >
                  {item.kind === "youtube" ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                      />
                      <span className="pointer-events-none absolute bottom-1.5 left-1.5 rounded-full bg-red-600/90 px-2 py-0.5 text-[10px] font-medium text-white">
                        YouTube
                      </span>
                    </>
                  ) : item.kind === "image" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`/images/${item.key}`}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <video
                        src={`/images/${item.key}`}
                        muted
                        loop
                        playsInline
                        preload="none"
                        poster={`/images/${(item.key ?? "").replace(/\.[^.]+$/, "")}-poster.jpg`}
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
          {open.kind === "youtube" ? (
            <iframe
              src={`https://www.youtube.com/embed/${open.youtubeId}?autoplay=1`}
              title="GG Agency video"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="aspect-video w-full max-w-[92vw] rounded-lg bg-black"
              onClick={(e) => e.stopPropagation()}
            />
          ) : open.kind === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`/images/${open.key}`}
              alt=""
              className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
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
