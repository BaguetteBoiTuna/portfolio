import Big404 from "@/components/ui/big-404";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";
import GlitchText from "@/components/ui/glitch-text";
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

      <MotionDiv
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...bounce, delay: 0.2 }}
      >
        <Button asChild className="mt-4 glitch">
          <Link href="/">
            <Home size={18} />
            <GlitchText text="Go Home" color="black" />
          </Link>
        </Button>
      </MotionDiv>
    </div>
  );
}
