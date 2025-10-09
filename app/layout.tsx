import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/ui/navbar";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { LayoutTransition } from "@/components/animations/layout-transition";
import MotionDiv from "@/components/ui/motion-div";
import { bounce } from "@/components/animations/animation-utils";
import SpotifyWidget from "@/components/ui/widget-spotify";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dante.quest"),
  title: {
    default: "Dante",
    template: "%s | Dante",
  },
  description: "Software developer.",
  keywords: ["portfolio", "developer", "software", "dante"],
  authors: [{ name: "Dante" }],
  creator: "Dante",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dante.quest",
    siteName: "Dante",
    title: "Dante",
    description: "Software developer.",
    images: [
      {
        url: "/screenshot.png",
        width: 1200,
        height: 630,
        alt: "Dante's Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dante",
    description: "Software developer.",
    images: ["/screenshot.png"],
    creator: "@BaguetteBoiTuna",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <main className="min-h-screen flex flex-col items-center">
            <SpotifyWidget />
            <div className="flex w-full h-screen flex-col">
              <MotionDiv
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={bounce}
              >
                <Navbar />
              </MotionDiv>
              <LayoutTransition
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="z-40 flex flex-col mx-auto w-full sm:max-w-[92%] md:max-w-[80%] h-full items-center justify-center"
              >
                {children}
              </LayoutTransition>
            </div>
            <ShootingStars />
            <StarsBackground />
          </main>
        </Providers>
      </body>
    </html>
  );
}
