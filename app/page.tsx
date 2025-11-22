import { FlipWords } from "@/components/ui/flip-words";
import MotionDiv from "@/components/ui/motion-div";
import { bounce } from "@/components/animations/animation-utils";
import { FlipHover3DImage } from "@/components/ui/flip-3d-image";
import SocialDock from "@/components/ui/social-dock";

export default function Home() {
  const names = ["Dante", "TunaSub"];
  const githubUsername = "baguetteboituna";
  const githubProfilePicture = `https://github.com/${githubUsername}.png`;

  return (
    <section className="relative flex w-full min-h-[80vh] items-center justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none z-0" />

      <div className="flex flex-col-reverse lg:flex-row w-full items-center justify-between gap-12 lg:gap-4 z-10">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 flex-1">
          <div className="space-y-2">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, ...bounce }}
            >
              <span className="text-sm md:text-base text-neutral-400 font-medium tracking-wider uppercase">
                Hey there! I&apos;m
              </span>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ...bounce }}
              className="relative"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white">
                <div className="hidden lg:block">
                  <FlipWords words={names} className="!text-white pl-0" />
                </div>
                <div className="block lg:hidden">
                  <FlipWords words={names} className="!text-white px-0" />
                </div>
              </h1>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ...bounce }}
            >
              <h2 className="text-lg md:text-xl text-neutral-400 max-w-md mx-auto lg:mx-0 leading-relaxed">
                A software developer obsessed with{" "}
                <span className="text-neutral-100 font-semibold">
                  efficiency
                </span>{" "}
                and{" "}
                <span className="text-neutral-100 font-semibold">tools</span>.
              </h2>
            </MotionDiv>
          </div>

          <MotionDiv
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, ...bounce }}
          >
            <SocialDock />
          </MotionDiv>
        </div>

        <MotionDiv
          className="relative flex items-center justify-center flex-1"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, ...bounce }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-2xl rounded-full transform scale-90" />

          <div className="relative z-10 w-[280px] h-[280px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]">
            <FlipHover3DImage
              frontSrc={githubProfilePicture}
              backSrc="/qr-code.png"
              alt="Github Profile Picture"
            />
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
