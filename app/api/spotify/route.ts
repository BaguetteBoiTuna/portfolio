import { NextResponse } from "next/server";

const clientId = process.env.SPOTIFY_ID!;
const clientSecret = process.env.SPOTIFY_SECRET!;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!;

const cache = {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  track: null as any,
  expires: 0,
  token: {
    access_token: "",
    expires_at: 0,
    refreshing: false,
  },
};

// Shared mutex for token refresh
const tokenMutex = {
  locked: false,
  queue: [] as (() => void)[],
};

async function acquire() {
  return new Promise<void>((resolve) => {
    if (!tokenMutex.locked) {
      tokenMutex.locked = true;
      return resolve();
    }
    tokenMutex.queue.push(resolve);
  });
}

function release() {
  if (tokenMutex.queue.length > 0) {
    const next = tokenMutex.queue.shift();
    next?.();
  } else {
    tokenMutex.locked = false;
  }
}

async function refreshAccessToken() {
  await acquire();
  try {
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
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
      refreshing: false,
    };
  } finally {
    release();
  }
}

async function getNowPlaying() {
  // Serve cached track if still valid
  if (Date.now() < cache.expires) {
    return cache.track;
  }

  if (!cache.token.access_token || Date.now() >= cache.token.expires_at) {
    await refreshAccessToken();
  }

  const res = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    { headers: { Authorization: `Bearer ${cache.token.access_token}` } },
  );

  if (res.status === 204) return null;
  if (res.status === 401) {
    await refreshAccessToken();
    return getNowPlaying();
  }

  const data = await res.json();
  cache.track = data;
  cache.expires = Date.now() + 5000; // Cache for 5 seconds
  return data;
}

export async function GET() {
  try {
    const track = await getNowPlaying();
    return NextResponse.json(track || { error: "No track playing" });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
