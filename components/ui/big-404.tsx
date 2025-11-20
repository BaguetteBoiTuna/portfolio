"use client";

import {
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "motion/react";
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

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const ScatteredTile = ({
  mx,
  my,
  cx,
  cy,
  size,
  seed,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  cx: number;
  cy: number;
  size: number;
  seed: number;
}) => {
  const randomVal = pseudoRandom(seed);
  const depth = randomVal * 1.5 + 0.5;

  const rotateX = useTransform(my, [-0.5, 0.5], [30 * depth, -30 * depth]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-30 * depth, 30 * depth]);
  const translateX = useTransform(
    mx,
    [-0.5, 0.5],
    [`${-50 * depth}px`, `${50 * depth}px`],
  );
  const translateY = useTransform(
    my,
    [-0.5, 0.5],
    [`${50 * depth}px`, `${-50 * depth}px`],
  );

  return (
    <FlipTile
      size={size}
      rotateX={rotateX}
      rotateY={rotateY}
      translateX={translateX}
      translateY={translateY}
      initialColor="#fff"
      styleOverride={{
        left: cx * (TILE + GAP),
        top: cy * (TILE + GAP),
        zIndex: Math.floor(depth * 100),
      }}
    />
  );
};

export default function Big404() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mx = useSpring(x, { stiffness: 50, damping: 20 });
  const my = useSpring(y, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      x.set(e.clientX / window.innerWidth - 0.5);
      y.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y]);

  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const viewport = window.innerWidth;
      const maxAllowed = viewport * 0.8;
      const fullWidth =
        DIGIT_WIDTH * TILE * 3 + GAP * (DIGIT_WIDTH - 1) * 3 + DIGIT_GAP * 2;
      setScale(Math.min(1, maxAllowed / fullWidth));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const digitWidthPx = DIGIT_WIDTH * TILE + (DIGIT_WIDTH - 1) * GAP;
  const digitHeightPx = DIGIT_HEIGHT * TILE + (DIGIT_HEIGHT - 1) * GAP;

  return (
    <div
      className="w-full h-[600px] flex items-center justify-center overflow-visible p-10"
      style={{ perspective: 1000 }}
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
            {digit.map(([cx, cy], i) => {
              const seed = dIndex * 100 + i;

              return (
                <ScatteredTile
                  key={`${dIndex}-${i}`}
                  mx={mx}
                  my={my}
                  cx={cx}
                  cy={cy}
                  size={TILE}
                  seed={seed}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
