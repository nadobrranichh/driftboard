import { Bug, Gem, Newspaper, Palette, Rocket, Sun } from "lucide-react";

export const boardColorRamps = {
  blue: { bg: "#E8E7FC", fg: "#4F46E5" },
  orange: { bg: "#FDECD9", fg: "#B5590E" },
  purple: { bg: "#F1E8FB", fg: "#7E22CE" },
  green: { bg: "#E1F5E9", fg: "#15803D" },
  yellow: { bg: "#FDF6D9", fg: "#A16207" },
  red: { bg: "#FCE8E8", fg: "#DC2626" },
} as const;
export type BoardColor = keyof typeof boardColorRamps;

export const boardIconsList = [
  {
    color: "blue" as BoardColor,
    icon: Gem,
  },
  {
    color: "yellow" as BoardColor,
    icon: Sun,
  },
  {
    color: "green" as BoardColor,
    icon: Bug,
  },
  {
    color: "purple" as BoardColor,
    icon: Palette,
  },
  {
    color: "orange" as BoardColor,
    icon: Rocket,
  },
  { color: "red" as BoardColor, icon: Newspaper },
];
