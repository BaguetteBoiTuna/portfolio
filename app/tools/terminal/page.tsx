"use client";
// INFO: Weird issue with PopupModalImage is forcing me to set the page as client
import MotionDiv from "@/components/ui/motion-div";
import { bounce } from "@/components/animations/animation-utils";
import PopupModalImage from "@/components/ui/popup-modal-image";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

export default function Terminal() {
  const content = [
    {
      title: "Ghostty",
      url: "https://ghostty.org/",
      description:
        "I switched to Ghostty on day one because it was exactly what I was looking for in a terminal: native ui, easy to configure/theme, and blazingly fast. Its platform-native GUI ensures seamless integration with macos and linux incase I switch back to Arch one day, providing a cohesive user experience. Additionally, ghostty supports modern terminal specifications like styled underlines and the kitty graphics protocol, enhancing its versatility.",
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
          <PopupModalImage
            src="/ghostty.webp"
            width={1000}
            height={800}
            className="h-full w-full object-cover"
            alt="Ghostty"
          />
        </div>
      ),
    },
    {
      title: "Iterm2",
      url: "https://iterm2.com/",
      description:
        "Before Ghostty, I used iTerm2 because I encountered issues with WezTerm during extended use. iTerm2 is a highly customizable terminal emulator for macOS, offering features like split panes, hotkey windows, and a robust scripting API. However, it includes a plethora of features that exceeded my needs, making it more complex than necessary for my use case.",
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
          <PopupModalImage
            src="/iterm.webp"
            width={1000}
            height={800}
            className="h-full w-full object-cover"
            alt="Iterm2"
          />
        </div>
      ),
    },
    {
      title: "WezTerm",
      url: "https://wezfurlong.org/wezterm/",
      description:
        "Initially, upon switching to macOS, I chose WezTerm due to its Lua-based configuration, which appealed to my preference for scriptable setups. Unfortunately, I experienced minor graphical issues during prolonged sessions.",
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
          <PopupModalImage
            src="/wezterm.webp"
            width={1000}
            height={800}
            className="h-full w-full object-cover"
            alt="WezTerm"
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
