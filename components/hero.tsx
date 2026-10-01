const R2 = "https://pub-f1e69e4efe664d3188e5b23193330cfe.r2.dev";

export function Hero() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
        <div className="flex flex-col gap-5">
          <h1 className="text-[2.5rem] font-normal leading-tight text-brand-orange sm:text-[3.125rem]">
            Diamond Reseller
          </h1>
          <p className="text-lg leading-[1.73] text-brand-navy">
            Fast BigoLive Diamond Recharge
          </p>
          <p className="max-w-xl text-[17px] leading-[1.73] text-brand-navy">
            Looking for a reliable diamond reselling service? At GG Agency, we
            offer competitive rates ensuring you get the best value for your
            purchases. Our fast and responsive service means you can count on us
            to meet your needs quickly and efficiently. Experience a friendly and
            professional approach to diamond reselling that prioritizes your
            satisfaction and success. Message us today!
          </p>
          <div className="flex flex-col gap-3 pt-2">
            <a
              href="https://wa.me/61474749999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-3xl font-normal leading-[1.4] text-brand-navy transition hover:text-brand-orange sm:text-4xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${R2}/elements/whatsapp.png`}
                alt="WhatsApp"
                width={36}
                height={36}
                className="object-contain"
              />
              +61474749999
            </a>
            <a
              href="https://wa.me/61474749999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-3xl font-normal leading-[1.4] text-brand-navy transition hover:text-brand-orange sm:text-4xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${R2}/elements/zalo.png`}
                alt="Zalo"
                width={36}
                height={36}
                className="object-contain"
              />
              +61474749999
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative h-80 w-full max-w-lg overflow-hidden rounded-2xl bg-gradient-to-br from-brand-orange/20 via-brand-navy/10 to-brand-pink/30 shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange text-white">
                  <svg
                    width="32"
                    height="32"
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
                <p className="text-sm font-medium text-brand-navy">
                  GG Agency · Bigo Live
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
