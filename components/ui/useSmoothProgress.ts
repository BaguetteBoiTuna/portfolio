import { useEffect, useState, useRef } from "react";

export function useSmoothProgress(
  serverProgressMs: number | undefined,
  durationMs: number | undefined,
  isPlaying: boolean,
  trackId: string,
) {
  const [progress, setProgress] = useState(serverProgressMs ?? 0);
  const lastFrameTime = useRef<number>(0);

  // 1. Handle Track Changes immediately
  // We use a ref to track the ID so we can reset instantly without waiting for effects
  const currentTrackId = useRef(trackId);
  if (currentTrackId.current !== trackId) {
    currentTrackId.current = trackId;
    setProgress(serverProgressMs ?? 0);
  }

  // 2. The Physics Loop
  useEffect(() => {
    if (!isPlaying || !durationMs) return;

    let animationFrameId: number;

    const animate = (time: number) => {
      if (lastFrameTime.current !== 0) {
        const delta = time - lastFrameTime.current;

        setProgress((prev) => {
          // Prevent the bar from overflowing the duration
          const next = prev + delta;
          return next > durationMs ? durationMs : next;
        });
      }
      lastFrameTime.current = time;
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start the loop
    lastFrameTime.current = 0; // Reset delta tracker
    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, durationMs]);

  // 3. Smart Sync (Drift Correction)
  // This runs whenever SWR revalidates.
  useEffect(() => {
    if (serverProgressMs === undefined) return;

    setProgress((prev) => {
      // Calculate the difference between local state and server truth
      const diff = Math.abs(prev - serverProgressMs);

      // THRESHOLD: 2000ms
      // If the difference is huge (user seeked, or track changed), snap to server.
      // If the difference is small (network latency), IGNORE the server and
      // trust our smooth local animation to prevent "jitter".
      if (diff > 2000) {
        return serverProgressMs;
      }
      return prev;
    });
  }, [serverProgressMs]);

  return progress;
}
