import type { boardIcons } from "../lists/boardIconsList";

export type BoardType = {
  id: number;
  title: string;
  icon: keyof typeof boardIcons;
  iconColor: string;
  taskCount?: number;
};
