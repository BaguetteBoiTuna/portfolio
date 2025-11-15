import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const videoUrl = req.nextUrl.searchParams.get("url");

  if (!videoUrl) {
    return new NextResponse("Missing url", { status: 400 });
  }

  // Validate host
  try {
    const u = new URL(videoUrl);
    if (!u.hostname.endsWith("googlevideo.com")) {
      return new NextResponse("Invalid host", { status: 400 });
    }
  } catch {
    return new NextResponse("Invalid url", { status: 400 });
  }

  const range = req.headers.get("range") || "bytes=0-";

  console.log("----- YOINKDLP DOWNLOAD DEBUG -----");
  console.log("FETCHING URL:", videoUrl);
  console.log("Range:", range);

  try {
    const upstream = await fetch(videoUrl, {
      method: "GET",
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.youtube.com/",
        Range: range,
      },
    });

    console.log("Upstream status:", upstream.status);
    console.log("Upstream content-type:", upstream.headers.get("content-type"));

    if (!upstream.ok) {
      const txt = await upstream.text().catch(() => "");
      console.log("Upstream FAILED response snippet:", txt.slice(0, 300));
      return new NextResponse("Upstream failed", { status: 502 });
    }

    const headers = new Headers();

    const pass = [
      "content-type",
      "content-length",
      "accept-ranges",
      "content-range",
    ];

    for (const h of pass) {
      const v = upstream.headers.get(h);
      if (v) headers.set(h, v);
    }

    if (!headers.get("content-type")) {
      headers.set("content-type", "video/mp4");
    }

    headers.set(
      "content-disposition",
      `attachment; filename="yoinkdlp-video.mp4"`,
    );

    return new NextResponse(upstream.body, {
      status: upstream.status,
      headers,
    });
  } catch (err: any) {
    console.log("FETCH ERROR:", err?.message || err);
    return new NextResponse("Proxy error", { status: 500 });
  }
}
