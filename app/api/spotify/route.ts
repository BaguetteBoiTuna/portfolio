import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CACHE_WINDOW_MS = 4_000;

let token: { val?: string; exp?: number } = {};

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

type CachedResponse = {
  body: SpotifyPayload;
  timestamp: number;
  etag?: string;
};

declare global {
  // eslint-disable-next-line no-var
  var __spotifyCache: CachedResponse | undefined;
}

async function refresh() {
  try {
    const basic = Buffer.from(
      `${process.env.SPOTIFY_ID!}:${process.env.SPOTIFY_SECRET!}`,
    ).toString("base64");
    const r = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: process.env.SPOTIFY_REFRESH_TOKEN!,
      }),
    }).then((r) => r.json());

    if (r.access_token) {
      token = { val: r.access_token, exp: Date.now() + r.expires_in * 1000 };
    }
  } catch (error) {
    console.error("Failed to refresh Spotify token:", error);
  }
}

async function fetchSpotify() {
  return fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: {
      Authorization: `Bearer ${token.val}`,
    },
    cache: "no-store",
  });
}

export async function GET() {
  try {
    const now = Date.now();

    if (
      globalThis.__spotifyCache &&
      now - globalThis.__spotifyCache.timestamp < CACHE_WINDOW_MS
    ) {
      return NextResponse.json(globalThis.__spotifyCache.body, {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      });
    }

    if (!token.val || Date.now() >= token.exp!) await refresh();

    if (!token.val) {
      return NextResponse.json(
        { error: "failed_to_get_access_token" },
        {
          status: 500,
          headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
        },
      );
    }

    let res = await fetchSpotify();

    if (res.status === 401 || res.status === 403) {
      await refresh();
      res = await fetchSpotify();
    }

    if (res.status === 429) {
      const retry = res.headers.get("Retry-After") ?? "5";
      return NextResponse.json(
        { error: "rate_limited", retry },
        {
          status: 429,
          headers: {
            "Retry-After": retry,
            "Cache-Control": "no-store, no-cache, must-revalidate",
          },
        },
      );
    }

    if (res.status === 204 || res.status === 202) {
      const payload: SpotifyPayload = { isPlaying: false };
      globalThis.__spotifyCache = {
        body: payload,
        timestamp: now,
      };

      return NextResponse.json(payload, {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      });
    }

    if (!res.ok) {
      const body = await res.text();
      console.error("Spotify API unexpected response:", res.status, body);
      return NextResponse.json(
        { error: "spotify_api_error" },
        {
          status: res.status,
          headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
        },
      );
    }

    const json = await res.json();

    if (!json?.item || json.is_playing === false) {
      const payload: SpotifyPayload = { isPlaying: false };
      globalThis.__spotifyCache = {
        body: payload,
        timestamp: now,
      };

      return NextResponse.json(payload, {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      });
    }

    const payload: SpotifyPayload = {
      isPlaying: true,
      progressMs: json.progress_ms ?? 0,
      durationMs: json.item.duration_ms ?? 0,
      track: {
        id: json.item.id,
        name: json.item.name,
        // eslint-disable-next-line
        artists: json.item.artists?.map((artist: any) => ({
          name: artist.name,
          id: artist.id,
        })) ?? [{ name: "Unknown", id: "unknown" }],
        album: {
          images: json.item.album?.images ?? [],
        },
        externalUrl: json.item.external_urls?.spotify
          ? json.item.external_urls.spotify
          : `https://open.spotify.com/track/${json.item.id}`,
      },
    };

    globalThis.__spotifyCache = {
      body: payload,
      timestamp: now,
    };

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Spotify API error:", error);
    return NextResponse.json(
      { error: "failed_to_fetch_spotify_data" },
      {
        status: 500,
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
      },
    );
  }
}
