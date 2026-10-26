import type { Metadata } from "next";
import { Space_Grotesk, Poppins, Sunflower } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "300", "400"],
});

const sunflower = Sunflower({
  variable: "--font-sunflower",
  weight: ["300", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ggagency.com.au"),
  title: {
    default: "GG Agency | Official Bigo Diamond Reseller",
    template: "%s | GG Agency",
  },
  description:
    "Australia's premier Bigo livestreaming agency. Fast BigoLive diamond recharge, livestreamer management, and community events.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "GG Agency",
    url: "https://ggagency.com.au",
    title: "GG Agency | Official Bigo Diamond Reseller",
    description:
      "Australia's premier Bigo livestreaming agency. Fast BigoLive diamond recharge, livestreamer management, and community events.",
    locale: "en_AU",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "GG Agency — Livestreaming and content generation. Official Bigo Diamond Reseller." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GG Agency | Official Bigo Diamond Reseller",
    description:
      "Australia's premier Bigo livestreaming agency. Fast BigoLive diamond recharge, livestreamer management, and community events.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${poppins.variable} ${sunflower.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('gg-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "GG Agency",
              url: "https://ggagency.com.au",
              image: "https://ggagency.com.au/og.png",
              description:
                "Australia's premier Bigo livestreaming agency. Fast BigoLive diamond recharge, livestreamer management, and community events.",
              email: "haylee.trinh@gmail.com",
              founder: { "@type": "Person", name: "Haylee Trinh" },
              sameAs: [
                "https://www.facebook.com/kem.dau.54",
                "https://www.instagram.com/gg.familyyyyy",
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
