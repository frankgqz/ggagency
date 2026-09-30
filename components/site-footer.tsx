import Link from "next/link";

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/kem.dau.54",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/gg.familyyyyy",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/61474749999",
  },
];

export function SiteFooter() {
  return (
    <footer className="w-full bg-black">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:px-6">
        <Link href="/" className="text-xl font-normal text-brand-orange">
          GG Agency
        </Link>
        <nav className="flex flex-wrap items-center justify-center gap-6">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/80 transition hover:text-brand-orange"
            >
              {s.label}
            </a>
          ))}
          <a
            href="mailto:ggagency.bigo@gmail.com"
            className="text-sm text-white/80 transition hover:text-brand-orange"
          >
            ggagency.bigo@gmail.com
          </a>
        </nav>
        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} GG Agency. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
