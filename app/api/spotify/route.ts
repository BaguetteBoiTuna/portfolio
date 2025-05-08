import { NextResponse } from "next/server";

export const runtime = "edge";
export const revalidate = 1;

let token: { val?: string; exp?: number } = {};

async function refresh() {
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
  token = { val: r.access_token, exp: Date.now() + r.expires_in * 1000 };
}

export async function GET() {
  if (!token.val || Date.now() >= token.exp!) await refresh();

  const res = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: { Authorization: `Bearer ${token.val}` },
      next: { revalidate: 1 },
    },
  );

  const empty = res.status === 204 || res.headers.get("content-length") === "0";
  return NextResponse.json(
    empty ? { error: "no track playing" } : await res.json(),
    { headers: { "Cache-Control": "s-maxage=1, stale-while-revalidate=29" } },
  );
}
