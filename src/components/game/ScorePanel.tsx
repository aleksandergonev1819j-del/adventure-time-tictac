import { HeadMark } from "./HeadMark";
import type { Character } from "@/lib/game/characters";
import type { Mark } from "@/lib/game/logic";

export type Scores = { X: number; O: number; draws: number };

export function ScorePanel({
  characters,
  scores,
  labels,
  turnLabel,
  onNewRound,
  onHome,
}: {
  characters: Record<Mark, Character>;
  scores: Scores;
  labels: Record<Mark, string>;
  turnLabel: string;
  onNewRound: () => void;
  onHome: () => void;
}) {
  return (
    <aside className="w-full max-w-xs rounded-3xl border-4 border-foreground/20 bg-card/80 p-5 shadow-[0_18px_0_-6px_rgba(0,0,0,0.35)] backdrop-blur-md">
      <h2 className="font-display text-2xl text-primary">Scoreboard</h2>
      <p className="mt-1 text-sm text-muted-foreground">{turnLabel}</p>

      <ul className="mt-4 space-y-3">
        {(["X", "O"] as Mark[]).map((mark) => (
          <li
            key={mark}
            className="flex items-center gap-3 rounded-2xl bg-background/50 p-2"
          >
            <HeadMark character={characters[mark]} size={44} />
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-base leading-tight">
                {characters[mark].name}
              </p>
              <p className="text-xs text-muted-foreground">
                {labels[mark]} · plays {mark}
              </p>
            </div>
            <span className="font-display text-2xl text-accent">{scores[mark]}</span>
          </li>
        ))}
        <li className="flex items-center justify-between rounded-2xl bg-background/50 p-3">
          <span className="font-display text-base">Draws</span>
          <span className="font-display text-2xl text-secondary">{scores.draws}</span>
        </li>
      </ul>

      <div className="mt-5 space-y-2">
        <button
          type="button"
          onClick={onNewRound}
          className="w-full rounded-2xl border-2 border-foreground/20 bg-secondary px-4 py-2 font-display text-secondary-foreground transition-transform hover:scale-[1.02]"
        >
          Restart round
        </button>
        <button
          type="button"
          onClick={onHome}
          className="w-full rounded-2xl border-2 border-foreground/20 bg-primary px-4 py-2 font-display text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          Back to main menu
        </button>
      </div>
    </aside>
  );
}
