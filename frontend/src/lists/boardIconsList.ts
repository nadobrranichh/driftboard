import {
  Bug,
  Gem,
  Newspaper,
  Palette,
  Rocket,
  Sun,
  type LucideIcon,
} from "lucide-react";

export const boardColorRamps = {
  blue: { bg: "#E8E7FC", fg: "#4F46E5" },
  orange: { bg: "#FDECD9", fg: "#B5590E" },
  purple: { bg: "#F1E8FB", fg: "#7E22CE" },
  green: { bg: "#E1F5E9", fg: "#15803D" },
  yellow: { bg: "#FDF6D9", fg: "#A16207" },
  red: { bg: "#FCE8E8", fg: "#DC2626" },
} as const;

export type BoardColor = keyof typeof boardColorRamps;

export const boardIcons: Record<string, LucideIcon> = {
  gem: Gem,
  sun: Sun,
  bug: Bug,
  palette: Palette,
  rocket: Rocket,
  newspaper: Newspaper,
};
