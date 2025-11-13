"use client";

import { useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import FlipTile from "./flip-tile";

const TILE = 90;
const GAP = 14;
const DIGIT_GAP = 120;
const DIGIT_WIDTH = 3;
const DIGIT_HEIGHT = 4;

const FOUR: [number, number][] = [
  [0, 0],
  [2, 0],
  [0, 1],
  [2, 1],
  [0, 2],
  [1, 2],
  [2, 2],
  [2, 3],
];

const ZERO: [number, number][] = [
  [0, 0],
  [1, 0],
  [2, 0],
  [0, 1],
  [2, 1],
  [0, 2],
  [2, 2],
  [0, 3],
  [1, 3],
  [2, 3],
];

const DIGITS = [FOUR, ZERO, FOUR];

export default function Big404() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mx = useSpring(x, { stiffness: 60, damping: 16 });
  const my = useSpring(y, { stiffness: 60, damping: 16 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      x.set(e.clientX / window.innerWidth - 0.5);
      y.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y]);

  const rotateX = useTransform(my, [-0.5, 0.5], [20, -20]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-20, 20]);
  const translateX = useTransform(mx, [-0.5, 0.5], ["-25px", "25px"]);
  const translateY = useTransform(my, [-0.5, 0.5], ["25px", "-25px"]);

  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const viewport = window.innerWidth;
      const maxAllowed = viewport * 0.9;

      const fullWidth =
        DIGIT_WIDTH * TILE * 3 + GAP * (DIGIT_WIDTH - 1) * 3 + DIGIT_GAP * 2;

      const newScale = Math.min(1, maxAllowed / fullWidth);

      setScale(newScale);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const digitWidthPx = DIGIT_WIDTH * TILE + (DIGIT_WIDTH - 1) * GAP;
  const digitHeightPx = DIGIT_HEIGHT * TILE + (DIGIT_HEIGHT - 1) * GAP;

  return (
    <div
      className="w-full h-[550px] flex items-center justify-center"
      style={{ perspective: 1500 }}
    >
      <div
        className="flex items-center justify-center origin-center"
        style={{
          columnGap: DIGIT_GAP,
          transform: `scale(${scale})`,
        }}
      >
        {DIGITS.map((digit, dIndex) => (
          <div
            key={dIndex}
            className="relative"
            style={{ width: digitWidthPx, height: digitHeightPx }}
          >
            {digit.map(([cx, cy], i) => (
              <FlipTile
                key={`${dIndex}-${i}`}
                size={TILE}
                rotateX={rotateX}
                rotateY={rotateY}
                translateX={translateX}
                translateY={translateY}
                initialColor="white"
                styleOverride={{
                  left: cx * (TILE + GAP),
                  top: cy * (TILE + GAP),
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
