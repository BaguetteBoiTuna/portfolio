"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Github,
  Twitter,
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  X,
} from "lucide-react";
import GlitchText from "@/components/ui/glitch-text";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export default function SocialDock() {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<{
    name: string;
    color: string;
  } | null>(null);

  const dockRef = useRef<HTMLDivElement>(null);

  const email = "dev@dante.quest";
  const githubUsername = "baguetteboituna";
  const twitterUsername = "BaguetteBoiTuna";

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleClickOutside = (event: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", checkMobile);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCopy = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    {
      name: "Github",
      icon: Github,
      href: `https://github.com/${githubUsername}`,
      color: "#24292e", // Github Dark
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: `https://x.com/${twitterUsername}`,
      color: "#1DA1F2", // Twitter Blue
    },
  ];

  const Container = isMobile ? AlertDialog : React.Fragment;
  const Trigger = isMobile ? AlertDialogTrigger : React.Fragment;

  return (
    <div className="flex items-center gap-3 h-[52px]" ref={dockRef}>
      <Container>
        <div className="flex items-center p-1.5 gap-2 rounded-full border border-white/10 bg-neutral-900/60 backdrop-blur-md shadow-xl relative z-20">
          {/* Social Icons */}
          <div className="flex items-center gap-1">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                // Update state on hover
                onMouseEnter={() =>
                  !isOpen &&
                  setHoveredSocial({ name: social.name, color: social.color })
                }
                onMouseLeave={() => setHoveredSocial(null)}
                className={cn(
                  "relative group flex items-center justify-center w-10 h-10 rounded-full",
                  "bg-transparent hover:bg-white/10 transition-all duration-300",
                  "text-neutral-400 hover:text-white",
                )}
                aria-label={social.name}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-[1px] h-5 bg-white/10 mx-1" />

          {/* BUTTON AREA */}
          {isMobile ? (
            <Trigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 rounded-full px-5 bg-white text-black hover:bg-neutral-200 transition-all"
              >
                <Mail size={16} className="mr-2" />
                <GlitchText text="Get in touch" color="black" />
              </Button>
            </Trigger>
          ) : (
            // --- DESKTOP ANIMATION ---
            <motion.div
              layout
              className="relative flex items-center h-10 rounded-full overflow-hidden cursor-pointer border border-transparent group"
              animate={{
                width: isOpen ? "auto" : 140,
                // If hovered social exists, use its color. If open, dark grey. Default white.
                backgroundColor: isOpen
                  ? "#171717"
                  : hoveredSocial
                    ? hoveredSocial.color
                    : "#ffffff",
                borderColor: isOpen ? "rgba(255,255,255,0.1)" : "transparent",
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                mass: 0.8,
              }}
              onClick={() => !isOpen && setIsOpen(true)}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {!isOpen ? (
                  <motion.div
                    key={hoveredSocial ? hoveredSocial.name : "default"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center gap-2 font-medium text-sm whitespace-nowrap w-full"
                  >
                    {hoveredSocial ? (
                      // Social Tooltip State
                      <span className="text-white flex items-center gap-2">
                        {/* We duplicate the icon here for effect, or just keep text */}
                        {hoveredSocial.name === "Github" && (
                          <Github size={16} />
                        )}
                        {hoveredSocial.name === "Twitter" && (
                          <Twitter size={16} />
                        )}
                        {hoveredSocial.name}
                      </span>
                    ) : (
                      // Default State
                      <span className="text-black flex items-center gap-2">
                        {/* Wiggle the mail icon on button hover using standard CSS group-hover */}
                        <Mail
                          size={16}
                          className="group-hover:-rotate-12 transition-transform duration-300 ease-in-out"
                        />
                        <GlitchText text="Get in touch" color="black" />
                      </span>
                    )}
                  </motion.div>
                ) : (
                  // Expanded State (Email)
                  <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 px-4 whitespace-nowrap h-full"
                  >
                    <span className="text-sm font-mono text-neutral-200 select-all">
                      {email}
                    </span>

                    <div className="w-[1px] h-4 bg-white/20" />

                    <div className="flex items-center gap-1">
                      <button
                        onClick={handleCopy}
                        className="flex items-center justify-center w-7 h-7 rounded-full hover:bg-white/20 text-neutral-400 hover:text-white transition-colors"
                        title="Copy"
                      >
                        {copied ? (
                          <Check size={14} className="text-green-500" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>

                      <a
                        href={`mailto:${email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-center w-7 h-7 rounded-full hover:bg-white/20 text-neutral-400 hover:text-white transition-colors"
                        title="Open"
                      >
                        <ArrowUpRight size={14} />
                      </a>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsOpen(false);
                        }}
                        className="flex items-center justify-center w-7 h-7 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors ml-1"
                        title="Close"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Mobile Modal Content */}
        {isMobile && (
          <AlertDialogContent className="sm:max-w-[425px] bg-neutral-950 border-neutral-800">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">
                Let&apos;s build something.
              </AlertDialogTitle>
              <AlertDialogDescription className="text-neutral-400">
                Feel free to reach out for collaborations, questions, or just to
                say hi.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex items-center gap-2 mt-4 p-3 border border-white/10 rounded-xl bg-neutral-900/50">
              <code className="flex-1 text-sm font-mono text-neutral-300 select-all">
                {email}
              </code>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 hover:bg-white/10 text-neutral-400 hover:text-white"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel className="border-white/10 bg-transparent text-white hover:bg-white/10">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                asChild
                className="bg-white text-black hover:bg-neutral-200"
              >
                <a href={`mailto:${email}`}>Open Mail App</a>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </Container>
    </div>
  );
}
