"use client";

import Image from "next/image";
import useSWR from "swr";
import { AnimatePresence, motion } from "framer-motion";
import ColorTextFromImage from "./color-text-from-image";
import MotionDiv from "./motion-div";
import { bounce } from "@/components/animations/animation-utils";
import { useState, useEffect, memo } from "react";
import { useSmoothProgress } from "./useSmoothProgress";

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
    keepPreviousData: true,
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
    if ("error" in data) return;

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
    img.onerror = () => setTrack(nextTrack);
  }, [data, track]);

  const progressMs =
    data && "isPlaying" in data && data.isPlaying ? data.progressMs : undefined;
  const durationMs =
    data && "isPlaying" in data && data.isPlaying ? data.durationMs : undefined;

  return (
    <>
      <AnimatePresence>
        {track && (
          <>
            <DesktopAuroraWidget
              key="desktop"
              track={track}
              progress={progressMs}
              duration={durationMs}
            />
            <MobileAuroraWidget
              key="mobile"
              track={track}
              progress={progressMs}
              duration={durationMs}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}

const DesktopAuroraWidget = memo(function DesktopAuroraWidget({
  track,
  progress: serverProgress,
  duration,
}: {
  track: Extract<SpotifyPayload, { isPlaying: true }>["track"];
  progress?: number;
  duration?: number;
}) {
  const { name, artists, album, externalUrl } = track;
  const cover = album.images?.[0]?.url;
  if (!cover) return null;

  //eslint-disable-next-line
  const progress = useSmoothProgress(serverProgress, duration, true, track.id);
  const progressPct = duration ? Math.min(100, (progress / duration) * 100) : 0;

  const containerAnim = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50, transition: { duration: 0.5 } },
    transition: bounce,
  };

  return (
    <>
      <MotionDiv
        className="fixed bottom-0 left-0 z-0 hidden sm:block pointer-events-none"
        {...containerAnim}
      >
        <div className="absolute bottom-[-150px] left-[-150px] w-[700px] h-[700px] opacity-50 mix-blend-screen">
          <div
            className="w-full h-full relative"
            style={{
              maskImage: "radial-gradient(circle, black 20%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(circle, black 20%, transparent 70%)",
            }}
          >
            <AnimatePresence mode="popLayout">
              <MotionDiv
                key={`${cover}-aurora`}
                className="absolute inset-0 bg-cover bg-center blur-[100px] saturate-150"
                style={{ backgroundImage: `url(${cover})` }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 1.2,
                  transition: { duration: 2 },
                }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <MotionDiv
                key={`${cover}-aurora-move`}
                className="absolute inset-0 bg-cover bg-center blur-[80px] mix-blend-overlay"
                style={{ backgroundImage: `url(${cover})` }}
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                  rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                  scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            </AnimatePresence>
          </div>
        </div>
      </MotionDiv>

      <MotionDiv
        className="fixed bottom-0 left-0 z-50 hidden sm:block pointer-events-none"
        {...containerAnim}
      >
        <div className="relative left-8 bottom-8 flex flex-col items-start gap-2 pointer-events-auto">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-white/50 tracking-widest uppercase">
              I&apos;m listening to
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-20 h-20 group flex-shrink-0 block"
            >
              <AnimatePresence mode="wait">
                <MotionImage
                  key={cover}
                  src={cover}
                  alt={name}
                  width={80}
                  height={80}
                  className="rounded-lg shadow-2xl group-hover:scale-110 transition-transform duration-300 ease-out border border-white/10 object-cover absolute inset-0"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.1, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>
            </a>

            <div className="flex flex-col items-start justify-center h-full overflow-hidden">
              <div className="grid grid-cols-1 grid-rows-1 w-[250px]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-start col-start-1 row-start-1"
                  >
                    <a
                      href={externalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-lg tracking-tight drop-shadow-md leading-tight hover:underline text-white decoration-white/50 truncate w-full"
                    >
                      <ColorTextFromImage text={name} imageUrl={cover} />
                    </a>

                    <div className="text-white/70 text-xs font-medium mb-2 drop-shadow-md truncate w-full">
                      by{" "}
                      {artists.map((a, i) => (
                        <span
                          key={a.id}
                          className="hover:text-white transition-colors"
                        >
                          <a
                            href={`https://open.spotify.com/artist/${a.id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline"
                          >
                            {a.name}
                          </a>
                          {i < artists.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {duration && (
                <div className="w-48 flex flex-col gap-1 z-20">
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-md group">
                    <motion.div
                      className="h-full bg-white shadow-[0_0_10px_white] group-hover:bg-green-400 transition-colors"
                      style={{ width: `${progressPct}%` }}
                      transition={{
                        type: "tween",
                        ease: "linear",
                        duration: 0.1,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] text-white/40 font-mono w-full">
                    <span>{fmtTime(progress || 0)}</span>
                    <span>{fmtTime(duration)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </MotionDiv>
    </>
  );
});

const MobileAuroraWidget = memo(function MobileAuroraWidget({
  track,
  progress: serverProgress,
  duration,
}: {
  track: Extract<SpotifyPayload, { isPlaying: true }>["track"];
  progress?: number;
  duration?: number;
}) {
  const { name, artists, album, externalUrl } = track;
  const cover = album.images?.[0]?.url;

  if (!cover) return null;

  //eslint-disable-next-line
  const progress = useSmoothProgress(serverProgress, duration, true, track.id);
  const progressPct = duration ? Math.min(100, (progress / duration) * 100) : 0;

  return (
    <MotionDiv
      className="fixed bottom-0 left-0 w-full z-50 sm:hidden pointer-events-none"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      <div className="absolute bottom-0 left-0 w-full h-[50vh] overflow-hidden z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
        <AnimatePresence mode="popLayout">
          <MotionDiv
            key={`${cover}-mobile-aurora`}
            className="absolute bottom-[-20%] left-[-20%] w-[140%] h-[80%] bg-cover bg-center blur-[60px] opacity-60 saturate-200 mix-blend-screen"
            style={{ backgroundImage: `url(${cover})` }}
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 0.6, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
        </AnimatePresence>
      </div>

      <div className="relative z-20 w-full px-4 pb-6 pt-4 flex flex-col justify-end items-center pointer-events-auto">
        <div className="flex items-center gap-2 mb-3 opacity-70">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-white tracking-widest uppercase">
            Listening
          </span>
        </div>

        <div className="w-full flex items-center gap-3 bg-black/20 backdrop-blur-sm p-2 rounded-xl border border-white/5 shadow-lg">
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-neutral-900"
          >
            <AnimatePresence mode="popLayout">
              <MotionImage
                key={cover}
                src={cover}
                alt={name}
                fill
                className="object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
          </a>

          <div className="flex-1 grid grid-cols-1 grid-rows-1 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={name}
                className="col-start-1 row-start-1 flex flex-col justify-center min-w-0"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-bold text-white truncate hover:underline block w-full"
                >
                  <ColorTextFromImage text={name} imageUrl={cover} />
                </a>
                <p className="text-xs text-white/60 truncate block w-full">
                  {artists.map((a) => a.name).join(", ")}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {duration && (
            <div className="text-[10px] font-mono text-white/50 tabular-nums pl-2">
              {fmtTime(progress || 0)}
            </div>
          )}
        </div>

        {duration && (
          <div className="w-[95%] h-0.5 bg-white/10 mt-2 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white/80"
              style={{ width: `${progressPct}%` }}
              transition={{ type: "tween", ease: "linear", duration: 0.1 }}
            />
          </div>
        )}
      </div>
    </MotionDiv>
  );
});

function fmtTime(ms: number) {
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
