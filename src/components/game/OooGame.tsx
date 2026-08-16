import { useCallback, useEffect, useState } from "react";
import bg from "@/assets/ooo-background.jpg";
import { CHARACTERS, type Character } from "@/lib/game/characters";
import {
  computerMove,
  emptyBoard,
  getWinner,
  isFull,
  type Board,
  type Mark,
} from "@/lib/game/logic";
import { GameBoard } from "./GameBoard";
import { ScorePanel, type Scores } from "./ScorePanel";
import {
  CharacterSelect,
  DifficultySelect,
  MainMenu,
  SideSelect,
} from "./Menus";
import { HeadMark } from "./HeadMark";

type Mode = "cpu" | "pvp";
type Difficulty = "easy" | "hard";
type Step = "menu" | "difficulty" | "side" | "pickX" | "pickO" | "play";

const emptyScores: Scores = { X: 0, O: 0, draws: 0 };

export function OooGame() {
  const [step, setStep] = useState<Step>("menu");
  const [mode, setMode] = useState<Mode>("cpu");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [playerMark, setPlayerMark] = useState<Mark>("X");
  const [picks, setPicks] = useState<Partial<Record<Mark, Character>>>({});
  const [board, setBoard] = useState<Board>(emptyBoard);
  const [turn, setTurn] = useState<Mark>("X");
  const [scores, setScores] = useState<Scores>(emptyScores);
  const [result, setResult] = useState<null | { mark: Mark | null; line: number[] | null }>(
    null,
  );

  const characters: Record<Mark, Character> = {
    X: picks.X ?? CHARACTERS[0]!,
    O: picks.O ?? CHARACTERS[1]!,
  };
  const cpuMark: Mark = playerMark === "X" ? "O" : "X";

  const labels: Record<Mark, string> =
    mode === "cpu"
      ? ({ [playerMark]: "You", [cpuMark]: "Computer" } as Record<Mark, string>)
      : { X: "Player 1", O: "Player 2" };

  const goHome = () => {
    setStep("menu");
    setPicks({});
    setScores(emptyScores);
    setBoard(emptyBoard());
    setTurn("X");
    setResult(null);
  };

  const startRound = useCallback(() => {
    setBoard(emptyBoard());
    setTurn("X");
    setResult(null);
  }, []);

  const play = useCallback(
    (index: number) => {
      if (board[index] !== null || result) return;
      const next = [...board];
      next[index] = turn;
      setBoard(next);

      const win = getWinner(next);
      if (win) {
        setResult({ mark: win.mark, line: win.line });
        setScores((s) => ({ ...s, [win.mark]: s[win.mark] + 1 }));
      } else if (isFull(next)) {
        setResult({ mark: null, line: null });
        setScores((s) => ({ ...s, draws: s.draws + 1 }));
      } else {
        setTurn(turn === "X" ? "O" : "X");
      }
    },
    [board, turn, result],
  );


  // Computer turn
  useEffect(() => {
    if (step !== "play" || mode !== "cpu" || result || turn !== cpuMark) return;
    const timer = setTimeout(() => {
      const move = computerMove(board, cpuMark, difficulty);
      if (move >= 0) play(move);
    }, 600);
    return () => clearTimeout(timer);
  }, [step, mode, result, turn, cpuMark, board, difficulty, play]);

  // Auto reload the board after a finished round
  useEffect(() => {
    if (!result) return;
    const timer = setTimeout(startRound, 2600);
    return () => clearTimeout(timer);
  }, [result, startRound]);

  const humanTurn = mode === "pvp" || turn === playerMark;

  const turnLabel = result
    ? "Round over — resetting the board…"
    : `${labels[turn]} · ${characters[turn].name}'s turn`;

  const pickXSubtitle =
    mode === "cpu"
      ? playerMark === "X"
        ? "This is your hero — X moves first."
        : "This is the computer's hero — X moves first."
      : "Player 1 picks first if they chose X, otherwise Player 2 does.";

  return (
    <main
      className="relative min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-background/55 backdrop-blur-[2px]" />
      <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 p-4 sm:p-8">
        {step === "menu" && (
          <MainMenu
            onSelect={(m) => {
              setMode(m);
              setPicks({});
              setScores(emptyScores);
              setStep(m === "cpu" ? "difficulty" : "side");
            }}
          />
        )}

        {step === "difficulty" && (
          <DifficultySelect
            onSelect={(d) => {
              setDifficulty(d);
              setStep("side");
            }}
            onBack={() => setStep("menu")}
          />
        )}

        {step === "side" && (
          <SideSelect
            mode={mode}
            onSelect={(m) => {
              setPlayerMark(m);
              setStep("pickX");
            }}
            onBack={() => setStep(mode === "cpu" ? "difficulty" : "menu")}
          />
        )}

        {step === "pickX" && (
          <CharacterSelect
            heading="Choose the head for X"
            subtitle={pickXSubtitle}
            onSelect={(c) => {
              setPicks({ X: c });
              setStep("pickO");
            }}
            onBack={() => setStep("side")}
          />
        )}

        {step === "pickO" && (
          <CharacterSelect
            heading="Choose the head for O"
            subtitle="Pick a different champion for the O side."
            takenId={picks.X?.id}
            onSelect={(c) => {
              setPicks((p) => ({ ...p, O: c }));
              startRound();
              setStep("play");
            }}
            onBack={() => setStep("pickX")}
          />
        )}

        {step === "play" && (
          <div className="flex w-full max-w-4xl flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center">
            <div className="relative">
              <GameBoard
                board={board}
                characters={characters}
                winningLine={result?.line ?? null}
                disabled={!!result || !humanTurn}
                onPlay={play}
              />
              {result && (
                <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-background/80 p-4 animate-fade-in">
                  <div className="text-center">
                    {result.mark ? (
                      <>
                        <HeadMark
                          character={characters[result.mark]}
                          size={96}
                          className="mx-auto"
                        />
                        <p className="mt-2 font-display text-2xl text-primary">
                          {characters[result.mark].name} wins!
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {labels[result.mark]} takes the round
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-display text-2xl text-secondary">
                          It's a draw!
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Nobody wins — you are equal.
                        </p>
                      </>
                    )}
                    <button
                      type="button"
                      onClick={startRound}
                      className="mt-4 rounded-2xl border-2 border-foreground/20 bg-primary px-5 py-2 font-display text-primary-foreground transition-transform hover:scale-105"
                    >
                      Next round
                    </button>
                  </div>
                </div>
              )}
            </div>

            <ScorePanel
              characters={characters}
              scores={scores}
              labels={labels}
              turnLabel={turnLabel}
              onNewRound={startRound}
              onHome={goHome}
            />
          </div>
        )}
      </div>
    </main>
  );
}
