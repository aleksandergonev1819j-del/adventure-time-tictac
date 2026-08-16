import finn from "@/assets/heads/finn.png";
import jake from "@/assets/heads/jake.png";
import bmo from "@/assets/heads/bmo.png";
import iceking from "@/assets/heads/iceking.png";
import bubblegum from "@/assets/heads/bubblegum.png";
import marceline from "@/assets/heads/marceline.png";
import flame from "@/assets/heads/flame.png";
import lemongrab from "@/assets/heads/lemongrab.png";
import rainicorn from "@/assets/heads/rainicorn.png";

export type Character = {
  id: string;
  name: string;
  image: string;
};

export const CHARACTERS: Character[] = [
  { id: "finn", name: "Finn the Human", image: finn },
  { id: "jake", name: "Jake the Dog", image: jake },
  { id: "bmo", name: "BMO", image: bmo },
  { id: "iceking", name: "Ice King", image: iceking },
  { id: "bubblegum", name: "Princess Bubblegum", image: bubblegum },
  { id: "marceline", name: "Marceline the Vampire Queen", image: marceline },
  { id: "flame", name: "Flame Princess", image: flame },
  { id: "lemongrab", name: "Earl of Lemongrab", image: lemongrab },
  { id: "rainicorn", name: "Lady Rainicorn", image: rainicorn },
];

export const getCharacter = (id: string): Character =>
  CHARACTERS.find((c) => c.id === id) ?? CHARACTERS[0]!;
