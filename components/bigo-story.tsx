const R2 = "/images";

export function BigoStory() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 py-24 text-center sm:px-6 lg:py-32">
        {/* Bigo icon moved from header */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${R2}/elements/logo-bigolive.png`}
          alt="Bigo Live"
          width={64}
          height={64}
          className="rounded-full object-cover"
        />
        <h2 className="text-[2.5rem] font-normal leading-tight text-brand-navy sm:text-[3.125rem]">
          Bigo
        </h2>
        <p className="max-w-[780px] font-poppins text-[17px] font-extralight leading-[1.8] text-brand-navy">
          In 2019, we saw the incredible potential of live streaming in
          Australia. Bigo was a platform for creators to connect, entertain, and
          build communities. With a vision to empower these performers, GG Agency
          was born. Founded by Haylee Trinh, and a team of admins, we quickly
          became Australia&apos;s largest Bigo agency by focusing on what truly
          matters: The people. We&apos;ve celebrated their incredible
          milestones, from becoming the top national agency to sending many hosts
          to prestigious global galas USA Seoul, Singapore and the latest 2026
          Gala in Vietnam. As a foundational partner and official BigoLive
          reseller since our early days, we also provide the essential tools for
          our community to shine. We don&apos;t just manage talent; we foster a
          vibrant and supportive community, and ensure our people have everything
          they need to succeed.
        </p>
      </div>
    </section>
  );
}
