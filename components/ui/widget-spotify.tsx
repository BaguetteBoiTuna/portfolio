"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ColorTextFromImage from "./color-text-from-image";
import MotionDiv from "./motion-div";
import { bounce } from "@/components/animations/animation-utils";

type SpotifyTrack = {
  item?: {
    id: string;
    name: string;
    artists: { name: string; id: string }[];
    album: { images: { url: string }[] };
  };
};

export default function SpotifyWidget() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const ctl = new AbortController();
    let tid: NodeJS.Timeout;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/spotify?cache=${Date.now()}`, {
          signal: ctl.signal,
        });
        const data: SpotifyTrack = await res.json();
        setTrack((prev) =>
          JSON.stringify(prev?.item) !== JSON.stringify(data?.item)
            ? data
            : prev,
        );
        setRetryCount(0);
      } catch {
        if (!ctl.signal.aborted) {
          tid = setTimeout(
            () => setRetryCount((c) => Math.min(c + 1, 5)),
            Math.min(1000 * 2 ** retryCount, 30000),
          );
        }
      }
    };

    document.addEventListener("visibilitychange", () =>
      setIsVisible(document.visibilityState === "visible"),
    );
    fetchData();
    const iv = setInterval(
      fetchData,
      retryCount > 0 ? 5000 : isVisible ? 1000 : 30000,
    );

    return () => {
      ctl.abort();
      clearInterval(iv);
      clearTimeout(tid);
      document.removeEventListener("visibilitychange", () => {});
    };
  }, [isVisible, retryCount]);

  if (!track?.item) return null;

  return (
    <>
      <DesktopWidget {...track.item} />
      <MobileTicker {...track.item} />
    </>
  );
}

function DesktopWidget({
  id,
  name,
  artists,
  album,
}: NonNullable<SpotifyTrack["item"]>) {
  return (
    <MotionDiv
      className="fixed z-50 bottom-4 left-4 p-4 text-white rounded-lg shadow-lg items-center space-x-2 hidden sm:flex"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={bounce}
    >
      <div className="relative w-[100px] h-[100px] flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-md blur-lg animate-alive-background"
          style={{
            backgroundImage: `url(${album.images[0].url})`,
            backgroundSize: "120% 120%",
            backgroundPosition: "center",
          }}
        />
        <a
          href={`https://open.spotify.com/track/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative transform transition duration-300 hover:scale-110 hover:brightness-75"
        >
          <Image
            src={album.images[0].url}
            alt={name}
            width={80}
            height={80}
            className="rounded-md"
            priority
          />
        </a>
      </div>

      <div className="relative z-50">
        <h3 className="text-lg font-bold">I’m listening to:</h3>
        <p className="text-sm">
          <span className="font-bold">
            <a
              href={`https://open.spotify.com/track/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              <ColorTextFromImage text={name} imageUrl={album.images[0].url} />
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
        </p>
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
  const txt = `${name} – ${artists.map((a) => a.name).join(", ")}`;
  const img = album.images[0].url;

  return (
    <div className="fixed bottom-0 left-0 w-full h-12 bg-black overflow-hidden flex items-center z-50 sm:hidden">
      <div className="flex w-[200vw] animate-marquee">
        {[0, 1].map((i) => (
          <div key={i} className="w-screen flex items-center px-4">
            <Image
              src={img}
              alt=""
              width={32}
              height={32}
              className="rounded-md"
            />
            <a
              href={`https://open.spotify.com/track/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-sm hover:underline ml-2"
            >
              <ColorTextFromImage text={txt} imageUrl={img} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
