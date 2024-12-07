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
  title: "TunaSub",
  description: "I use nvim btw",
  openGraph: {
    title: "TunaSub",
    description: "I use nvim btw",
    url: "https://tunasub.xyz",
    siteName: "TunaSub",
    images: [
      {
        url: "https://tunasub.xyz/api/og",
        width: 1200,
        height: 630,
        alt: "TunaSub Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TunaSub",
    description: "I use nvim btw",
    images: ["https://tunasub.xyz/api/og"],
  },
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
            <div className="flex w-full h-screen flex-col">
              <MotionDiv
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={bounce}
              >
                <Navbar />
              </MotionDiv>
              <div className="z-40 flex flex-col mx-auto w-full sm:max-w-[92%] md:max-w-[80%] h-full items-center justify-center">
                <LayoutTransition
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {children}
                </LayoutTransition>
              </div>
            </div>
            <ShootingStars />
            <StarsBackground />
          </main>
        </Providers>
      </body>
    </html>
  );
}
