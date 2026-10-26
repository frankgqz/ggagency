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
    "flex h-[34px] w-[34px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-control shadow-[0_1px_2px_rgba(20,20,28,0.10),0_4px_10px_rgba(20,20,28,0.12),0_12px_28px_rgba(20,20,28,0.16)] transition hover:scale-[1.3] hover:bg-control-hover active:scale-[1.12] active:bg-control-active sm:h-10 sm:w-10";
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
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <header className={`topbar fixed inset-x-0 top-0 z-50 backdrop-blur-md${scrolled ? " bar-scrolled" : ""}`}>
        <div className="mx-auto flex h-[60px] max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center rounded-[10px] transition hover:scale-[1.06] active:scale-[1.02] dark:bg-control dark:px-2 dark:py-1 dark:shadow-[0_1px_2px_rgba(20,20,28,0.10),0_4px_10px_rgba(20,20,28,0.12),0_12px_28px_rgba(20,20,28,0.16)]">
            <span className="brand-text whitespace-nowrap font-heading text-[18px] font-medium leading-tight text-[#0c0c11] sm:text-[24px] dark:text-on-ink">
              GG Agency
            </span>
          </Link>

          <nav className="flex items-center gap-1.5 sm:gap-3">
            <NavButton label="Livestreaming" href="/#livestreamer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${R2}/elements/icon-livestreaming.png`}
                alt="Livestreaming"
                width={52}
                height={52}
                className="scale-[1.3] object-contain"
              />
            </NavButton>
            <NavButton label="Diamonds" href="/#diamonds">
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
