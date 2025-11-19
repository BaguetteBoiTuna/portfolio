"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import GlitchText from "./glitch-text";
import { Copy, Check, Mail } from "lucide-react";

function FunnyButton() {
  const [copied, setCopied] = useState(false);
  const email = "dev@dante.quest";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="mt-4 w-full glitch group">
          <Mail size={18} className="group-hover:animate-bounce" />
          <GlitchText text="Contact Me" color="black" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Get in touch</AlertDialogTitle>
          <AlertDialogDescription>
            Feel free to reach out for collaborations, questions, or just to say
            hi.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center space-x-2 mt-2 p-3 border rounded-md bg-muted/50 relative">
          <code className="flex-1 text-sm font-mono text-foreground select-all">
            {email}
          </code>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="sr-only">Copy email</span>
          </Button>
        </div>
        <AlertDialogFooter className="sm:justify-start gap-2">
          <AlertDialogAction asChild className="w-full sm:w-auto">
            <a href={`mailto:${email}`}>Open Mail App</a>
          </AlertDialogAction>
          <AlertDialogCancel className="w-full sm:w-auto mt-2 sm:mt-0">
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default FunnyButton;
