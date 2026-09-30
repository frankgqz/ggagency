export function PreFooter() {
  return (
    <section className="w-full bg-black">
      <div className="mx-auto flex h-[800px] max-w-6xl flex-col items-center justify-center gap-8 px-4 sm:px-6">
        {/* Decorative content area — matches original's large dark section */}
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-brand-orange/50">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FC9823"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2 2 7l10 5 10-5-10-5Z" />
              <path d="m2 17 10 5 10-5" />
              <path d="m2 12 10 5 10-5" />
            </svg>
          </div>
          <p className="max-w-md font-poppins text-lg font-extralight leading-relaxed text-white/70">
            Join the GG Agency family and start your livestreaming journey today.
          </p>
          <a
            href="https://wa.me/61474749999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full bg-brand-orange px-10 text-base font-medium text-white transition hover:bg-brand-orange/90"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}
