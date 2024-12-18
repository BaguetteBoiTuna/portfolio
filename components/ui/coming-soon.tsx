import { TypewriterEffectSmooth } from "./typewriter-effect";
import { Button } from "./button";
import { Home } from "lucide-react";
import MotionDiv from "./motion-div";
import Link from "next/link";
import GlitchText from "./glitch-text";

const ComingSoon = () => {
  const words = [
    { text: "Coming" },
    { text: "Soon", className: "text-blue-500" },
  ];

  return (
    <div className="z-50 flex flex-col w-full h-full gap-5 sm:gap-0 md:space-x-0 space-x-3.5 items-center justify-center">
      <div>
        <h1 className="text-6xl text-center">
          <TypewriterEffectSmooth words={words} />
        </h1>
      </div>
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 5, delay: 3.5 }}
      >
        <Button asChild className="mt-4 group">
          <Link href="/">
            {" "}
            <Home size={18} />
            <GlitchText text="Go Home" color="black" />
          </Link>
        </Button>
      </MotionDiv>
    </div>
  );
};

export default ComingSoon;
