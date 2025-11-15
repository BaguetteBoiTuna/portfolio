import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("YOINK URL:", process.env.YOINK_DLP_WORKER_URL);
    console.log("BODY:", body);

    const upstream = await fetch(process.env.YOINK_DLP_WORKER_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // IMPORTANT: text is ALWAYS a string
    const raw = await upstream.text();

    // IMPORTANT: NEVER forward upstream headers (they may contain undefined values)
    return new NextResponse(raw, {
      status: upstream.status,
      headers: {
        // Only safe, static headers
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("YoinkDLP API error:", err);

    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Unknown error",
      },
      {
        status: 500,
      },
    );
  }
}
