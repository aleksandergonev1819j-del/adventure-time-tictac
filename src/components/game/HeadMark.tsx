import type { Character } from "@/lib/game/characters";

export function HeadMark({
  character,
  size = 96,
  className = "",
  animate = false,
}: {
  character: Character;
  size?: number;
  className?: string;
  animate?: boolean;
}) {
  return (
    <img
      src={character.image}
      alt={character.name}
      width={size}
      height={size}
      loading="lazy"
      style={{ width: size, height: size }}
      className={`object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)] ${
        animate ? "animate-scale-in" : ""
      } ${className}`}
    />
  );
}
