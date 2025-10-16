import { useEffect, useRef, useState } from "react";

export function useSmoothProgress(
  serverProgressMs: number | undefined,
  durationMs: number | undefined,
  deps: any[]
) {
  const [progress, setProgress] = useState(serverProgressMs ?? 0);
  const startRef = useRef<number | null>(null);
  const baseRef = useRef(serverProgressMs ?? 0);

  useEffect(() => {
    // whenever serverProgress changes meaningfully (new track or seek), reset base
    baseRef.current = serverProgressMs ?? 0;
    startRef.current = performance.now();
  }, deps); // pass [trackId, serverProgressMs, durationMs]

  useEffect(() => {
    if (!durationMs) return;
    
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

  return progress; // ms
}
