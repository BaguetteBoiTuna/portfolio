import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 1;

let token: { val?: string; exp?: number } = {};

// Cache for ETag and last response to avoid unnecessary re-fetches
declare global {
  // eslint-disable-next-line
  var __spEtag: string | undefined;
  // eslint-disable-next-line
  var __spLast: any;
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
      "If-None-Match": globalThis.__spEtag ?? "",
    },
    next: { revalidate: 1 },
  });
}

export async function GET() {
  try {
    if (!token.val || Date.now() >= token.exp!) await refresh();

    if (!token.val) {
      return NextResponse.json(
        { error: "Failed to get access token" },
        {
          status: 500,
          headers: { "Cache-Control": "s-maxage=1, stale-while-revalidate=29" },
        },
      );
    }

    let res = await fetchSpotify();

    // Handle 401/403 - refresh token and retry once
    if (res.status === 401 || res.status === 403) {
      await refresh();
      globalThis.__spEtag = ""; // Clear ETag to avoid stale 304s
      res = await fetchSpotify();
    }

    // Handle 304 Not Modified - return cached response
    if (res.status === 304) {
      return NextResponse.json(globalThis.__spLast ?? { error: "no change" }, {
        headers: {
          "Cache-Control": "s-maxage=1, stale-while-revalidate=29",
          ETag: globalThis.__spEtag ?? "",
        },
      });
    }

    // Handle rate limiting with backoff
    if (res.status === 429) {
      const retry = res.headers.get("Retry-After") ?? "5";
      return NextResponse.json(
        { error: "rate_limited", retry },
        { status: 429, headers: { "Retry-After": retry } },
      );
    }

    const etag = res.headers.get("ETag") ?? "";
    const empty =
      res.status === 204 || res.headers.get("content-length") === "0";
    const body = empty ? { error: "no track playing" } : await res.json();

    // Cache ETag and response for next request
    globalThis.__spEtag = etag;
    globalThis.__spLast = body;

    return NextResponse.json(body, {
      headers: {
        ETag: etag,
        "Cache-Control": "s-maxage=1, stale-while-revalidate=29",
      },
    });
  } catch (error) {
    console.error("Spotify API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Spotify data" },
      {
        status: 500,
        headers: { "Cache-Control": "s-maxage=1, stale-while-revalidate=29" },
      },
    );
  }
}
