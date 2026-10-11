"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const R2 = "/images";
const WHATSAPP = "https://wa.me/61474749999";
const HEADER_H = 60;

function NavButton({
  children,
  label,
  href,
  external,
}: {
  children: React.ReactNode;
  label: string;
  href?: string;
  external?: boolean;
}) {
  const cls =
    "flex h-10 w-10 items-center justify-center overflow-hidden rounded-full shadow-[0_2px_10px_rgba(120,120,120,0.5)] transition hover:scale-[1.3] hover:bg-background/10";
  const inner = (
    <span className={href ? cls : cls}>
      <span className="flex items-center justify-center overflow-hidden">{children}</span>
    </span>
  );
  if (!href) return inner;
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {inner}
    </a>
  ) : (
    <Link href={href} aria-label={label}>
      {inner}
    </Link>
  );
}

export function SiteHeader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      setHidden(false);
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (window.scrollY > HEADER_H) setHidden(true);
      }, 1500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-ink transition-transform duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="mx-auto flex h-[60px] max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3 rounded-full px-2 py-1 shadow-[0_2px_10px_rgba(120,120,120,0.5)] transition hover:scale-[1.15] hover:bg-background/10">
            <span className="font-heading text-[27px] font-medium leading-tight text-on-ink">
              GG Agency
            </span>
          </Link>

          <nav className="flex items-center gap-3">
            <NavButton label="Livestreaming">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${R2}/elements/icon-livestreaming.png`}
                alt="Livestreaming"
                width={52}
                height={52}
                className="scale-[1.3] object-contain"
              />
            </NavButton>
            <NavButton label="Diamonds">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${R2}/elements/diamonds-1000plus.png`}
                alt="Diamonds"
                width={34}
                height={34}
                className="object-contain"
              />
            </NavButton>
            <NavButton label="About" href="/about">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${R2}/elements/info-icon.svg`}
                alt="Info"
                width={26}
                height={26}
                className="object-contain"
              />
            </NavButton>
            <NavButton label="WhatsApp" href={WHATSAPP} external>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${R2}/elements/whatsapp.png`}
                alt="WhatsApp"
                width={30}
                height={30}
                className="scale-[1.3] object-contain"
              />
            </NavButton>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <div style={{ height: HEADER_H }} aria-hidden />
    </>
  );
}
