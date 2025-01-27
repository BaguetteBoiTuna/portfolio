"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ColorTextFromImage from "./color-text-from-image";

type SpotifyTrack = {
  item?: {
    id: string;
    name: string;
    artists: { name: string; id: string }[];
    album: { images: { url: string }[] };
  };
  error?: string;
};

export default function SpotifyWidget() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const controller = new AbortController();
    let timeoutId: NodeJS.Timeout;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/spotify?cache=${Date.now()}`, {
          signal: controller.signal,
        });
        const data: SpotifyTrack = await res.json();

        setTrack((prev) => {
          // Only update if track actually changed
          if (JSON.stringify(prev?.item) !== JSON.stringify(data?.item)) {
            return data;
          }
          return prev;
        });

        // Reset retry counter on success
        setRetryCount(0);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error(err);
          // Exponential backoff
          timeoutId = setTimeout(
            () => {
              setRetryCount((c) => Math.min(c + 1, 5));
            },
            Math.min(1000 * 2 ** retryCount, 30000),
          );
        }
      }
    };

    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    fetchData();

    // Adaptive polling based on network conditions
    const interval = setInterval(
      fetchData,
      retryCount > 0
        ? 5000 // Slow mode on errors
        : isVisible
          ? 1000 // Normal mode
          : 30000, // Background mode
    );

    return () => {
      controller.abort();
      clearInterval(interval);
      clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isVisible, retryCount]);

  if (!track?.item) return null;

  return (
    <div className="fixed z-50 bottom-4 left-4 p-4 text-white rounded-lg shadow-lg items-center space-x-2 sm:flex hidden">
      <div className="relative w-[100px] h-[100px] flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-md blur-lg animate-alive-background"
          style={{
            backgroundImage: `url(${track.item?.album.images[0].url})`,
            backgroundSize: "120% 120%",
            backgroundPosition: "center",
          }}
        ></div>
        <a
          href={`https://open.spotify.com/track/${track.item?.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative transform transition duration-300 hover:scale-110 hover:brightness-75"
        >
          <Image
            src={track.item?.album.images[0].url || "/placeholder.png"}
            alt={track.item?.name || "unknown track"}
            width={80}
            height={80}
            className="rounded-md"
            priority
          />
        </a>
      </div>
      <div className="relative z-50">
        <h3 className="text-lg font-bold">I&apos;m listening to:</h3>
        <p className="text-sm">
          <span className="font-bold">
            <a
              href={`https://open.spotify.com/track/${track.item?.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              <ColorTextFromImage
                text={track.item?.name || "unknown"}
                imageUrl={track.item?.album.images[0].url || "/placeholder.png"}
              />
            </a>
          </span>{" "}
          by{" "}
          {track.item?.artists.map((artist, index) => (
            <a
              key={artist.name}
              href={`https://open.spotify.com/artist/${artist.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {artist.name}
              {index < (track.item?.artists?.length ?? 0) - 1 ? ", " : ""}
            </a>
          ))}
        </p>
      </div>
    </div>
  );
}
