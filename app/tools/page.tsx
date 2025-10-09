import { FlipWords } from "@/components/ui/flip-words";
import MotionDiv from "@/components/ui/motion-div";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { bounce } from "@/components/animations/animation-utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools",
  description: "Explore the editors, terminals, apps, CLI tools, browsers, and websites that power my daily workflow.",
  openGraph: {
    title: "Tools | Dante",
    description: "Explore the editors, terminals, apps, CLI tools, browsers, and websites that power my daily workflow.",
    images: ["/screenshot.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tools | Dante",
    description: "Explore the editors, terminals, apps, CLI tools, browsers, and websites that power my daily workflow.",
    images: ["/screenshot.png"],
  },
};

export default function Tools() {
  const tools = [
    "This is the Editor",
    "This is the Terminal",
    "These are the Apps",
    "These are the CLI Tools",
    "This is the Browser",
    "These are the Websites",
  ];

  const toolCards = [
    {
      title: "Editor",
      description: "The tool I use to write and refine my code efficiently.",
      link: "/tools/editor",
    },
    {
      title: "Terminal",
      description: "My go-to for executing commands and getting things done.",
      link: "/tools/terminal",
    },
    {
      title: "Apps - Coming Soon",
      description: "The apps that keep my workflow smooth and efficient.",
      link: "/tools/apps",
    },
    {
      title: "CLI Tools - Coming Soon",
      description:
        "Command-line tools I rely on to supercharge my productivity.",
      link: "/tools/cli-tools",
    },
    {
      title: "Browser",
      description: "Where I research, explore and sometimes procrastinate.",
      link: "/tools/browser",
    },
    {
      title: "Websites - Coming Soon",
      description: "Useful sites that save me lots of time.",
      link: "/tools/websites",
    },
  ];

  return (
    <div className="flex h-full w-full flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center p-10">
        <div className="overflow-hidden">
          <MotionDiv
            className="inline-block"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={bounce}
          >
            <h1 className="text-fluid-lg font-bold whitespace-nowrap">
              <FlipWords words={tools} />
            </h1>
          </MotionDiv>
        </div>
        <div className="overflow-hidden">
          <MotionDiv
            className="inline-block"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={bounce}
          >
            <h2 className="text-fluid-md">
              I use everyday to make my life easier.
            </h2>
          </MotionDiv>
        </div>
      </div>
      <MotionDiv
        className="flex"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={bounce}
      >
        <HoverEffect items={toolCards} />
      </MotionDiv>
    </div>
  );
}
