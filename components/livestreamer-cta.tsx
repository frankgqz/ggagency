import { buttonVariants } from "@/components/ui/button";

export function LivestreamerCta() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 lg:py-24">
        <h2 className="text-4xl font-normal text-brand-orange sm:text-5xl">
          Become An Official Bigo Livestreamer
        </h2>
        <p className="text-base leading-relaxed text-brand-navy">
          Welcome to GG Agency, Australia&apos;s #1 livestreaming agency! We
          pride ourselves on managing a dynamic community of live streamers who
          share their lives while earning money. Join our family and take part in
          exciting events where you can meet new friends and expand your network.
          We are dedicated to supporting our streamers with a friendly and
          professional team available around the clock. Our commitment to your
          success ensures that you have the tools and resources you need to
          thrive. Together, let&apos;s create unforgettable moments and build a
          bright future in livestreaming!
        </p>
        <a
          href="https://wa.me/61474749999"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            size: "lg",
            className:
              "rounded-full bg-brand-orange px-8 text-base font-medium text-white hover:bg-brand-orange/90",
          })}
        >
          Join Us
        </a>
      </div>
    </section>
  );
}
