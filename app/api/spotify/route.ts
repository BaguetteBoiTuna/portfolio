import { NextResponse } from "next/server";

const clientId = process.env.SPOTIFY_ID!;
const clientSecret = process.env.SPOTIFY_SECRET!;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!;
let accessToken: string | null = null;

async function refreshAccessToken() {
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

  if (!res.ok) {
    throw new Error("failed to refresh access token");
  }

  const data = await res.json();
  accessToken = data.access_token;
  return data;
}

async function getNowPlaying() {
  if (!accessToken) {
    await refreshAccessToken();
  }

  const res = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (res.status === 204) {
    return null;
  }

  if (!res.ok) {
    if (res.status === 401) {
      await refreshAccessToken();
      return getNowPlaying();
    }
    throw new Error("failed to fetch currently playing track");
  }

  return res.json();
}

export async function GET() {
  try {
    const track = await getNowPlaying();
    if (!track) {
      return NextResponse.json({ error: "no track currently playing" });
    }
    return NextResponse.json(track);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
