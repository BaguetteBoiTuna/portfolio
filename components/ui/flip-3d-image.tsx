"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";

type Props = {
  frontSrc: string;
  backSrc: string;
  alt: string;
};

export const FlipHover3DImage = ({ frontSrc, backSrc, alt }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [idleCooldown, setIdleCooldown] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const idleTiltX = useMotionValue(0);
  const idleTiltY = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  React.useEffect(() => {
    if (isHovering || idleCooldown) return;

    let frame: number;
    const start = performance.now();

    const loop = (t: number) => {
      if (isHovering) return;

      const elapsed = t - start;

      const float = Math.sin(elapsed / 1200) * 0.35;
      const drift = Math.sin(elapsed / 1700) * 0.25;

      const tiltX = Math.sin(elapsed / 1400) * 18;
      const tiltY = Math.sin(elapsed / 1800) * 24;

      x.set(drift);
      y.set(float);
      idleTiltX.set(tiltX);
      idleTiltY.set(tiltY);

      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [isHovering, idleCooldown, x, y, idleTiltX, idleTiltY]);

  const rotateDepth = 17.5;
  const translateDepth = 20;

  const tiltRotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [-rotateDepth, rotateDepth],
  );
  const tiltRotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [rotateDepth, -rotateDepth],
  );

  const translateX = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${translateDepth}px`, `${translateDepth}px`],
  );
  const translateY = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${translateDepth}px`, `-${translateDepth}px`],
  );

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.9) 10%, rgba(255, 255, 255, 0.75) 20%, rgba(255, 255, 255, 0) 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isAnimating || !ref.current) return;

    setIsHovering(true);

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (isAnimating) return;
    setIsHovering(false);
    x.set(0);
    y.set(0);

    setIdleCooldown(true);
    setTimeout(() => setIdleCooldown(false), 1000);
  };

  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsFlipped((prev) => !prev);

    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    setTimeout(() => {
      setIsAnimating(false);
      if (isTouchDevice || !ref.current?.matches(":hover")) {
        setIsHovering(false);
        x.set(0);
        y.set(0);
      }
    }, 800);
  };

  const handleTouchEnd = () => {
    setIsHovering(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      style={{
        perspective: "1500px",
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "visible",
        cursor: "pointer",
      }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onTouchEnd={handleTouchEnd}
        style={{
          rotateX: tiltRotateX,
          rotateY: tiltRotateY,
          translateX,
          translateY,
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
          position: "relative",
          boxShadow:
            "rgba(0, 0, 0, 0.01) 0px 520px 146px 0px, rgba(0, 0, 0, 0.04) 0px 333px 133px 0px, rgba(0, 0, 0, 0.26) 0px 83px 83px 0px, rgba(0, 0, 0, 0.29) 0px 21px 46px 0px",
          WebkitTapHighlightColor: "transparent",
        }}
        initial={{ scale: 1, z: 0 }}
        whileHover={{
          scale: 1.05,
          z: 50,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.98 }}
        className="relative rounded-2xl select-none"
      >
        <motion.div
          style={{
            transformStyle: "preserve-3d",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
          animate={{
            rotateY: isFlipped ? 180 : 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.34, 1.56, 0.64, 1],
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          {/* Front side */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src={frontSrc}
              alt={alt}
              fill
              className="object-cover border-3 border-white rounded-2xl pointer-events-none"
            />
          </div>
          {/* Back side */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src={backSrc}
              alt={alt}
              fill
              className="object-cover border-3 border-white rounded-2xl pointer-events-none"
            />
          </div>
        </motion.div>
        {/* Glare effect */}
        {!isAnimating && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-50 h-full w-full rounded-2xl mix-blend-overlay"
            style={{
              background: glareBackground,
              opacity: 0.6,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>
    </div>
  );
};
