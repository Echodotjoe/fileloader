import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ArcadeFile } from "@/lib/catalog";

type Props = {
  game: ArcadeFile;
  onClose: () => void;
};

type RufflePlayerEl = HTMLElement & { load: (url: string) => void };

declare global {
  interface Window {
    RufflePlayer?: {
      newest: () => {
        createPlayer: () => RufflePlayerEl;
      };
    };
  }
}

let ruffleLoader: Promise<void> | null = null;

function loadRuffle(): Promise<void> {
  if (window.RufflePlayer) return Promise.resolve();
  if (ruffleLoader) return ruffleLoader;
  ruffleLoader = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@ruffle-rs/ruffle";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load Flash player"));
    document.head.appendChild(script);
  });
  return ruffleLoader;
}

export function PlayerOverlay({ game, onClose }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || game.type !== "swf") return;
    let cancelled = false;
    let player: RufflePlayerEl | null = null;

    loadRuffle()
      .then(() => {
        if (cancelled || !stageRef.current || !window.RufflePlayer) return;
        const ruffle = window.RufflePlayer.newest();
        player = ruffle.createPlayer();
        player.style.width = "100%";
        player.style.height = "100%";
        stageRef.current.innerHTML = "";
        stageRef.current.appendChild(player);
        player.load(game.file);
      })
      .catch((err) => {
        if (cancelled || !stageRef.current) return;
        stageRef.current.innerHTML = `<p class="p-6 text-muted text-center">${String(err.message ?? err)}</p>`;
      });

    return () => {
      cancelled = true;
      if (player?.parentNode) player.parentNode.removeChild(player);
      if (stage) stage.innerHTML = "";
    };
  }, [game]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-bg/95 p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="player-title"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 pb-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-subtle">
            {game.type === "swf" ? "Flash" : "HTML"} · Now playing
          </p>
          <h2 id="player-title" className="truncate font-display text-xl font-semibold">
            {game.name}
          </h2>
        </div>
        <Button variant="outline" size="icon" onClick={onClose} aria-label="Close player">
          <X />
        </Button>
      </div>
      <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 overflow-hidden rounded-xl border border-border bg-bg-elevated shadow-card">
        {game.type === "html" ? (
          <iframe
            title={game.name}
            src={game.file}
            className="h-full w-full border-0 bg-bg"
            allow="fullscreen; autoplay; gamepad"
          />
        ) : (
          <div ref={stageRef} className="h-full w-full" />
        )}
      </div>
    </div>
  );
}
