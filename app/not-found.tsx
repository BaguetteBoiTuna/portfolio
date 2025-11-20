import Big404 from "@/components/ui/big-404";
import MotionDiv from "@/components/ui/motion-div";
import { bounce } from "@/components/animations/animation-utils";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-10 py-16">
      <MotionDiv
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={bounce}
      >
        <Big404 />
      </MotionDiv>
    </div>
  );
}
