import ComingSoon from "@/components/ui/coming-soon";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Check out my latest projects and experiments.",
  openGraph: {
    title: "Projects | Dante",
    description: "Check out my latest projects and experiments.",
    images: ["/screenshot.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Dante",
    description: "Check out my latest projects and experiments.",
    images: ["/screenshot.png"],
  },
};

export default function Projects() {
  return <ComingSoon />;
}
