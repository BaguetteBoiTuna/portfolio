import MotionDiv from "@/components/ui/motion-div";
import { bounce } from "@/components/animations/animation-utils";
import PopupModalImage from "@/components/ui/popup-modal-image";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

export default function Browser() {
  const content = [
    {
      title: "Arc Browser",
      url: "https://www.browsercompany.com/",
      description:
        "Arc Browser is my go-to choice for daily browsing. Its ability to handle multiple profiles seamlessly is a very useful. I use one for Work, one for Entertainment, and another for Browser-based Games. It keeps my online life organized and distraction-free while offering a sleek and modern interface.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white">
          <PopupModalImage
            src="/arcbrowser.webp"
            width={1000}
            height={800}
            className="h-full w-full object-cover"
            alt="ArcBrowser"
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
