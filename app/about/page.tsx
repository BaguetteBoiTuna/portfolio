import { LinkPreview } from "@/components/ui/link-preview";
import MotionDiv from "@/components/ui/motion-div";
import { bounce } from "@/components/animations/animation-utils";
import { Tabs } from "@/components/ui/tabs";

export default function About() {
  const tabs = [
    {
      title: "About Me",
      value: "about-me",
      content: (
        <div className="flex flex-col h-full bg-slate-800 rounded-xl p-6">
          <h1 className="text-fluid-lg">About me</h1>
          <div className="flex flex-col h-full w-full items-center justify-center">
            <p className="text-fluid-md text-neutral-500 dark:text-neutral-400">
              Currently in Taiwan for my 4th year at Epitech.
            </p>
            <p className="text-fluid-md text-neutral-500 dark:text-neutral-400">
              This website is far from being finished.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "About the site",
      value: "about-site",
      content: (
        <div className="flex flex-col h-full bg-slate-800 rounded-xl p-6">
          <h1 className="text-fluid-lg">About the site</h1>
          <div className="flex flex-col h-full w-full items-center justify-center">
            <h1 className="text-fluid-lg text-neutral-500 dark:text-neutral-400 mx-auto">
              I made this website for fun.
            </h1>
            <h1 className="text-fluid-lg text-neutral-500 dark:text-neutral-400 mx-auto">
              It was made using{" "}
              <LinkPreview url="https://nextjs.org/" className="font-bold">
                Next.js
              </LinkPreview>
              .
            </h1>
          </div>
        </div>
      ),
    },
    {
      title: "About my location",
      value: "about-location",
      content: (
        <div className="flex flex-col h-full bg-slate-800 rounded-xl p-6">
          <h1 className="text-fluid-lg">About my location</h1>
          <div className="flex flex-col h-full w-full items-center justify-center">
            <h1 className="text-fluid-lg text-neutral-500 dark:text-neutral-400 mx-auto">
              Coming soon :)
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
