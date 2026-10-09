import Link from "next/link";

const R2 = "/images";
const WHATSAPP = "https://wa.me/61474749999";

export function SiteHeader() {
  return (
    <header className="w-full bg-black">
      <div className="mx-auto flex h-[100px] max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-[27px] font-normal leading-tight text-brand-orange">
            GG Agency
          </span>
        </Link>

        <nav className="flex items-center gap-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${R2}/elements/icon-livestreaming.png`}
            alt="Livestreaming"
            width={40}
            height={40}
            className="cursor-pointer object-contain transition-transform duration-300 hover:scale-150"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${R2}/elements/diamonds-1000plus.png`}
            alt="Diamonds"
            width={36}
            height={36}
            className="cursor-pointer object-contain transition-transform duration-300 hover:scale-150"
          />
          <Link
            href="/about"
            aria-label="About"
            className="flex items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${R2}/elements/info-icon.svg`}
              alt="Info"
              width={28}
              height={28}
              className="cursor-pointer object-contain transition-transform duration-300 hover:scale-150"
            />
          </Link>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${R2}/elements/whatsapp.png`}
              alt="WhatsApp"
              width={28}
              height={28}
              className="cursor-pointer object-contain transition-transform duration-300 hover:scale-150"
            />
          </a>
        </nav>
      </div>
    </header>
  );
}
