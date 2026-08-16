import { CHARACTERS, type Character } from "@/lib/game/characters";
import { HeadMark } from "./HeadMark";
import type { Mark } from "@/lib/game/logic";

export function Panel({
  title,
  subtitle,
  children,
  onBack,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onBack?: () => void;
}) {
  return (
    <div className="w-full max-w-3xl rounded-[2rem] border-4 border-foreground/20 bg-card/80 p-6 text-center shadow-[0_22px_0_-8px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-10">
      <h1 className="font-display text-3xl text-primary sm:text-5xl">{title}</h1>
      {subtitle ? (
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">{subtitle}</p>
      ) : null}
      <div className="mt-7">{children}</div>
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="mt-7 rounded-2xl border-2 border-foreground/20 bg-background/50 px-5 py-2 font-display text-sm transition-transform hover:scale-105"
        >
          Back
        </button>
      ) : null}
    </div>
  );
}

const bigButton =
  "w-full rounded-3xl border-4 border-foreground/20 px-6 py-5 font-display text-xl shadow-[0_10px_0_-2px_rgba(0,0,0,0.3)] transition-transform hover:scale-[1.03] active:translate-y-1";

export function MainMenu({ onSelect }: { onSelect: (mode: "cpu" | "pvp") => void }) {
  return (
    <Panel
      title="Ooo Tic-Tac-Toe"
      subtitle="Grab a hero, claim three in a row, and rule the Land of Ooo."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onSelect("cpu")}
          className={`${bigButton} bg-primary text-primary-foreground`}
        >
          Play vs Computer
        </button>
        <button
          type="button"
          onClick={() => onSelect("pvp")}
          className={`${bigButton} bg-secondary text-secondary-foreground`}
        >
          Play vs Player
        </button>
      </div>
    </Panel>
  );
}

export function DifficultySelect({
  onSelect,
  onBack,
}: {
  onSelect: (d: "easy" | "hard") => void;
  onBack: () => void;
}) {
  return (
    <Panel
      title="How clever is the machine?"
      subtitle="Pick how hard BMO's brain should think."
      onBack={onBack}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onSelect("easy")}
          className={`${bigButton} bg-secondary text-secondary-foreground`}
        >
          Easy Mode
          <span className="mt-1 block font-sans text-xs opacity-80">
            Makes mistakes — beatable
          </span>
        </button>
        <button
          type="button"
          onClick={() => onSelect("hard")}
          className={`${bigButton} bg-destructive text-destructive-foreground`}
        >
          Difficult Mode
          <span className="mt-1 block font-sans text-xs opacity-80">
            Plays perfectly — good luck
          </span>
        </button>
      </div>
    </Panel>
  );
}

export function SideSelect({
  mode,
  onSelect,
  onBack,
}: {
  mode: "cpu" | "pvp";
  onSelect: (mark: Mark) => void;
  onBack: () => void;
}) {
  return (
    <Panel
      title={mode === "cpu" ? "Choose your side" : "Player 1, choose your side"}
      subtitle="X always moves first."
      onBack={onBack}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {(["X", "O"] as Mark[]).map((mark) => (
          <button
            key={mark}
            type="button"
            onClick={() => onSelect(mark)}
            className={`${bigButton} ${
              mark === "X"
                ? "bg-primary text-primary-foreground"
                : "bg-accent text-accent-foreground"
            }`}
          >
            Play as {mark}
            <span className="mt-1 block font-sans text-xs opacity-80">
              {mark === "X" ? "Starts first" : "Moves second"}
            </span>
          </button>
        ))}
      </div>
    </Panel>
  );
}

export function CharacterSelect({
  heading,
  subtitle,
  takenId,
  onSelect,
  onBack,
}: {
  heading: string;
  subtitle: string;
  takenId?: string | undefined;
  onSelect: (c: Character) => void;
  onBack: () => void;
}) {
  return (
    <Panel title={heading} subtitle={subtitle} onBack={onBack}>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
        {CHARACTERS.map((c) => {
          const taken = c.id === takenId;
          return (
            <button
              key={c.id}
              type="button"
              disabled={taken}
              onClick={() => onSelect(c)}
              className={`flex flex-col items-center gap-1 rounded-2xl border-2 border-foreground/15 bg-background/50 p-2 transition-transform ${
                taken ? "opacity-30" : "hover:scale-105 hover:bg-primary/20"
              }`}
            >
              <HeadMark character={c} size={64} />
              <span className="font-display text-[11px] leading-tight">{c.name}</span>
            </button>
          );
        })}
      </div>
    </Panel>
  );
}
