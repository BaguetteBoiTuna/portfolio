import { FlipWords } from "@/components/ui/flip-words";
import MotionDiv from "@/components/ui/motion-div";
import { HoverEffect } from "@/components/ui/card-hover-effect";

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
      description: "How I edit my code with ease and style.",
      link: "/tools/editor",
    },
    {
      title: "Terminal",
      description: "My go-to for executing commands and getting things done.",
      link: "/tools/terminal",
    },
    {
      title: "Apps",
      description: "The apps that keep my workflow smooth and efficient.",
      link: "/tools/apps",
    },
    {
      title: "CLI Tools",
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
      title: "Websites",
      description: "Sites that are essential for my projects and inspiration.",
      link: "/tools/websites",
    },
  ];

  return (
    <div>
      <div className="flex flex-col justify-center items-center p-10">
        <div className="overflow-hidden">
          <MotionDiv
            className="inline-block"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
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
            transition={{ duration: 1 }}
          >
            <h2 className="text-fluid-md">
              I use everyday to make my life easier.
            </h2>
          </MotionDiv>
        </div>
      </div>
      <MotionDiv
        className="flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <HoverEffect items={toolCards} />
      </MotionDiv>
    </div>
  );
}
