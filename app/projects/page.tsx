import ComingSoon from "@/components/ui/coming-soon";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Check out my latest projects and experiments.",
  openGraph: {
    title: "Projects | Dante",
    description: "Check out my latest projects and experiments.",
  },
};

export default function Projects() {
  return <ComingSoon />;
}
