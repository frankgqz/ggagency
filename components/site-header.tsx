import Link from "next/link";

const R2 = "https://pub-f1e69e4efe664d3188e5b23193330cfe.r2.dev";
const WHATSAPP = "https://wa.me/61474749999";

export function SiteHeader() {
  return (
    <header className="w-full bg-black">
      <div className="mx-auto flex h-[100px] max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${R2}/elements/logo-bigolive.png`}
            alt="Bigo Live"
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          <span className="text-[27px] font-normal leading-tight text-brand-orange">
            GG Agency
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${R2}/elements/icon-livestreaming.png`}
            alt="Livestreaming"
            width={40}
            height={40}
            className="object-contain"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${R2}/elements/diamonds-1000plus.png`}
            alt="Diamonds"
            width={36}
            height={36}
            className="object-contain"
          />
        </div>

        <nav className="flex items-center gap-4">
          <Link
            href="/about"
            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/10"
            aria-label="About"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${R2}/elements/info-icon.svg`}
              alt="Info"
              width={28}
              height={28}
              className="object-contain"
            />
          </Link>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${R2}/elements/whatsapp.png`}
              alt="WhatsApp"
              width={28}
              height={28}
              className="object-contain"
            />
          </a>
        </nav>
      </div>
    </header>
  );
}
