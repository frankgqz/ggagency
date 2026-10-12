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
  title: "GG Agency | Official Bigo Diamond Reseller",
  description:
    "Australia's premier Bigo livestreaming agency. Fast BigoLive diamond recharge, livestreamer management, and community events.",
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
        {children}
      </body>
    </html>
  );
}
