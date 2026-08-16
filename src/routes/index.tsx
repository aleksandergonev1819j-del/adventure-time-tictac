import { createFileRoute } from "@tanstack/react-router";
import { OooGame } from "@/components/game/OooGame";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ooo Tic-Tac-Toe — Adventure-Time-Style Noughts & Crosses" },
      {
        name: "description",
        content:
          "Play tic-tac-toe in the Land of Ooo: pick a cartoon hero head instead of X or O, battle the computer on easy or hard, or challenge a friend.",
      },
      { property: "og:title", content: "Ooo Tic-Tac-Toe" },
      {
        property: "og:description",
        content:
          "Cartoon-adventure tic-tac-toe with hero heads instead of X and O, computer difficulty modes, and a running scoreboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <OooGame />;
}
