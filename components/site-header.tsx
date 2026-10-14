"use client";

import Link from "next/link";
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
    "flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-control shadow-[0_2px_10px_rgba(120,120,120,0.5)] transition hover:scale-[1.3] hover:bg-control-hover active:scale-[1.12] active:bg-control-active sm:h-10 sm:w-10";
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
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-ink">
        <div className="mx-auto flex h-[60px] max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center rounded-[10px] bg-control px-2.5 py-1 shadow-[0_2px_10px_rgba(120,120,120,0.5)] transition hover:scale-[1.15] hover:bg-control-hover active:scale-[1.05] active:bg-control-active">
            <span className="whitespace-nowrap font-heading text-[17px] font-medium leading-tight text-on-ink sm:text-[22px]">
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
