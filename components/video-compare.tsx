export function VideoCompare() {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <video
          src="/images/hero/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          className="aspect-video w-full rounded-xl bg-panel object-cover shadow-sm"
        />
      </div>
    </section>
  );
}
