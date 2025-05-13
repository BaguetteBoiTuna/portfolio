import { LinkPreview } from "@/components/ui/link-preview";
import MotionDiv from "@/components/ui/motion-div";
import { bounce } from "@/components/animations/animation-utils";
import { Tabs } from "@/components/ui/tabs";
import GlitchText from "@/components/ui/glitch-text";
import { Progress } from "@heroui/react";
import { useMemo } from "react";

export default function About() {
  if (!process.env.BIRTH_DATE)
    throw new Error("Birth date is not set in the .env file.");
  const birthDate = new Date(process.env.BIRTH_DATE);

  const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };
  const age = calculateAge(birthDate);

  const arrival = new Date("2024-08-29T16:30:00Z").getTime() / 1000;
  const departure = new Date("2025-06-10T03:40:00Z").getTime() / 1000;
  const progress = useMemo(() => {
    const now = Math.floor(Date.now() / 1000);
    if (now <= arrival) return 0;
    if (now >= departure) return 100;
    return ((now - arrival) / (departure - arrival)) * 100;
  }, [arrival, departure]);

  const timeRemaining = useMemo(() => {
    const now = Math.floor(Date.now() / 1000);
    const diff = departure - now;
    if (diff <= 0) return "You're already back in France!";
    const days = Math.floor(diff / 86400);
    if (days < 30) {
      return `${days} days remaining`;
    } else {
      const months = Math.floor(days / 30);
      return `${months} months remaining`;
    }
  }, [departure]);

  const tabs = [
    {
      title: "Me",
      value: "about-me",
      content: (
        <div className="flex flex-col h-full bg-slate-800 rounded-xl p-6">
          <h1 className="text-fluid-md">About Me</h1>
          <div className="flex flex-col h-full w-full items-center justify-center text-center">
            <p className="text-fluid-smd text-neutral-500 dark:text-neutral-400">
              Hey, I&apos;m Dante, a {age} year old fluent in both English and
              French.
            </p>
            <p className="text-fluid-smd text-neutral-500 dark:text-neutral-400">
              Currently studying computer science at Epitech.
            </p>
            <p className="text-fluid-smd text-neutral-500 dark:text-neutral-400">
              I love gaming, coding, traveling, configuring the tools I use and
              music.
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
          <h1 className="text-fluid-md">About The Site</h1>
          <div className="flex flex-col h-full w-full items-center justify-center text-center">
            <h1 className="text-fluid-smd text-neutral-500 dark:text-neutral-400">
              I made this website for fun.
            </h1>
            <h1 className="text-fluid-smd text-neutral-500 dark:text-neutral-400">
              My personal playgound to experiment with animations and
              components.
            </h1>
            <h1 className="text-fluid-smd text-neutral-500 dark:text-neutral-400">
              It was made using{" "}
              <LinkPreview
                url="https://nextjs.org/"
                className="font-bold glitch"
              >
                <GlitchText text="Next.js" />
              </LinkPreview>{" "}
              for hybrid rendering.
            </h1>
            <h1 className="text-fluid-smd text-neutral-500 dark:text-neutral-400">
              Styling crafted with{" "}
              <LinkPreview
                url="https://tailwindcss.com/"
                className="font-bold glitch"
              >
                <GlitchText text="Tailwind 3" />
              </LinkPreview>{" "}
              for lightning fast utility-first CSS.
            </h1>
            <h1 className="text-fluid-smd text-neutral-500 dark:text-neutral-400">
              Powered by{" "}
              <LinkPreview
                url="https://motion.dev/"
                className="font-bold glitch"
              >
                <GlitchText text="Motion" />
              </LinkPreview>{" "}
              for smooth animations.
            </h1>
            <h1 className="text-fluid-smd text-neutral-500 dark:text-neutral-400">
              Built and ran using{" "}
              <LinkPreview url="https://bun.sh/" className="font-bold glitch">
                <GlitchText text="Bun" />
              </LinkPreview>{" "}
              for its speed and simplicity.
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
          <h1 className="text-fluid-md">About My Location</h1>
          <div className="flex flex-col h-full w-full items-center justify-center text-center gap-2">
            <h1 className="text-fluid-smd text-neutral-500 dark:text-neutral-400">
              I am currently studying in Taiwan at National Taipei University
              (NTPU).
            </h1>
            <div className="flex flex-row w-full items-center justify-center gap-4">
              <span className="text-3xl">🛬🇹🇼</span>
              <Progress
                aria-label="taiwan-stay"
                className="max-w-md"
                value={progress}
              />
              <span className="text-3xl">🛫🇫🇷</span>
            </div>
            <p className="text-fluid-smd text-neutral-500 dark:text-neutral-400">
              {timeRemaining}
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MotionDiv
      className="h-full w-full flex flex-col items-center justify-items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={bounce}
    >
      <Tabs tabs={tabs} />
    </MotionDiv>
  );
}
