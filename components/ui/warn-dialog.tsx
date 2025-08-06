"use client";

import { useState } from "react";
import { ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import RouterLink from "./router-link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  //DialogTrigger,
} from "@/components/ui/dialog";

export default function WarnDialog() {
  const [step, setStep] = useState(1);

  const stepContent = [
    {
      title: "Welcome 👋",
      description: "You’ve entered a shared canvas where ideas flow freely.",
    },
    {
      title: "It’s Live ✨",
      description:
        "Everything you draw is real-time. You’ll see others move, draw, and create with you.",
    },

    {
      title: "Keep it SFW 🙏",
      description: "No NSFW, hate or shock pics. Please be cool.",
    },
    {
      title: "Leave a Mark ✍️",
      description:
        "This canvas lives on my portfolio, Leave me a doodle, signature, or cursed masterpiece.",
    },
  ];

  const totalSteps = stepContent.length;

  const handleContinue = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  return (
    <Dialog
      defaultOpen
      onOpenChange={(open) => {
        if (open) setStep(1);
      }}
    >
      {/* <DialogTrigger asChild> */}
      {/*   <Button variant="outline">Warn</Button> */}
      {/* </DialogTrigger> */}
      <DialogContent className="gap-0 p-0 [&>button:last-child]:text-white">
        <div className="p-2">
          <img
            className="w-full rounded-md bg-white"
            src="/emoji.png"
            width={382}
            height={216}
            alt="dialog"
          />
        </div>
        <div className="space-y-6 px-6 pt-3 pb-6">
          <DialogHeader>
            <DialogTitle>{stepContent[step - 1].title}</DialogTitle>
            <DialogDescription>
              {stepContent[step - 1].description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex justify-center space-x-1.5 max-sm:order-1">
              {[...Array(totalSteps)].map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "bg-primary size-1.5 rounded-full",
                    index + 1 === step ? "bg-primary" : "opacity-20",
                  )}
                />
              ))}
            </div>
            <DialogFooter>
              <Button variant="destructive" asChild>
                <RouterLink href="/">Nope</RouterLink>
              </Button>
              {step < totalSteps ? (
                <Button
                  className="group"
                  type="button"
                  onClick={handleContinue}
                >
                  Next
                  <ArrowRightIcon
                    className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
                    size={16}
                    aria-hidden="true"
                  />
                </Button>
              ) : (
                <DialogClose asChild>
                  <Button type="button">Okay</Button>
                </DialogClose>
              )}
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
