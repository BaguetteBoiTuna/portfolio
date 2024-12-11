import { LinkPreview } from "@/components/ui/link-preview";
import MotionDiv from "@/components/ui/motion-div";
import { bounce } from "@/components/animations/animation-utils";

export default function About() {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col h-full w-full items-center justify-center">
        <div className="overflow-hidden">
          <MotionDiv
            className="inline-block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={bounce}
          >
            <h1 className="text-fluid-lg text-neutral-500 dark:text-neutral-400 mx-auto">
              I made this website for fun.
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
            <h1 className="text-fluid-lg text-neutral-500 dark:text-neutral-400 mx-auto">
              It was made using{" "}
              <LinkPreview url="https://nextjs.org/" className="font-bold">
                Next.js
              </LinkPreview>
              .
            </h1>
          </MotionDiv>
        </div>
      </div>
      <div className="flex flex-col h-full w-full items-center justify-end p-6">
        <MotionDiv
          className="inline-block"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={bounce}
        >
          <h1 className="text-fluid-sm text-neutral-500 dark:text-neutral-400 mx-auto">
            More about me coming soon!
          </h1>
        </MotionDiv>
      </div>
    </div>
  );
}
