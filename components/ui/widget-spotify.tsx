"use client";

import Image from "next/image";
import useSWR from "swr";
import { AnimatePresence, motion } from "framer-motion";
import ColorTextFromImage from "./color-text-from-image";
import MotionDiv from "./motion-div";
import { bounce } from "@/components/animations/animation-utils";
import { useState, useEffect } from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());
// eslint-disable-next-line
const MotionImage = motion(Image as any);

type SpotifyTrack = {
  progress_ms?: number;
  item?: {
    id: string;
    name: string;
    artists: { name: string; id: string }[];
    album: { images: { url: string }[] };
    duration_ms: number;
  };
};

export default function SpotifyWidget() {
  const { data } = useSWR<SpotifyTrack>("/api/spotify", fetcher, {
    refreshInterval: (d) => {
      if (!d?.item) return 15_000;
      const left = d.item.duration_ms - (d.progress_ms ?? 0);
      return Math.min(left + 500, 5_000);
    },
    keepPreviousData: true,
    revalidateOnFocus: false,
    refreshWhenHidden: false,
  });

  type Track = NonNullable<SpotifyTrack["item"]>;
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    if (!data?.item) return;
    if (track?.id === data.item.id) return;

    const newItem = data.item as Track;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = newItem.album.images[0].url;
    img.onload = () => setTrack(newItem);
  }, [data, track]);

  if (!track) return null;
  return (
    <>
      <DesktopWidget {...track} />
      <MobileTicker {...track} />
    </>
  );
}

function DesktopWidget({
  id,
  name,
  artists,
  album,
}: NonNullable<SpotifyTrack["item"]>) {
  const cover = album.images[0].url;

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
          href={`https://open.spotify.com/track/${id}`}
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
                href={`https://open.spotify.com/track/${id}`}
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
      </div>
    </MotionDiv>
  );
}

function MobileTicker({
  id,
  name,
  artists,
  album,
}: NonNullable<SpotifyTrack["item"]>) {
  const img = album.images[0].url;
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
                href={`https://open.spotify.com/track/${id}`}
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
