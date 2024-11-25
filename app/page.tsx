import { FlipWords } from "@/components/ui/flip-words";
import { Button } from "@/components/ui/button";
import { Github, Twitter } from "lucide-react";
import Navbar from "@/components/ui/navbar";
import Image from "next/image";
import FunnyButton from "@/components/ui/funny-button";

export default function Home() {
  const names = ["Dante", "TunaSub", "BaguetteBoiTuna"];
  const githubUsername = "baguetteboituna";
  const twitterUsername = "BaguetteBoiTuna";
  const githubProfilePicture = `https://github.com/${githubUsername}.png`;

  return (
    <div className="flex w-full h-screen flex-col">
      <Navbar />
      <div className="flex flex-col mx-auto w-full sm:max-w-[80%] h-full items-center justify-center">
        <div className="flex flex-col w-full sm:flex-row items-center justify-evenly">
          <div className="flex flex-col">
            <h1 className="text-fluid-lg font-bold">
              Hey there! I&apos;m
              <FlipWords words={names} />
            </h1>
            <h2 className="text-fluid-md">
              A developer obsessed with efficiency and tools.
            </h2>
            <div className="flex w-full flex-row justify-evenly gap-4">
              <Button asChild className="mt-4">
                <a
                  href={`https://github.com/${githubUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center gap-2"
                >
                  <Github size={18} />
                  GitHub
                </a>
              </Button>
              <Button asChild className="mt-4">
                <a
                  href={`https://x.com/${twitterUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center gap-2"
                >
                  <Twitter size={18} />
                  Twitter
                </a>
              </Button>
              <FunnyButton />
            </div>
          </div>
          <div className="flex w-fluid-lg h-fluid-lg overflow-hidden">
            <Image
              src={githubProfilePicture}
              alt="GitHub Profile Picture"
              layout="responsive"
              width={1}
              height={1}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
