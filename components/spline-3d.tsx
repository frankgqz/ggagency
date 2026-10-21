export function Spline3D() {
  return (
    <section className="w-full overflow-x-clip bg-background">
      <div className="mx-auto max-w-6xl px-4 pb-0 sm:px-6" style={{ marginBottom: "-60px" }}>
        <div style={{ backgroundColor: "var(--spline)" }} className="relative w-[145%] -ml-[22.5%] overflow-hidden rounded-xl shadow-sm sm:-ml-[10.5%] sm:w-[121%]">
          {/* the whole iframe sits on the theme's background color */}
          <div className="absolute inset-0 bg-background" aria-hidden />
          <iframe
            src="https://my.spline.design/bigoimport2-CZMLHvqjfRDZ8JW9B1sNAIa6/"
            title="GG Agency 3D Experience"
            className="spline-frame relative h-[872px] w-full border-0 sm:h-[1162px]"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
          />

        </div>
      </div>
    </section>
  );
}
