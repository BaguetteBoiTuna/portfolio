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
            you had no reason to click me, but here we are. i&apos;m just a
            button.
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
