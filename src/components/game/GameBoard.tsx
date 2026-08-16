import { HeadMark } from "./HeadMark";
import type { Character } from "@/lib/game/characters";
import type { Board, Mark } from "@/lib/game/logic";

export function GameBoard({
  board,
  characters,
  winningLine,
  disabled,
  onPlay,
}: {
  board: Board;
  characters: Record<Mark, Character>;
  winningLine: number[] | null;
  disabled: boolean;
  onPlay: (index: number) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-3 rounded-3xl border-4 border-foreground/20 bg-card/70 p-3 shadow-[0_18px_0_-6px_rgba(0,0,0,0.35)] backdrop-blur-md sm:gap-4 sm:p-4">
      {board.map((cell, i) => {
        const isWinning = winningLine?.includes(i) ?? false;
        return (
          <button
            key={i}
            type="button"
            aria-label={`Square ${i + 1}${cell ? `, ${characters[cell].name}` : ", empty"}`}
            disabled={disabled || cell !== null}
            onClick={() => onPlay(i)}
            className={`flex aspect-square w-20 items-center justify-center rounded-2xl border-2 transition-all sm:w-28 ${
              isWinning
                ? "border-accent bg-accent/30 scale-105"
                : "border-foreground/15 bg-background/40"
            } ${!cell && !disabled ? "hover:bg-primary/20 hover:scale-[1.03] cursor-pointer" : ""}`}
          >
            {cell ? (
              <HeadMark character={characters[cell]} size={80} animate className="p-1" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
