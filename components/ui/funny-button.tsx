"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  //AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TextReveal } from "./text-reveal";
import GlitchText from "./glitch-text";

function FunnyButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="mt-4 w-full glitch">
          <GlitchText text="Don't click me" color="black" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>why did you click me :(</AlertDialogTitle>
          <div>
            <TextReveal
              text="Why did you even click this?"
              revealText="This button is just here for symmetry ¯\_(ツ)_/¯"
              className="mt-4"
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>ok :(</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default FunnyButton;
