"use client";

import { motion, MotionValue } from "motion/react";
import { useState, CSSProperties } from "react";

export default function FlipTile({
  rotateX,
  rotateY,
  translateX,
  translateY,
  size,
  initialColor = "white",
  styleOverride = {},
}: {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  translateX: MotionValue<string>;
  translateY: MotionValue<string>;
  size: number;
  initialColor?: string;
  styleOverride?: CSSProperties;
}) {
  const [flipped, setFlipped] = useState(false);
  const [frontColor, setFrontColor] = useState(initialColor);
  const [backColor, setBackColor] = useState(initialColor);
  const [cooldown, setCooldown] = useState(false);

  const randomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}deg 90% 70%)`;
  };

  const handleEnter = () => {
    if (cooldown) return;

    setCooldown(true);

    setFlipped((prev) => {
      const next = !prev;

      if (next) {
        setBackColor(randomColor());
      } else {
        setFrontColor(randomColor());
      }

      return next;
    });

    setTimeout(() => setCooldown(false), 800);
  };

  return (
    <motion.div
      style={{
        width: size,
        height: size,
        position: "absolute",
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        translateX,
        translateY,
        ...styleOverride,
      }}
    >
      <motion.div
        onMouseEnter={handleEnter}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{
          duration: 0.8,
          ease: [0.34, 1.56, 0.64, 1],
          damping: 15,
          stiffness: 120,
          type: "spring",
        }}
        style={{
          width: size,
          height: size,
          position: "absolute",
          inset: 0,
          transformStyle: "preserve-3d",
          cursor: "pointer",
        }}
      >
        {/* FRONT */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            borderRadius: 6,
            background: frontColor,
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
          }}
        />

        {/* BACK */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: 6,
            background: backColor,
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
