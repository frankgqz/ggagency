export function Spline3D() {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
        <div className="relative w-full overflow-hidden rounded-xl bg-panel shadow-sm">
          <iframe
            src="https://my.spline.design/bigoimport2-CZMLHvqjfRDZ8JW9B1sNAIa6/"
            title="GG Agency 3D Experience"
            className="h-[600px] w-full border-0 sm:h-[800px]"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
          />
          {/* Cover the Spline watermark — exact match to original Wix box (300×50, bottom-right) */}
          <div
            className="absolute z-10 bg-[#fafafa]"
            style={{
              width: "clamp(160px, 19vw, 300px)",
              height: "clamp(78px, 8.2vw, 100px)",
              bottom: 0,
              right: 0,
            }}
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
