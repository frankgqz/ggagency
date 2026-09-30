import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Story } from "@/components/story";
import { Gallery } from "@/components/gallery";
import { LivestreamerCta } from "@/components/livestreamer-cta";
import { ContactForm } from "@/components/contact-form";
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
        <LivestreamerCta />
        <ContactForm />
      </main>
      <SiteFooter />
    </>
  );
}
