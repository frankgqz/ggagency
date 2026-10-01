import { SiteHeader } from "@/components/site-header";
import { About } from "@/components/about";
import { LivestreamerCta } from "@/components/livestreamer-cta";
import { Gallery } from "@/components/gallery";
import { ImageStrip } from "@/components/image-strip";
import { BigoStory } from "@/components/bigo-story";
import { DiamondReseller } from "@/components/diamond-reseller";
import { ContactForm } from "@/components/contact-form";
import { SiteFooter } from "@/components/site-footer";
import { Spline3D } from "@/components/spline-3d";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <About />
        <LivestreamerCta />
        <Gallery />
        <ImageStrip />
        <BigoStory />
        <DiamondReseller />
        <ContactForm />
        <Spline3D />
      </main>
      <SiteFooter />
    </>
  );
}
