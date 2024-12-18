import { LinkPreview } from "@/components/ui/link-preview";
import MotionDiv from "@/components/ui/motion-div";
import { bounce } from "@/components/animations/animation-utils";
import { Tabs } from "@/components/ui/tabs";
import GlitchText from "@/components/ui/glitch-text";

export default function About() {
  const tabs = [
    {
      title: "Page",
      value: "about-page",
      content: (
        <div className="flex flex-col h-full bg-slate-800 rounded-xl p-6">
          <h1 className="text-fluid-lg">About This Page</h1>
          <div className="flex flex-col h-full w-full items-center justify-center">
            <h1 className="text-fluid-lg text-neutral-500 dark:text-neutral-400 mx-auto">
              I know that this page and the mobile version are broken. :&apos;(
            </h1>
          </div>
        </div>
      ),
    },
    {
      title: "Me",
      value: "about-me",
      content: (
        <div className="flex flex-col h-full bg-slate-800 rounded-xl p-6">
          <h1 className="text-fluid-lg">About Me</h1>
          <div className="flex flex-col h-full w-full items-center justify-center">
            <p className="text-fluid-md text-neutral-500 dark:text-neutral-400">
              Currently in Taiwan for my 4th year at Epitech.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Site",
      value: "about-site",
      content: (
        <div className="flex flex-col h-full bg-slate-800 rounded-xl p-6">
          <h1 className="text-fluid-lg">About The Site</h1>
          <div className="flex flex-col h-full w-full items-center justify-center">
            <h1 className="text-fluid-lg text-neutral-500 dark:text-neutral-400 mx-auto">
              I made this website for fun.
            </h1>
            <h1 className="text-fluid-lg text-neutral-500 dark:text-neutral-400 mx-auto">
              I like to experiment with animations.
            </h1>
            <h1 className="text-fluid-lg text-neutral-500 dark:text-neutral-400 mx-auto">
              It was made using{" "}
              <LinkPreview
                url="https://nextjs.org/"
                className="font-bold group"
              >
                <GlitchText text="Next.js" />
              </LinkPreview>
              .
            </h1>
          </div>
        </div>
      ),
    },
    {
      title: "Location",
      value: "about-location",
      content: (
        <div className="flex flex-col h-full bg-slate-800 rounded-xl p-6">
          <h1 className="text-fluid-lg">About My Location</h1>
          <div className="flex flex-col h-full w-full items-center justify-center">
            <h1 className="text-fluid-lg text-neutral-500 dark:text-neutral-400 mx-auto">
              Coming Soon :)
            </h1>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MotionDiv
      className="h-full w-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={bounce}
    >
      <Tabs tabs={tabs} />
    </MotionDiv>
  );
}
