import { DiamondPricing } from "@/components/diamond-pricing";

const R2 = "/images";

export function DiamondReseller() {
  return (
    <section id="diamonds" className="w-full scroll-mt-20 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-10 sm:px-6 lg:py-12">
        <div className="flex max-w-2xl flex-col items-center gap-5 text-center">
          <h2 className="text-[2.5rem] font-normal leading-tight text-heading sm:text-[3.125rem]">
            Diamond Reseller
          </h2>
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
          <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:gap-8">
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
              href="https://zalo.me/61474749999"
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

        <div className="flex w-full items-center justify-center">
          <DiamondPricing />
        </div>
      </div>
    </section>
  );
}
