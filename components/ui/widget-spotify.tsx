"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type SpotifyTrack = {
  item?: {
    name: string;
    artists: { name: string }[];
    album: { images: { url: string }[] };
  };
};

export default function SpotifyWidget() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/spotify");
        if (!res.ok) {
          throw new Error("failed to fetch spotify data");
        }
        const data: SpotifyTrack = await res.json();
        if (!data?.item) {
          setTrack(null);
          return;
        }
        setTrack(data);
      } catch (err) {
        console.error(err);
        setTrack(null);
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!track) return null;

  return (
    <div className="fixed bottom-4 left-4 p-4 text-white rounded-lg shadow-lg items-center space-x-2 sm:flex hidden">
      <div className="relative w-[100px] h-[100px] flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-md blur-lg bg-cover bg-center animate-pulse-blur"
          style={{ backgroundImage: `url(${track.item?.album.images[0].url})` }}
        ></div>
        <Image
          src={track.item?.album.images[0].url || "/placeholder.png"}
          alt={track.item?.name || "unknown track"}
          width={80}
          height={80}
          className="relative rounded-md"
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
