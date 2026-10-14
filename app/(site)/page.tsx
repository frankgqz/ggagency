import { getPayload } from "payload";
import config from "@payload-config";
import { SiteHeader } from "@/components/site-header";
import { About } from "@/components/about";
import { VideoCompare } from "@/components/video-compare";
import { LivestreamerCta } from "@/components/livestreamer-cta";
import { Gallery } from "@/components/gallery";
import { ImageStrip } from "@/components/image-strip";
import { BigoStory } from "@/components/bigo-story";
import { DiamondReseller } from "@/components/diamond-reseller";
import { ContactForm } from "@/components/contact-form";
import { SiteFooter } from "@/components/site-footer";
import { Spline3D } from "@/components/spline-3d";

// STATIC forever — no runtime rendering (the free plan's 10ms CPU wall).
// The gallery client-refreshes itself from /api/gallery on load, so admin
// edits appear on refresh without any server-side re-render.

async function getGalleryItems() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "gallery",
    sort: "order",
    limit: 500,
  });
  return docs.map((d: any) => ({
    order: d.order,
    kind: d.kind,
    key: d.key,
    youtubeId: d.youtubeId,
    width: d.width,
    height: d.height,
  }));
}

export default async function Home() {
  const galleryItems = await getGalleryItems();
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <About />
        <VideoCompare />
        <LivestreamerCta />
        <Gallery items={galleryItems} />
        <BigoStory />
        <ImageStrip />
        <DiamondReseller />
        <ContactForm />
        <Spline3D />
      </main>
      <SiteFooter />
    </>
  );
}
