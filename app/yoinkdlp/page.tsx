"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { YoinkdlpWipDialog } from "./wip-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import GlitchText from "@/components/ui/glitch-text";
import {
  Download,
  Music,
  Video,
  Loader2,
  AlertCircle,
  FileAudio,
  FileVideo,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
    <div className="min-h-screen w-full flex flex-col items-center pt-32 pb-20 px-4 relative overflow-hidden">
      <YoinkdlpWipDialog />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="max-w-4xl w-full space-y-12 relative z-10"
      >
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Yoink<span className="text-blue-500">DLP</span>
            </h1>
          </motion.div>
          <p className="text-neutral-400 max-w-md mx-auto text-sm md:text-base leading-relaxed">
            Cobalt.tools lacking? We&apos;ve got you covered. <br />
            Simple, fast, and reliable YouTube downloading.
          </p>
        </div>

        <div className="w-full max-w-xl mx-auto space-y-8">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 group-hover:opacity-50 blur transition duration-500" />
            <div className="relative">
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={(e) => setUrl(e.target.value)}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-6">
            <label
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer select-none",
                audioOnly
                  ? "bg-blue-500/10 border-blue-500/50 text-blue-400"
                  : "bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:border-neutral-700",
              )}
            >
              <input
                type="checkbox"
                checked={audioOnly}
                onChange={(e) => setAudioOnly(e.target.checked)}
                className="hidden"
              />
              {audioOnly ? <Music size={18} /> : <Video size={18} />}
              <span className="text-sm font-medium">
                {audioOnly ? "Audio Mode" : "Video Mode"}
              </span>
            </label>
          </div>
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-center gap-2 text-neutral-400"
              >
                <Loader2 className="animate-spin" size={20} />
                <span className="text-sm">Fetching formats...</span>
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-center gap-2 text-red-400 bg-red-950/20 p-3 rounded-lg border border-red-900/50"
              >
                <AlertCircle size={18} />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {data && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="w-full"
            >
              <Card className="overflow-hidden border-neutral-800 bg-neutral-900/40 backdrop-blur-xl">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="shrink-0 mx-auto md:mx-0">
                      {data.thumbnail && (
                        <div className="relative w-64 aspect-video rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 group">
                          <Image
                            src={data.thumbnail}
                            alt={data.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-neutral-100 line-clamp-2 leading-tight">
                          {data.title}
                        </h2>
                        <div className="flex items-center gap-2 mt-2 text-neutral-500 text-sm">
                          {audioOnly ? (
                            <FileAudio size={14} />
                          ) : (
                            <FileVideo size={14} />
                          )}
                          <span>
                            {audioOnly ? "Audio Extraction" : "Video Download"}
                          </span>
                        </div>
                      </div>
                      <div className="grid gap-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {data.formats.map((f, idx) => (
                          <motion.div
                            key={f.url}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-center justify-between p-3 rounded-lg bg-neutral-800/30 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/50 transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <span className="px-2 py-1 rounded bg-neutral-900 text-xs font-mono text-neutral-400 border border-neutral-800">
                                {f.ext.toUpperCase()}
                              </span>
                              <span className="text-sm font-medium text-neutral-200">
                                {f.quality}
                              </span>
                            </div>
                            <Button
                              asChild
                              size="sm"
                              variant="ghost"
                              className="h-8 gap-2 text-neutral-400 hover:text-blue-400 hover:bg-blue-500/10 glitch"
                            >
                              <a
                                href={`/api/yoinkdlp/download?url=${encodeURIComponent(
                                  f.url,
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                download
                              >
                                <GlitchText
                                  text="Download"
                                  color="currentColor"
                                />
                                <Download size={14} />
                              </a>
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
