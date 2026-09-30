import Link from "next/link";

const WHATSAPP = "https://wa.me/61474749999";

function BigoIcon({ size = 50 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full bg-brand-orange/20 text-brand-orange"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg
        width={size * 0.55}
        height={size * 0.55}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2 2 7l10 5 10-5-10-5Z" />
        <path d="m2 17 10 5 10-5" />
        <path d="m2 12 10 5 10-5" />
      </svg>
    </div>
  );
}

function LivestreamingIcon({ size = 40 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg
        width={size * 0.5}
        height={size * 0.5}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1" />
        <rect x="8" y="2" width="13" height="14" rx="2" />
        <path d="m22 8-6 4 6 4V8Z" />
      </svg>
    </div>
  );
}

function DiamondIcon({ size = 36 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg
        width={size * 0.55}
        height={size * 0.55}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 3h12l4 6-10 13L2 9Z" />
        <path d="M11 3 8 9l4 13 4-13-3-6" />
        <path d="M2 9h20" />
      </svg>
    </div>
  );
}

function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="w-full bg-black">
      <div className="mx-auto flex h-[100px] max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <BigoIcon size={50} />
          <div className="flex flex-col">
            <span className="text-[27px] font-normal leading-tight text-brand-orange">
              GG Agency
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <LivestreamingIcon size={40} />
          <DiamondIcon size={36} />
        </div>

        <nav className="flex items-center gap-4">
          <Link
            href="/about"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white/10"
            aria-label="About"
          >
            <span className="text-lg leading-none italic">i</span>
          </Link>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/10"
          >
            <WhatsAppIcon size={24} />
          </a>
        </nav>
      </div>
    </header>
  );
}
