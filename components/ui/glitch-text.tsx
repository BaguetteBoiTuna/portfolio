"use client";

import { useEffect, useState } from "react";

const GLYPHS = "0123456789±!@#$%^&*()_+ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// INFO: Uncomment for japanese characters
// "ラドクリフマラソンわたしワタシんょンョたばこタバコとうきょうトウキョウ0123456789±!@#$%^&*()_+ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function GlitchText({
  text,
  color = "white",
}: {
  text: string;
  color?: string;
}) {
  const [chars, setChars] = useState<
    { char: string; c1: string; c2: string; c3: string; i: number }[]
  >([]);

  useEffect(() => {
    const generated = text.split("").map((char, index) => ({
      char,
      c1: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      c2: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      c3: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      i: index,
    }));
    setChars(generated);
  }, [text]);

  return (
    <div className="relative inline-flex whitespace-pre">
      {chars.map(({ char, c1, c2, c3, i }) => (
        <span
          key={i}
          className="relative text-transparent"
          data-char={char}
          style={
            {
              "--index": i.toString(),
              "--char-1": `"${c1}"`,
              "--char-2": `"${c2}"`,
              "--char-3": `"${c3}"`,
              "--speed": "0.25",
            } as React.CSSProperties
          }
        >
          {char}
        </span>
      ))}

      <style jsx>{`
        span::after {
          content: attr(data-char);
          position: absolute;
          inset: 0;
          color: ${color};
        }

        :global(.group:hover) span::after {
          animation: flash calc(var(--speed, 0.25) * 1s)
            calc(var(--index, 0) * 0.05s) steps(1, end);
        }

        @keyframes flash {
          0%,
          20% {
            content: "_";
          }
          40% {
            content: var(--char-1);
          }
          60% {
            content: var(--char-2);
          }
          80% {
            content: var(--char-3);
          }
        }
      `}</style>
    </div>
  );
}
