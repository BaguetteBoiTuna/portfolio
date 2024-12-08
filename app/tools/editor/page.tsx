import { LinkPreview } from "@/components/ui/link-preview";
import MotionDiv from "@/components/ui/motion-div";
import { bounce } from "@/components/animations/animation-utils";

export default function Editor() {
  return (
    <div className="flex">
      <div className="flex flex-col">
        <div className="overflow-hidden">
          <MotionDiv
            className="inline-block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={bounce}
          >
            <h1 className="text-fluid-lg text-neutral-500 dark:text-neutral-400 mx-auto">
              <LinkPreview url="https://www.lazyvim.org/" className="font-bold">
                LazyVim{" "}
              </LinkPreview>
              is my go-to editor.
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
              But I also enjoy using{" "}
              <LinkPreview url="https://zed.dev/" className="font-bold">
                Zed
              </LinkPreview>
              .
            </h1>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
}
