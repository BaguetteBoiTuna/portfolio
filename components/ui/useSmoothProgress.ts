import { useEffect, useRef, useState } from "react";

export function useSmoothProgress(
  serverProgressMs: number | undefined,
  durationMs: number | undefined,
  // eslint-disable-next-line
  deps: any[],
) {
  const [progress, setProgress] = useState(serverProgressMs ?? 0);
  const startRef = useRef<number | null>(null);
  const baseRef = useRef(serverProgressMs ?? 0);

  useEffect(() => {
    baseRef.current = serverProgressMs ?? 0;
    startRef.current = performance.now();
  }, deps);

  useEffect(() => {
    // Reset progress when no duration (stopped/paused)
    if (!durationMs) {
      setProgress(0);
      return;
    }

    let raf = 0;
    const tick = (t: number) => {
      if (!durationMs) return;
      const elapsed = startRef.current ? t - startRef.current : 0;
      const next = Math.min(baseRef.current + elapsed, durationMs);
      setProgress(next);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs]);

  return progress;
}
