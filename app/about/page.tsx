import { LinkPreview } from "@/components/ui/link-preview";
import MotionDiv from "@/components/ui/motion-div";
import { bounce } from "@/components/animations/animation-utils";
import { Tabs } from "@/components/ui/tabs";
import GlitchText from "@/components/ui/glitch-text";

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
  const tabs = [
    {
      title: "Me",
      value: "about-me",
      content: (
        <div className="flex flex-col h-full bg-slate-800 rounded-xl p-6">
          <h1 className="text-fluid-md">About Me</h1>
          <div className="flex flex-col h-full w-full items-center justify-center">
            <p className="text-fluid-smd text-neutral-500 dark:text-neutral-400">
              Hey, I&apos;m Dante, a {age} year old fluent in both english and
              french.
            </p>
            <p className="text-fluid-smd text-neutral-500 dark:text-neutral-400">
              Currently studying computer science at Epitech.
            </p>
            <p className="text-fluid-smd text-neutral-500 dark:text-neutral-400">
              I love gaming, coding, configuring the tools I use and music.
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
          <div className="flex flex-col h-full w-full items-center justify-center">
            <h1 className="text-fluid-smd text-neutral-500 dark:text-neutral-400 mx-auto">
              I made this website for fun.
            </h1>
            <h1 className="text-fluid-smd text-neutral-500 dark:text-neutral-400 mx-auto">
              I like to experiment with animations.
            </h1>
            <h1 className="text-fluid-smd text-neutral-500 dark:text-neutral-400 mx-auto">
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
          <h1 className="text-fluid-md">About My Location</h1>
          <div className="flex flex-col h-full w-full items-center justify-center">
            <h1 className="text-fluid-smd text-neutral-500 dark:text-neutral-400 mx-auto">
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
