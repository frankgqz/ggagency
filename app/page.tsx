import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Story } from "@/components/story";
import { Gallery } from "@/components/gallery";
import { ImageStrip } from "@/components/image-strip";
import { LivestreamerCta } from "@/components/livestreamer-cta";
import { ContactForm } from "@/components/contact-form";
import { Spline3D } from "@/components/spline-3d";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <About />
        <Story />
        <Gallery />
        <ImageStrip />
        <LivestreamerCta />
        <ContactForm />
        <Spline3D />
      </main>
      <SiteFooter />
    </>
  );
}
