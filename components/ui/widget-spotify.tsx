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

// Memoize DesktopWidget to prevent unnecessary re-renders
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
  const progress = useSmoothProgress(serverProgress, duration, [
    id,
    serverProgress,
    duration,
  ]);
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
          <div className="mt-2 h-1 w-44 bg-white/20 rounded overflow-hidden">
            <div
              className="h-1 bg-white/90 rounded will-change-transform"
              style={{
                transform: `translateZ(0) scaleX(${progressPct / 100})`,
                transformOrigin: "left",
              }}
            />
          </div>
        )}
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
  if (!img) return null;
  const txt = `${name} – ${artists.map((a) => a.name).join(", ")}`;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 sm:hidden">
      <div className="absolute inset-x-0 -top-5 h-5 pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={img}
            className="w-full h-full blur-3xl opacity-80 animate-breathe"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "150% 150%",
              backgroundPosition: "center",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 35%, black 65%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 35%, black 65%, transparent 100%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      <div className="relative w-full h-12 bg-black flex items-center overflow-hidden">
        <div className="flex w-[200vw] animate-marquee">
          {[0, 1].map((i) => (
            <div key={i} className="w-screen flex items-center px-4">
              <AnimatePresence mode="wait" initial={false}>
                <MotionImage
                  key={`${img}-${i}`}
                  src={img}
                  alt=""
                  width={32}
                  height={32}
                  className="rounded-md"
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
                className="font-bold text-sm hover:underline ml-2"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  >
                    <ColorTextFromImage text={txt} imageUrl={img} />
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
