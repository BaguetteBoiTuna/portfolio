"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const TextReveal = ({
  text,
  revealText,
  className,
}: {
  text: string;
  revealText: string;
  className?: string;
}) => {
  const [widthPercentage, setWidthPercentage] = useState<number>(0);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [left, setLeft] = useState<number>(0);
  const [localWidth, setLocalWidth] = useState<number>(0);
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

  useEffect(() => {
    if (textRef.current) {
      const { left, width: localWidth } =
        textRef.current.getBoundingClientRect();
      setLeft(left);
      setLocalWidth(localWidth);
    }
  }, []);

  function mouseMoveHandler(event: React.MouseEvent) {
    const { clientX } = event;
    const relativeX = clientX - left;
    setWidthPercentage((relativeX / localWidth) * 100);
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false);
    setWidthPercentage(0);
  }

  function mouseEnterHandler() {
    setIsMouseOver(true);
  }

  return (
    <div
      ref={textRef}
      onMouseEnter={mouseEnterHandler}
      onMouseMove={mouseMoveHandler}
      onMouseLeave={mouseLeaveHandler}
      className={`relative overflow-hidden ${className}`}
    >
      {/* revealed text */}
      <motion.div
        style={{ width: "100%" }}
        animate={{
          clipPath: isMouseOver
            ? `inset(0 ${100 - widthPercentage}% 0 0)`
            : "inset(0 100% 0 0)",
        }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 left-0 h-full w-full z-10 bg-gradient-to-r from-black to-black"
      >
        <span className="font-bold text-white text-lg">{revealText}</span>
      </motion.div>

      {/* static text */}
      <span className="font-bold text-neutral-500 text-lg">{text}</span>
    </div>
  );
};
