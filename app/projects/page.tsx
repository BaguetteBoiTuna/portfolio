import ComingSoon from "@/components/ui/coming-soon";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Check out my latest projects and experiments.",
  openGraph: {
    title: "Projects | Dante",
    description: "Check out my latest projects and experiments.",
    images: [
      "https://api.microlink.io/?url=https%3A%2F%2Fdante.quest%2Fprojects&meta=false&screenshot=true&embed=screenshot.url&viewport.width=1200&viewport.height=630",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Dante",
    description: "Check out my latest projects and experiments.",
    images: [
      "https://api.microlink.io/?url=https%3A%2F%2Fdante.quest%2Fprojects&meta=false&screenshot=true&embed=screenshot.url&viewport.width=1200&viewport.height=630",
    ],
  },
};

export default function Projects() {
  return <ComingSoon />;
}
