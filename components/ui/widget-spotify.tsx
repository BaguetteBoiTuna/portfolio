"use client";

import Image from "next/image";
import ColorTextFromImage from "./color-text-from-image";
import MotionDiv from "./motion-div";
import { bounce } from "@/components/animations/animation-utils";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

type SpotifyTrack = {
  item?: {
    id: string;
    name: string;
    artists: { name: string; id: string }[];
    album: { images: { url: string }[] };
  };
};

export default function SpotifyWidget() {
  const { data: track } = useSWR("/api/spotify", fetcher, {
    refreshInterval: 1000,
    dedupingInterval: 1000,
    revalidateOnFocus: false,
    refreshWhenHidden: false,
  });

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
    <div className="fixed bottom-0 left-0 w-full z-50 sm:hidden">
      <div className="absolute inset-x-0 -top-5 h-5 pointer-events-none overflow-hidden">
        <div
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
        />
      </div>
      <div className="relative w-full h-12 bg-black flex items-center overflow-hidden">
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
    </div>
  );
}
