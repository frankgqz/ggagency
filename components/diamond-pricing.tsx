"use client";

import { useEffect, useState } from "react";

const R2 = "/images";
const US_DIAMOND_PRICE = 57.5; // Bigo's US$ price for 50,000 diamonds
const MARGIN = 1.05;           // 5% on top
const FALLBACK_RATE = 1.451;

// The available price tables (their key = the 50,000-diamonds AUD price).
// Note the deck skips 1380 / 1470 / 1490 — snap to the nearest that exists.
const TIERS = [
  1280, 1290, 1300, 1310, 1320, 1330, 1340, 1350, 1360, 1370,
  1390, 1400, 1410, 1420, 1430, 1440, 1450, 1460, 1480, 1500,
];

function nearestTier(rounded: number): number {
  return TIERS.reduce((best, t) =>
    Math.abs(t - rounded) < Math.abs(best - rounded) ? t : best
  );
}

export function DiamondPricing() {
  const [rate, setRate] = useState<number | null>(null);
  const [tier, setTier] = useState<number>(1300);

  useEffect(() => {
    let alive = true;
    fetch("/api/rate")
      .then((r) => r.json())
      .then((d) => {
        if (!alive) return;
        const r: number = typeof d?.rate === "number" ? d.rate : FALLBACK_RATE;
        const value = (50000 / US_DIAMOND_PRICE) * r * MARGIN;
        setRate(r);
        setTier(nearestTier(Math.round(value / 10) * 10));
      })
      .catch(() => {
        if (alive) setRate(FALLBACK_RATE);
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${R2}/elements/pricing/${tier}.png`}
        alt="Bigo diamond recharge price list"
        width={1448}
        height={863}
        className="w-full max-w-3xl rounded-2xl object-contain shadow-lg"
      />
      {rate !== null && (
        <p className="text-[17px] leading-[1.73] text-subtext">USD AUD = {rate.toFixed(3)}</p>
      )}
    </div>
  );
}
