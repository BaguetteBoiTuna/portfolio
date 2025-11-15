"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function YoinkdlpWipDialog() {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="border border-neutral-700 bg-neutral-900 text-neutral-100 sm:max-w-md">
        <DialogHeader className="space-y-3">
          <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            YoinkDLP is still a work in progress
          </DialogTitle>
          <DialogDescription className="text-neutral-300">
            YouTube started blocking Vercel&apos;s IP range, so I&apos;m
            migrating the whole pipeline to Cloudflare Workers. Things might get
            weird until that move is done.
          </DialogDescription>
        </DialogHeader>
        <ul className="list-disc space-y-2 pl-4 text-sm text-neutral-300">
          <li>
            Downloads will fail so don&apos;t bother using it for the moment.
          </li>
        </ul>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button className="w-full sm:w-auto">I understand</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
