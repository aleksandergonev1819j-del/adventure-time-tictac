# Land of Ooo Tic-Tac-Toe

A single-page game inspired by Adventure Time, where the classic X and O marks are replaced by character heads.

## Flow

```text
Home menu
  -> vs Computer  -> Easy / Hard  -> pick side (X or O) -> pick character for each side -> Game
  -> vs Player    ->                pick side (X or O) -> pick character for each side -> Game
```

Rules: 3x3 board, X always moves first. After each round the board resets automatically with the same mode; the side panel keeps a running scoreboard.

## Screens

**Home menu** — Ooo-themed illustrated background, game title, two big buttons: "Play vs Computer" and "Play vs Player".

**Difficulty** (computer only) — Easy Mode (random-ish moves with occasional mistakes) or Hard Mode (unbeatable minimax).

**Side select** — choose X or O. In computer mode the machine takes the other side; in player-vs-player, player 2 takes the other side.

**Character select** — each side picks a head from: Finn, Jake, BMO, Ice King, Princess Bubblegum, Marceline, Flame Princess, Lemongrab, Lady Rainicorn. A character can't be picked twice in one game.

**Game screen** — 3x3 board over the themed background. Placed marks show the chosen character head with a small pop animation; the winning line is highlighted. Side panel shows: whose turn it is, both characters with their win counts, the draw count, a "New round" control, and a "Back to main menu" button (which clears the session score).

**Result overlay** — after each round a banner announces the winner by character name ("Finn wins!") or, on a tie, "It's a draw — nobody wins!". Scores update, then the board reloads for the next round in the same mode.

## Art

AI-generated assets saved into the project:
- 9 character head icons in an original cartoon style (transparent PNGs) — no copyrighted likenesses, just recognizable-in-spirit designs.
- 1 wide illustrated Ooo-style landscape background (candy hills, grass lands, night sky).

## Technical notes

- All client-side, no backend. Game state (mode, difficulty, sides, characters, scores) held in React state in a single game store; scores live for the session only.
- New route content in `src/routes/index.tsx` replacing the placeholder, with components under `src/components/game/` (Menu, DifficultySelect, SideSelect, CharacterSelect, Board, Square, ScorePanel, ResultOverlay).
- Adventure-Time-flavored design tokens (candy pink, grass green, sky blue, night navy, gold) added to `src/styles.css` as oklch semantic tokens; a rounded playful display font loaded via a `<link>` in `__root.tsx`.
- Computer AI: Hard = minimax with memo; Easy = random legal move with a small chance of taking an obvious win/block.
- SEO head() on the index route with a game-specific title/description and og/twitter tags.
