import { NextResponse } from "next/server";

const clientId = process.env.SPOTIFY_ID!;
const clientSecret = process.env.SPOTIFY_SECRET!;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!;

// Global cache with atomic updates
// Im spending alot of time on this so let me use any :3
const cache = {
  //eslint-disable-next-line
  data: null as any,
  expires: 0,
  token: {
    access_token: "",
    expires_at: 0,
  },
  lastUpdated: 0,
};

// Rate limiter configuration
const RATE_LIMIT = {
  spotify: {
    interval: 1000, // 1 second between Spotify API calls
    lastCall: 0,
  },
};

async function refreshAccessToken() {
  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64",
  );
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authString}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  const data = await res.json();
  cache.token = {
    access_token: data.access_token,
    expires_at: Date.now() + data.expires_in * 1000,
  };
}

async function updateCache() {
  const now = Date.now();

  // Rate limit Spotify API calls
  if (now - RATE_LIMIT.spotify.lastCall < RATE_LIMIT.spotify.interval) {
    return;
  }

  try {
    if (!cache.token.access_token || now >= cache.token.expires_at) {
      await refreshAccessToken();
    }

    const res = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      { headers: { Authorization: `Bearer ${cache.token.access_token}` } },
    );

    if (res.status === 200) {
      const data = await res.json();
      cache.data = data;
      cache.expires = now + 1000; // 1 second cache
    }

    RATE_LIMIT.spotify.lastCall = now;
  } catch (error) {
    console.error("Cache update error:", error);
  }
}

// Background updater
setInterval(updateCache, 900); // Update slightly faster than cache expiration

export async function GET() {
  await updateCache();
  return NextResponse.json(cache.data ?? { error: "no track playing" });
}
