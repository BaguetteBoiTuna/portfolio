import MotionDiv from "@/components/ui/motion-div";
import { bounce } from "@/components/animations/animation-utils";
import Image from "next/image";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

export default function Editor() {
  const content = [
    {
      title: "LazyVim",
      url: "https://www.lazyvim.org/",
      description:
        "Love vim keys but hate the hassle of configuring neovim? LazyVim has you covered with a pre-built, performance-focused setup that’s fully customizable. It came with sensible defaults, and I barely had to tweak it to suit my workflow it just works.",
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
          <Image
            src="/lazyvim.webp"
            width={1000}
            height={800}
            className="h-full w-full object-cover"
            alt="LazyVim"
          />
        </div>
      ),
    },
    {
      title: "Zed",
      url: "https://zed.dev/",
      description:
        "Zed is my go-to editor for when someone needs to code on my computer. It’s clean, distraction-free, and easy to use, so anyone can jump in without messing with my main neovim setup. Perfect for quick pair coding or one-off edits.",
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
          <Image
            src="/zed.webp"
            width={1000}
            height={800}
            className="h-full w-full object-cover"
            alt="Zed"
          />
        </div>
      ),
    },
  ];

  return (
    <MotionDiv
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={bounce}
      className="flex flex-col items-center justify-center w-full h-full"
    >
      <StickyScroll content={content} />
    </MotionDiv>
  );
}
