"use client";

import { useState } from "react";

// Masonry-style layout matching the original's varied image sizes
const galleryItems = [
  { w: 270, h: 153, label: "Event" },
  { w: 270, h: 152, label: "Community" },
  { w: 174, h: 309, label: "Streamer" },
  { w: 255, h: 142, label: "Live" },
  { w: 189, h: 142, label: "Party" },
  { w: 222, h: 125, label: "Stage" },
  { w: 222, h: 125, label: "Crowd" },
  { w: 235, h: 157, label: "Friends" },
  { w: 209, h: 157, label: "Awards" },
  { w: 191, h: 143, label: "Team" },
  { w: 253, h: 143, label: "Show" },
  { w: 269, h: 153, label: "Performance" },
  { w: 269, h: 152, label: "Backstage" },
  { w: 175, h: 309, label: "Host" },
  { w: 223, h: 393, label: "Spotlight" },
  { w: 270, h: 153, label: "Dance" },
  { w: 270, h: 152, label: "Sing" },
  { w: 174, h: 309, label: "Portrait" },
  { w: 255, h: 142, label: "Meetup" },
  { w: 189, h: 142, label: "Chat" },
  { w: 222, h: 125, label: "Fun" },
  { w: 222, h: 125, label: "Group" },
  { w: 235, h: 157, label: "Gala" },
  { w: 209, h: 157, label: "Night" },
  { w: 191, h: 143, label: "City" },
  { w: 253, h: 143, label: "Lights" },
  { w: 269, h: 153, label: "Music" },
  { w: 269, h: 152, label: "Cheers" },
  { w: 175, h: 309, label: "Star" },
  { w: 223, h: 393, label: "Feature" },
  { w: 270, h: 153, label: "Vibe" },
  { w: 270, h: 152, label: "Energy" },
  { w: 174, h: 309, label: "Model" },
  { w: 255, h: 142, label: "Hangout" },
  { w: 189, h: 142, label: "Smile" },
  { w: 222, h: 125, label: "Team" },
  { w: 222, h: 125, label: "Joy" },
  { w: 235, h: 157, label: "Festival" },
  { w: 209, h: 157, label: "Glow" },
  { w: 191, h: 143, label: "Bond" },
  { w: 253, h: 143, label: "Wave" },
  { w: 269, h: 153, label: "Finale" },
];

const gradients = [
  "from-orange-200 to-brand-orange/50",
  "from-sky-100 to-brand-navy/30",
  "from-amber-100 to-orange-300",
  "from-rose-100 to-brand-pink/40",
  "from-indigo-100 to-brand-navy/40",
  "from-purple-100 to-brand-pink/30",
  "from-emerald-100 to-teal-200",
  "from-pink-100 to-brand-orange/30",
];

export function Gallery() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-24 sm:px-6 lg:py-32">
        <h2 className="text-[2.5rem] font-normal leading-tight text-brand-orange sm:text-[3.125rem]">
          Gallery
        </h2>
        {/* Masonry-style columns */}
        <div className="w-full columns-2 gap-3 sm:columns-3 lg:columns-4">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`mb-3 break-inside-avoid overflow-hidden rounded-lg bg-gradient-to-br ${gradients[i % gradients.length]}`}
              style={{ aspectRatio: `${item.w} / ${item.h}` }}
            >
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-xs font-medium text-brand-navy/50">
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
