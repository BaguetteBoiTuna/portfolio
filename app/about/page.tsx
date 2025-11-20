import { LinkPreview } from "@/components/ui/link-preview";
import MotionDiv from "@/components/ui/motion-div";
import { bounce } from "@/components/animations/animation-utils";
import { Tabs } from "@/components/ui/tabs";
import GlitchText from "@/components/ui/glitch-text";
import type { Metadata } from "next";
import {
  User,
  Globe,
  Cpu,
  Layout,
  Terminal,
  Music,
  Gamepad2,
  Code2,
  Plane,
  Zap,
  FileCode,
  GraduationCap,
  Milestone,
  Briefcase,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Dante.",
};

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

  const cardBaseStyle =
    "relative flex flex-col h-full w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl ring-1 ring-black/5 dark:border-neutral-800 dark:bg-zinc-950 dark:shadow-white/5 dark:ring-white/5";

  const tabs = [
    {
      title: "Me",
      value: "about-me",
      content: (
        <div className={cardBaseStyle}>
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />

          <div className="relative z-10 flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500 text-white rounded-lg shadow-md shadow-blue-500/20">
              <User size={20} />
            </div>
            <h1 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
              Profile
            </h1>
          </div>

          <div className="relative z-10 flex flex-col justify-between h-full gap-6">
            <div className="space-y-4">
              <div className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Hey, I&apos;m{" "}
                <span className="font-semibold text-black dark:text-white">
                  Dante
                </span>
                .
                <div className="text-sm text-neutral-500 mt-1 flex items-center gap-2">
                  <span>{age} years old</span>
                  <span className="w-1 h-1 bg-neutral-400 rounded-full" />
                  <span>EN/FR Speaker</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <p className="font-medium text-neutral-700 dark:text-neutral-200 flex items-center gap-2">
                  <Code2 size={16} className="text-blue-500" />
                  CS Student @ Epitech
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-xs font-medium text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800">
                  <Gamepad2 size={14} /> Gaming
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-xs font-medium text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800">
                  <Terminal size={14} /> Coding
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-xs font-medium text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800">
                  <Plane size={14} /> Travel
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-xs font-medium text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800">
                  <Music size={14} /> Music
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <div className="text-center text-neutral-500 dark:text-neutral-400 text-sm">
                My config? Check my{" "}
                <LinkPreview
                  url="https://github.com/BaguetteBoiTuna/dotfiles"
                  className="font-bold glitch text-neutral-900 dark:text-neutral-100 underline decoration-neutral-500/30 underline-offset-4 inline-block"
                >
                  <GlitchText text="dotfiles" />
                </LinkPreview>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Site",
      value: "about-site",
      content: (
        <div className={cardBaseStyle}>
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none" />

          <div className="relative z-10 flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500 text-white rounded-lg shadow-md shadow-purple-500/20">
              <Cpu size={20} />
            </div>
            <h1 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
              Tech Stack
            </h1>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto custom-scrollbar pr-1 max-h-[380px]">
            {/* Next.js */}
            <div className="flex flex-col p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-purple-500/30 transition-colors group">
              <div className="flex items-center gap-2 mb-1 font-semibold">
                <Globe
                  size={16}
                  className="text-neutral-500 group-hover:text-purple-400 transition-colors"
                />
                <LinkPreview
                  url="https://nextjs.org/"
                  className="text-neutral-800 dark:text-neutral-200 group-hover:text-purple-400 transition-colors"
                >
                  Next.js
                </LinkPreview>
              </div>
              <div className="text-xs text-neutral-500">
                App Router & Hybrid Rendering.
              </div>
            </div>

            {/* React */}
            <div className="flex flex-col p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500/30 transition-colors group">
              <div className="flex items-center gap-2 mb-1 font-semibold">
                <Code2
                  size={16}
                  className="text-neutral-500 group-hover:text-blue-400 transition-colors"
                />
                <LinkPreview
                  url="https://react.dev/"
                  className="text-neutral-800 dark:text-neutral-200 group-hover:text-blue-400 transition-colors"
                >
                  React
                </LinkPreview>
              </div>
              <div className="text-xs text-neutral-500">
                The library for web and native user interfaces.
              </div>
            </div>

            {/* Tailwind */}
            <div className="flex flex-col p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500/30 transition-colors group">
              <div className="flex items-center gap-2 mb-1 font-semibold">
                <Layout
                  size={16}
                  className="text-neutral-500 group-hover:text-cyan-400 transition-colors"
                />
                <LinkPreview
                  url="https://tailwindcss.com/"
                  className="text-neutral-800 dark:text-neutral-200 group-hover:text-cyan-400 transition-colors"
                >
                  Tailwind
                </LinkPreview>
              </div>
              <div className="text-xs text-neutral-500">
                Utility-first CSS styling.
              </div>
            </div>

            {/* Motion */}
            <div className="flex flex-col p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-yellow-500/30 transition-colors group">
              <div className="flex items-center gap-2 mb-1 font-semibold">
                <Zap
                  size={16}
                  className="text-neutral-500 group-hover:text-yellow-400 transition-colors"
                />
                <LinkPreview
                  url="https://motion.dev/"
                  className="text-neutral-800 dark:text-neutral-200 group-hover:text-yellow-400 transition-colors"
                >
                  Motion
                </LinkPreview>
              </div>
              <div className="text-xs text-neutral-500">
                Smooth animations & gestures.
              </div>
            </div>

            {/* TypeScript */}
            <div className="flex flex-col p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-600/30 transition-colors group">
              <div className="flex items-center gap-2 mb-1 font-semibold">
                <FileCode
                  size={16}
                  className="text-neutral-500 group-hover:text-blue-600 transition-colors"
                />
                <LinkPreview
                  url="https://www.typescriptlang.org/"
                  className="text-neutral-800 dark:text-neutral-200 group-hover:text-blue-600 transition-colors"
                >
                  TypeScript
                </LinkPreview>
              </div>
              <div className="text-xs text-neutral-500">
                Static type checking for safety.
              </div>
            </div>

            {/* Bun */}
            <div className="flex flex-col p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-orange-500/30 transition-colors group">
              <div className="flex items-center gap-2 mb-1 font-semibold">
                <Terminal
                  size={16}
                  className="text-neutral-500 group-hover:text-orange-400 transition-colors"
                />
                <LinkPreview
                  url="https://bun.sh/"
                  className="text-neutral-800 dark:text-neutral-200 group-hover:text-orange-400 transition-colors"
                >
                  Bun
                </LinkPreview>
              </div>
              <div className="text-xs text-neutral-500">
                Fast JavaScript runtime & manager.
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-auto pt-4 text-center">
            <p className="text-xs text-neutral-400 dark:text-neutral-600 font-mono">
              I wonder what happens when we trigger a 404 🤔
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Journey",
      value: "about-roadmap",
      content: (
        <div className={cardBaseStyle}>
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />

          <div className="relative z-10 flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-500 text-white rounded-lg shadow-md shadow-orange-500/20">
              <Milestone size={20} />
            </div>
            <h1 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
              Epitech Journey
            </h1>
          </div>

          <div className="relative z-10 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2 pl-1 h-full">
            {/* Year 5 */}
            <div className="flex gap-4 relative group">
              <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-800 group-hover:bg-orange-500/50 transition-colors" />
              <div className="flex flex-col items-center shrink-0">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center z-10 shadow-lg shadow-orange-500/20 ring-4 ring-white dark:ring-zinc-950">
                  <GraduationCap size={14} className="text-white" />
                </div>
              </div>
              <div className="pb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-orange-500">
                    Year 5
                  </span>
                  <span className="text-xs font-medium bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded-full">
                    Current
                  </span>
                </div>
                <h3 className="font-bold text-neutral-800 dark:text-neutral-100 text-sm">
                  Specialization & Graduation
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                  Final year project (EIP) delivery and preparation for
                  graduation.
                </p>
              </div>
            </div>

            {/* Year 4 - Taiwan */}
            <div className="flex gap-4 relative group">
              <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-800 group-hover:bg-emerald-500/50 transition-colors" />
              <div className="flex flex-col items-center shrink-0">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center z-10 shadow-lg shadow-emerald-500/20 ring-4 ring-white dark:ring-zinc-950">
                  <Globe size={14} className="text-white" />
                </div>
              </div>
              <div className="pb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-emerald-500">
                    Year 4
                  </span>
                </div>
                <h3 className="font-bold text-neutral-800 dark:text-neutral-100 text-sm">
                  International Year
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                  Studied abroad at{" "}
                  <span className="text-emerald-400 font-medium">
                    NTPU, Taiwan
                  </span>
                  . Exploring new cultures and tech ecosystems.
                </p>
              </div>
            </div>

            {/* Year 3 */}
            <div className="flex gap-4 relative group">
              <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-800 group-hover:bg-blue-500/50 transition-colors" />
              <div className="flex flex-col items-center shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center z-10 ring-4 ring-white dark:ring-zinc-950">
                  <Briefcase size={14} className="text-white" />
                </div>
              </div>
              <div className="pb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-blue-500">
                    Year 3
                  </span>
                </div>
                <h3 className="font-bold text-neutral-800 dark:text-neutral-100 text-sm">
                  Professionalization
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                  Part-time internship rotation and initialization of the EIP
                  (Epitech Innovative Project).
                </p>
              </div>
            </div>

            {/* Years 1-2 */}
            <div className="flex gap-4 relative group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-8 h-8 rounded-full bg-neutral-500 flex items-center justify-center z-10 ring-4 ring-white dark:ring-zinc-950">
                  <BookOpen size={14} className="text-white" />
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-neutral-500">
                    Years 1-2
                  </span>
                </div>
                <h3 className="font-bold text-neutral-800 dark:text-neutral-100 text-sm">
                  The Fundamentals
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                  Intensive C/C++ Pool, Unix system programming, Web
                  development, and DevOps basics.
                </p>
              </div>
            </div>
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
