import Drawboard from "@/components/ui/drawboard";
import WarnDialog from "@/components/ui/warn-dialog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Canvas",
  description: "A collaborative drawing board where you can create and share art in real-time.",
  openGraph: {
    title: "Canvas | Dante",
    description: "A collaborative drawing board where you can create and share art in real-time.",
    images: [
      "https://api.microlink.io/?url=https%3A%2F%2Fdante.quest%2Fcanvas&meta=false&screenshot=true&embed=screenshot.url&viewport.width=1200&viewport.height=630",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Canvas | Dante",
    description: "A collaborative drawing board where you can create and share art in real-time.",
    images: [
      "https://api.microlink.io/?url=https%3A%2F%2Fdante.quest%2Fcanvas&meta=false&screenshot=true&embed=screenshot.url&viewport.width=1200&viewport.height=630",
    ],
  },
};

export default function Canvas() {
  return (
    <div className="flex flex-col h-[90%] w-full rounded-xl overflow-hidden">
      <WarnDialog />
      <Drawboard />
    </div>
  );
}
