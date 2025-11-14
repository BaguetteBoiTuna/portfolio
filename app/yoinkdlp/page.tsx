"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

interface Format {
  quality: string;
  url: string;
  ext: string;
}

interface YoinkResponse {
  title: string;
  thumbnail: string | null;
  formats: Format[];
}

export default function YoinkDLPPage() {
  const [url, setUrl] = useState("");
  const [audioOnly, setAudioOnly] = useState(false);
  const [data, setData] = useState<YoinkResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const placeholders = [
    "https://youtu.be/dQw4w9WgXcQ",
    "https://youtu.be/9bZkp7q19f0",
    "https://youtu.be/ZZ5LpwO-An4",
    "https://youtu.be/lXMskKTw3Bc",
    "https://youtu.be/fLexgOxsZu0",
    "https://youtu.be/j5a0jTc9S10",
    "https://youtu.be/uxpDa-c-4Mc",
    "Paste any YouTube link to yoink it...",
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch("/api/yoinkdlp", {
        method: "POST",
        body: JSON.stringify({ url, audioOnly }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const b = await res.json().catch(() => null);
        throw new Error(b?.error || "Unknown error");
      }

      const json: YoinkResponse = await res.json();
      setData(json);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center pt-32 pb-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 16 }}
        className="max-w-3xl w-full space-y-10"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold">YoinkDLP</h1>
          <p className="text-sm text-neutral-400 mt-2">
            A playful YouTube downloader powered by Piped.
          </p>
        </div>

        {/* Input */}
        <div className="bg-neutral-900/60 rounded-xl border border-neutral-700 p-6">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={(e) => setUrl(e.target.value)}
            onSubmit={handleSubmit}
          />

          <label className="flex items-center gap-3 text-sm text-neutral-300 mt-6">
            <input
              type="checkbox"
              checked={audioOnly}
              onChange={(e) => setAudioOnly(e.target.checked)}
              className="h-4 w-4 rounded border-neutral-600 bg-neutral-800"
            />
            Audio only
          </label>

          {loading && (
            <p className="text-sm text-neutral-400 mt-4">Processing…</p>
          )}
          {error && <p className="text-sm text-red-400 mt-4">{error}</p>}
        </div>

        {/* Results */}
        {data && (
          <div className="bg-neutral-900/60 rounded-xl border border-neutral-700 p-6 space-y-6">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {data.thumbnail && (
                <img
                  src={data.thumbnail}
                  alt={data.title}
                  className="h-20 w-36 rounded-md object-cover"
                />
              )}
              <h2 className="text-xl font-semibold">{data.title}</h2>
            </div>

            <div className="overflow-x-auto rounded-lg border border-neutral-700">
              <table className="w-full text-sm">
                <thead className="bg-neutral-800 sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left">Quality</th>
                    <th className="px-3 py-2 text-left">Ext</th>
                    <th className="px-3 py-2 text-left">Download</th>
                  </tr>
                </thead>

                <tbody>
                  {data.formats.map((f) => (
                    <tr
                      key={f.url}
                      className="border-t border-neutral-700 hover:bg-neutral-800/40"
                    >
                      <td className="px-3 py-2">{f.quality}</td>
                      <td className="px-3 py-2">{f.ext}</td>
                      <td className="px-3 py-2">
                        <a
                          href={f.url}
                          className="underline text-blue-400 hover:text-blue-300"
                          target="_blank"
                          rel="noreferrer"
                          download
                        >
                          Download
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
