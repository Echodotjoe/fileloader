import { AppWindow, Play, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ArcadeFile } from "@/lib/catalog";

type Props = {
  game: ArcadeFile;
  onPlay: (game: ArcadeFile) => void;
};

export function GameCard({ game, onPlay }: Props) {
  const Icon = game.type === "swf" ? Zap : AppWindow;

  return (
    <article className="flex flex-col items-center rounded-xl border border-border bg-bg-elevated p-5 text-center shadow-card transition-transform duration-150 ease-out hover:-translate-y-1">
      <div
        className="flex size-28 items-center justify-center rounded-lg bg-primary text-primary-fg sm:size-32"
        aria-hidden="true"
      >
        <Icon className="size-12" strokeWidth={1.6} />
      </div>
      <h2 className="mt-4 line-clamp-2 min-h-12 font-display text-lg font-semibold leading-snug text-fg">
        {game.name}
      </h2>
      <p className="mb-4 text-xs font-medium uppercase tracking-wider text-subtle">
        {game.type === "swf" ? "SWF" : "HTML"}
        {game.source === "local" ? " · Local" : ""}
      </p>
      <Button className="w-full rounded-full" onClick={() => onPlay(game)}>
        <Play className="size-4 fill-current" />
        Play
      </Button>
    </article>
  );
}
