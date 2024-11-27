import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: "white",
          background: "black",
          width: "1200px",
          height: "630px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Welcome to TunaSub
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
