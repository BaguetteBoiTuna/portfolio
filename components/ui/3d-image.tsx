"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";

export const Hover3DImage = ({ src, alt }: { src: string; alt: string }) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!innerRef.current) return;
    const { left, top, width, height } =
      innerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    innerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!innerRef.current) return;
    setIsHovered(false);
    innerRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div
      style={{
        perspective: "1000px",
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "visible",
      }}
    >
      <div
        ref={outerRef}
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.2s ease",
          transform: isHovered ? "translateZ(100px)" : "translateZ(0px)",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
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
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover border-3 border-white"
          />
        </div>
      </div>
    </div>
  );
};
