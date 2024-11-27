import puppeteer from "puppeteer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  // launch puppeteer
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"], // required for serverless environments
  });

  try {
    const page = await browser.newPage();
    await page.goto("https://tunasub.xyz", {
      waitUntil: "networkidle0",
    });

    const screenshotBuffer = await page.screenshot({
      type: "jpeg",
      quality: 80,
      fullPage: true,
    });

    await browser.close();

    return new NextResponse(screenshotBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    await browser.close();
    console.error("Error generating screenshot:", err);
    return new NextResponse("Failed to generate OG image", { status: 500 });
  }
}
