export function About() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Decorative floating shapes */}
      <div className="pointer-events-none absolute -left-16 top-20 h-32 w-32 rounded-full bg-brand-orange/10" />
      <div className="pointer-events-none absolute -right-12 bottom-24 h-24 w-24 rounded-full bg-brand-pink/10" />
      <div className="pointer-events-none absolute left-1/4 top-10 h-4 w-4 rounded-full bg-brand-navy/10" />
      <div className="pointer-events-none absolute right-1/3 bottom-16 h-6 w-6 rounded-full bg-brand-orange/15" />

      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 py-24 text-center sm:px-6 lg:py-32">
        <h1 className="text-[2.5rem] font-normal leading-tight text-brand-orange sm:text-[3.125rem]">
          About Us
        </h1>
        <p className="max-w-[780px] font-poppins text-[17px] font-extralight leading-[1.8] text-brand-navy">
          Welcome to GG Agency, Australia&apos;s premier livestreaming agency.
          We proudly manage an extensive roster of talented live streamers. Our
          vibrant community has exciting events through the year. We also offer
          app currency reselling at unbeatable rates. With our friendly and
          professional staff available all day, you can expect fast, responsive
          service tailored to your needs. Join us and experience the excellence
          and support that makes GG Agency the #1 choice for all your
          livestreaming needs!
        </p>
      </div>
    </section>
  );
}
