import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import MotionDiv from "@/components/ui/motion-div";
import Link from "next/link";

export default function NotFound() {
  const words = [
    { text: "404", className: "text-blue-500" },
    { text: "|" },
    { text: "Not" },
    { text: "Found" },
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
        <Button asChild className="mt-4">
          <Link href="/">
            {" "}
            <Home size={18} />
            Go Home
          </Link>
        </Button>
      </MotionDiv>
    </div>
  );
}
