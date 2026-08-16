export type Mark = "X" | "O";
export type Cell = Mark | null;
export type Board = Cell[];

export const LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const emptyBoard = (): Board => Array(9).fill(null);

export function getWinner(board: Board): { mark: Mark; line: number[] } | null {
  for (const line of LINES) {
    const [a, b, c] = line;
    const v = board[a];
    if (v && v === board[b] && v === board[c]) return { mark: v, line };
  }
  return null;
}

export const isFull = (board: Board) => board.every((c) => c !== null);

export const availableMoves = (board: Board) =>
  board.reduce<number[]>((acc, c, i) => (c === null ? [...acc, i] : acc), []);

const other = (m: Mark): Mark => (m === "X" ? "O" : "X");

function minimax(board: Board, turn: Mark, me: Mark, depth: number): number {
  const win = getWinner(board);
  if (win) return win.mark === me ? 10 - depth : depth - 10;
  if (isFull(board)) return 0;

  const scores = availableMoves(board).map((move) => {
    const next = [...board];
    next[move] = turn;
    return minimax(next, other(turn), me, depth + 1);
  });

  return turn === me ? Math.max(...scores) : Math.min(...scores);
}

function bestMove(board: Board, me: Mark): number {
  const moves = availableMoves(board);
  let best = moves[0];
  let bestScore = -Infinity;
  for (const move of moves) {
    const next = [...board];
    next[move] = me;
    const score = minimax(next, other(me), me, 0);
    if (score > bestScore) {
      bestScore = score;
      best = move;
    }
  }
  return best;
}

function findLine(board: Board, mark: Mark): number | null {
  for (const line of LINES) {
    const cells = line.map((i) => board[i]);
    const marks = cells.filter((c) => c === mark).length;
    const empty = cells.filter((c) => c === null).length;
    if (marks === 2 && empty === 1) {
      return line[cells.findIndex((c) => c === null)];
    }
  }
  return null;
}

export function computerMove(
  board: Board,
  me: Mark,
  difficulty: "easy" | "hard",
): number {
  const moves = availableMoves(board);
  if (moves.length === 0) return -1;

  if (difficulty === "hard") return bestMove(board, me);

  // Easy: mostly random, sometimes spots an obvious win or block.
  if (Math.random() < 0.5) {
    const win = findLine(board, me);
    if (win !== null) return win;
    const block = findLine(board, other(me));
    if (block !== null) return block;
  }
  return moves[Math.floor(Math.random() * moves.length)];
}
