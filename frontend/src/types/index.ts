import type { boardIcons } from "../lists/boardIconsList";

export type TaskType = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  position: number;
  assigneeId?: number;
  columnId: number;
};

export type ColumnType = {
  id: number;
  title: string;
  position: number;
  boardId: number;
  tasks?: TaskType[];
};

export type BoardType = {
  id: number;
  title: string;
  icon: keyof typeof boardIcons;
  iconColor: string;
  taskCount?: number;
  columns?: ColumnType[];
};
