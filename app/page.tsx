import { FlipWords } from "@/components/ui/flip-words";
import { Button } from "@/components/ui/button";
import { Github, Twitter } from "lucide-react";
import FunnyButton from "@/components/ui/funny-button";
import MotionDiv from "@/components/ui/motion-div";
import { bounce } from "@/components/animations/animation-utils";
import { Hover3DImage } from "@/components/ui/3d-image";

export default function Home() {
  const names = ["Dante", "TunaSub", "BaguetteBoiTuna"];
  const githubUsername = "baguetteboituna";
  const twitterUsername = "BaguetteBoiTuna";
  const githubProfilePicture = `https://github.com/${githubUsername}.png`;

  return (
    <div className="flex flex-col w-full gap-5 sm:gap-10 sm:flex-row md:space-x-0 space-x-3.5 items-center justify-evenly">
      <div className="flex flex-col">
        <div className="overflow-hidden">
          <MotionDiv
            className="inline-block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={bounce}
          >
            <h1 className="text-fluid-lg font-bold whitespace-nowrap">
              Hey there! I&apos;m
              <FlipWords words={names} />
            </h1>
          </MotionDiv>
        </div>
        <div className="overflow-hidden">
          <MotionDiv
            className="inline-block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={bounce}
          >
            <h2 className="text-fluid-md">
              A developer obsessed with efficiency and tools.
            </h2>
          </MotionDiv>
        </div>
        <MotionDiv
          className="flex w-full flex-col sm:flex-row justify-evenly sm:gap-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={bounce}
        >
          <Button asChild className="mt-4">
            <a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center gap-2"
            >
              <Github size={18} />
              GitHub
            </a>
          </Button>
          <Button asChild className="mt-4">
            <a
              href={`https://x.com/${twitterUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center gap-2"
            >
              <Twitter size={18} />
              Twitter
            </a>
          </Button>
          <FunnyButton />
        </MotionDiv>
      </div>
      <MotionDiv
        className="relative flex sm:order-last order-first w-fluid-lg h-fluid-lg"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={bounce}
      >
        <Hover3DImage src={githubProfilePicture} alt="Github Profile Picture" />
      </MotionDiv>
    </div>
  );
}
