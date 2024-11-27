import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/ui/navbar";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { LayoutTransition } from "@/components/animations/layout-transition";

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
              <Navbar />
              <div className="flex flex-col mx-auto w-full sm:max-w-[92%] md:max-w-[80%] h-full items-center justify-center">
                <LayoutTransition
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
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
