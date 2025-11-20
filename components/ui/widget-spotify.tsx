"use client";

import Image from "next/image";
import useSWR from "swr";
import { AnimatePresence, motion } from "framer-motion";
import ColorTextFromImage from "./color-text-from-image";
import MotionDiv from "./motion-div";
import { bounce } from "@/components/animations/animation-utils";
import { useState, useEffect, memo } from "react";
import { useSmoothProgress } from "./useSmoothProgress";
import { useExtractColors } from "react-extract-colors";

const fetcher = (url: string) => fetch(url).then((r) => r.json());
// eslint-disable-next-line
const MotionImage = motion(Image as any);

type SpotifyPayload =
  | {
      isPlaying: true;
      progressMs: number;
      durationMs: number;
      track: {
        id: string;
        name: string;
        artists: { name: string; id: string }[];
        album: { images: { url: string }[] };
        externalUrl: string;
      };
    }
  | {
      isPlaying: false;
    }
  | {
      error: string;
      retry?: string;
    };

export default function SpotifyWidget() {
  const { data } = useSWR<SpotifyPayload>("/api/spotify", fetcher, {
    refreshInterval: (payload) => {
      if (!payload) return 5_000;
      if ("error" in payload) {
        if (payload.error === "rate_limited") {
          return (Number(payload.retry) || 5) * 1000 + 250;
        }
        return 10_000;
      }
      if (!payload.isPlaying) return 15_000;
      const left = payload.durationMs - payload.progressMs;
      return Math.min(Math.max(left, 2_500), 5_000);
    },
    dedupingInterval: 2_000,
    keepPreviousData: false,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    refreshWhenHidden: false,
    onError: (err) => {
      console.error("Spotify widget error:", err);
    },
  });

  type ActiveTrack = Extract<SpotifyPayload, { isPlaying: true }>["track"];
  const [track, setTrack] = useState<ActiveTrack | null>(null);

  useEffect(() => {
    if (!data) return;

    if ("error" in data) {
      console.error("Spotify endpoint returned error:", data.error);
      return;
    }

    if (!data.isPlaying) {
      setTrack(null);
      return;
    }

    const nextTrack = data.track;
    const cover = nextTrack.album?.images?.[0]?.url;
    if (!cover) {
      setTrack(null);
      return;
    }
    if (track?.id === nextTrack.id) return;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = cover;
    img.onload = () => setTrack(nextTrack);
    img.onerror = () => {
      console.error("Failed to load album image, setting track anyway");
      setTrack(nextTrack);
    };
  }, [data, track]);

  if (!track) return null;

  const progressMs =
    data && "isPlaying" in data && data.isPlaying ? data.progressMs : undefined;
  const durationMs =
    data && "isPlaying" in data && data.isPlaying ? data.durationMs : undefined;

  return (
    <>
      <DesktopWidget
        track={track}
        progress={progressMs}
        duration={durationMs}
      />
      <MobileTicker {...track} />
    </>
  );
}

const DesktopWidget = memo(function DesktopWidget({
  track,
  progress: serverProgress,
  duration,
}: {
  track: Extract<SpotifyPayload, { isPlaying: true }>["track"];
  progress?: number;
  duration?: number;
}) {
  const { id, name, artists, album, externalUrl } = track;
  const cover = album.images?.[0]?.url;

  if (!cover) return null;

  //eslint-disable-next-line
  const progress = useSmoothProgress(serverProgress, duration, true, id);
  const progressPct = duration ? Math.min(100, (progress / duration) * 100) : 0;

  return (
    <MotionDiv
      className="fixed z-50 bottom-4 left-4 p-4 text-white rounded-lg shadow-lg items-center space-x-2 hidden sm:flex"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={bounce}
    >
      <div className="relative w-[100px] h-[100px] flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <MotionDiv
            key={cover}
            className="absolute inset-0 rounded-md blur-lg animate-alive-background"
            style={{
              backgroundImage: `url(${cover})`,
              backgroundSize: "120% 120%",
              backgroundPosition: "center",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </AnimatePresence>
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative transform transition duration-300 hover:scale-110 hover:brightness-75"
        >
          <AnimatePresence mode="wait" initial={false}>
            <MotionImage
              key={cover}
              src={cover}
              alt={name}
              width={80}
              height={80}
              priority
              className="rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </a>
      </div>
      <div className="relative z-50">
        <h3 className="text-lg font-bold">I’m listening to:</h3>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={id}
            className="text-sm"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <span className="font-bold">
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                <ColorTextFromImage text={name} imageUrl={cover} />
              </a>
            </span>{" "}
            by{" "}
            {artists.map((a, i) => (
              <span key={a.id}>
                <a
                  href={`https://open.spotify.com/artist/${a.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {a.name}
                </a>
                {i < artists.length - 1 && ", "}
              </span>
            ))}
          </motion.p>
        </AnimatePresence>
        {duration && (
          <div className="mt-3 w-full max-w-[200px]">
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-visible relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-white rounded-full"
                style={{
                  width: `${progressPct}%`,
                  boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.3)",
                }}
                initial={false}
                transition={{ type: "tween", ease: "linear", duration: 0.1 }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              </motion.div>
            </div>
            <div className="flex justify-between text-[10px] text-white/70 mt-1 font-medium tabular-nums">
              <span>
                {Math.floor((progress || 0) / 60000)}:
                {String(Math.floor(((progress || 0) % 60000) / 1000)).padStart(
                  2,
                  "0",
                )}
              </span>
              <span>
                {Math.floor(duration / 60000)}:
                {String(Math.floor((duration % 60000) / 1000)).padStart(2, "0")}
              </span>
            </div>
          </div>
        )}{" "}
      </div>
    </MotionDiv>
  );
});

function MobileTicker({
  id,
  name,
  artists,
  album,
  externalUrl,
}: Extract<SpotifyPayload, { isPlaying: true }>["track"]) {
  const img = album.images?.[0]?.url;
  const { dominantColor } = useExtractColors(img || "");
  if (!img) return null;

  const txt = `${name} – ${artists.map((a) => a.name).join(", ")}`;
  const glowColor = dominantColor || "#7c3aed"; // Fallback violet

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 sm:hidden">
      <div className="absolute bottom-0 w-full h-[50vh] pointer-events-none z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={dominantColor}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full relative"
          >
            <motion.div
              className="absolute bottom-0 -left-[10%] w-[40%] h-full blur-[40px]"
              style={{
                background: `linear-gradient(to top, ${glowColor} 0%, transparent 100%)`,
              }}
              animate={{
                opacity: [0.4, 0.7, 0.4],
                height: ["60%", "80%", "60%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute bottom-0 -right-[10%] w-[40%] h-full blur-[40px]"
              style={{
                background: `linear-gradient(to top, ${glowColor} 0%, transparent 100%)`,
              }}
              animate={{
                opacity: [0.4, 0.7, 0.4],
                height: ["50%", "75%", "50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />

            <motion.div
              className="absolute bottom-0 left-[10%] w-[80%] h-full blur-[50px]"
              style={{
                background: `linear-gradient(to top, ${glowColor} 0%, transparent 100%)`,
              }}
              animate={{
                opacity: [0.3, 0.5, 0.3],
                height: ["20%", "30%", "20%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 w-full h-12 bg-black/90 backdrop-blur-md border-t border-white/10 flex items-center overflow-hidden shadow-sm">
        <div className="flex w-[200vw] animate-marquee">
          {[0, 1].map((i) => (
            <div key={i} className="w-screen flex items-center px-4 shrink-0">
              <AnimatePresence mode="wait" initial={false}>
                <MotionImage
                  key={`${img}-${i}`}
                  src={img}
                  alt=""
                  width={28}
                  height={28}
                  className="rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-xs text-white/90 hover:text-white truncate ml-3 block w-full"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    {txt}
                  </motion.span>
                </AnimatePresence>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
