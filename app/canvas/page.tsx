import Drawboard from "@/components/ui/drawboard";
import WarnDialog from "@/components/ui/warn-dialog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Canvas",
  description:
    "A collaborative drawing board where you can create and share art in real-time.",
};

export default function Canvas() {
  return (
    <div className="flex flex-col h-[90%] w-full rounded-xl overflow-hidden">
      <WarnDialog />
      <Drawboard />
    </div>
  );
}
