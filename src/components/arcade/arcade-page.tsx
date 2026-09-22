import { useCallback, useEffect, useRef, useState } from "react";
import { FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GameCard } from "@/components/arcade/game-card";
import { PlayerOverlay } from "@/components/arcade/player-overlay";
import {
  arcadeFileFromLocal,
  listArcadeFiles,
  type ArcadeFile,
} from "@/lib/catalog";

export function ArcadePage() {
  const [games, setGames] = useState<ArcadeFile[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [playing, setPlaying] = useState<ArcadeFile | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const localUrls = useRef<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    listArcadeFiles()
      .then((files) => {
        if (cancelled) return;
        setGames(files);
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });
    return () => {
      cancelled = true;
      for (const url of localUrls.current) URL.revokeObjectURL(url);
    };
  }, []);

  const addFiles = useCallback((fileList: FileList | File[]) => {
    const next: ArcadeFile[] = [];
    for (const file of Array.from(fileList)) {
      const url = URL.createObjectURL(file);
      const entry = arcadeFileFromLocal(file, url);
      if (!entry) {
        URL.revokeObjectURL(url);
        continue;
      }
      localUrls.current.push(url);
      next.push(entry);
    }
    if (next.length === 0) return;
    setGames((prev) => {
      const ids = new Set(prev.map((g) => g.id));
      return [...next.filter((g) => !ids.has(g.id)), ...prev];
    });
    setStatus("ready");
  }, []);

  return (
    <div
      className="relative min-h-dvh bg-bg text-fg"
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgb(181_107_255/0.18),transparent_60%)]" />

      <header className="relative mx-auto flex max-w-6xl flex-col gap-6 px-5 pb-8 pt-10 sm:flex-row sm:items-end sm:justify-between sm:pt-14">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Game library
          </p>
          <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Violet Arcade
          </h1>
          <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
            HTML and SWF files next to this page show up as playable tiles. Drop more
            onto the page, or open them from your device.
          </p>
        </div>
        <div>
          <input
            ref={fileRef}
            type="file"
            accept=".html,.htm,.swf"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) addFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <Button variant="outline" onClick={() => fileRef.current?.click()}>
            <FolderOpen />
            Open HTML or SWF
          </Button>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-5 pb-20">
        {status === "loading" && (
          <p className="text-muted">Scanning for games…</p>
        )}
        {status === "error" && games.length === 0 && (
          <p className="text-muted">
            Could not scan the page folder. Open an HTML or SWF file to play.
          </p>
        )}
        {status !== "loading" && games.length === 0 && status !== "error" && (
          <p className="rounded-lg border border-border bg-bg-elevated px-5 py-8 text-center text-muted">
            No HTML or SWF files found next to this page yet. Drop files here to play.
          </p>
        )}
        {games.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <GameCard key={game.id} game={game} onPlay={setPlaying} />
            ))}
          </div>
        )}
      </main>

      {dragOver && (
        <div className="pointer-events-none fixed inset-4 z-40 flex items-center justify-center rounded-xl border-2 border-dashed border-primary bg-bg/80">
          <p className="font-display text-xl font-semibold">Drop HTML or SWF files</p>
        </div>
      )}

      {playing && <PlayerOverlay game={playing} onClose={() => setPlaying(null)} />}
    </div>
  );
}
