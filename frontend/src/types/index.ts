import * as Icons from "lucide-react";

export type BoardType = {
  id: number;
  title: string;
  icon: keyof typeof Icons;
  iconColor: string;
  taskCount?: number;
};
