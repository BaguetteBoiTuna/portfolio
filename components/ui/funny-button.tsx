"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TextReveal } from "./text-reveal";

function FunnyButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="mt-4 w-full">Don&apos;t click me</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>why did you click me :(</AlertDialogTitle>
          <AlertDialogDescription>
            <div>
              <TextReveal
                text="Why did you even click this?"
                revealText="This button is just here for symmetry ¯\_(ツ)_/¯"
                className="mt-4"
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>ok :(</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default FunnyButton;
