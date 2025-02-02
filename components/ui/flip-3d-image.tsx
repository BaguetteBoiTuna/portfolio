"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";

type Props = {
  frontSrc: string;
  backSrc: string;
  alt: string;
};

export const FlipHover3DImage = ({ frontSrc, backSrc, alt }: Props) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isAnimating) return;
    if (!innerRef.current) return;
    const { left, top, width, height } =
      innerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    innerRef.current.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
  };

  const handleMouseEnter = () => {
    if (isAnimating) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (isAnimating) return;
    setIsHovered(false);
    if (innerRef.current)
      innerRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsFlipped((prev) => !prev);
    // Disable hover effect during flip (0.6s)
    setTimeout(() => setIsAnimating(false), 600);
  };

  // **Invert hover translateZ when flipped**
  const hoverTranslate =
    isAnimating || !isHovered
      ? "translateZ(0px)"
      : isFlipped
        ? "translateZ(-100px)"
        : "translateZ(100px)";

  return (
    <div
      style={{
        perspective: "1000px",
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "visible",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      {/* Flip container rotates around its center */}
      <div
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transformOrigin: "center",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {/* Outer container for hover effect */}
        <div
          ref={outerRef}
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.2s ease",
            transform: hoverTranslate,
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          {/* Inner container for tilt effect */}
          <div
            ref={innerRef}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transformStyle: "preserve-3d",
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            {/* Front side */}
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backfaceVisibility: "hidden",
              }}
            >
              <Image
                src={frontSrc}
                alt={alt}
                fill
                className="object-cover border-3 border-white"
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
              }}
            >
              <Image
                src={backSrc}
                alt={alt}
                fill
                className="object-cover border-3 border-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
