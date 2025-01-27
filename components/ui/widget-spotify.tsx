"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type SpotifyTrack = {
  item?: {
    name: string;
    artists: { name: string }[];
    album: { images: { url: string }[] };
  };
  error?: string;
};

export default function SpotifyWidget() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch("/api/spotify", { signal: controller.signal });
        const data: SpotifyTrack = await res.json();
        setTrack(data.error ? null : data);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error(err);
        }
      }
    };

    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Initial fetch
    fetchData();

    // Smart polling based on visibility
    const interval = setInterval(() => {
      if (isVisible) fetchData();
    }, 15000); // Reduced to 15 seconds

    return () => {
      controller.abort();
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isVisible]);

  if (!track?.item) return null;

  return (
    <div className="fixed bottom-4 left-4 p-4 text-white rounded-lg shadow-lg items-center space-x-2 sm:flex hidden">
      <div className="relative w-[100px] h-[100px] flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-md blur-lg animate-alive-background"
          style={{
            backgroundImage: `url(${track.item?.album.images[0].url})`,
            backgroundSize: "120% 120%",
            backgroundPosition: "center",
          }}
        ></div>
        <Image
          src={track.item?.album.images[0].url || "/placeholder.png"}
          alt={track.item?.name || "unknown track"}
          width={80}
          height={80}
          className="relative rounded-md animate-alive-foreground"
        />
      </div>
      <div className="z-10">
        <h3 className="text-md font-semibold">I&apos;m listening to</h3>
        <p className="text-sm">
          <span className="font-bold">{track.item?.name || "unknown"}</span> by{" "}
          {track.item?.artists.map((a) => a.name).join(", ") || "unknown"}
        </p>
      </div>
    </div>
  );
}
