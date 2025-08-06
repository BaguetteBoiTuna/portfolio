import Drawboard from "@/components/ui/drawboard";
import WarnDialog from "@/components/ui/warn-dialog";

export default function Canvas() {
  return (
    <div className="flex flex-col h-[90%] w-full rounded-xl overflow-hidden">
      <WarnDialog />
      <Drawboard />
    </div>
  );
}
