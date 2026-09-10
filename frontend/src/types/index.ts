import type { boardIcons } from "../lists/boardIconsList";

export type User = {
  id: number;
  name: string;
  email: string;
  password?: string;
};

export type TaskType = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  position: number;
  assigneeId?: number | null;
  columnId: number;
  column?: ColumnType;
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
  members?: User[];
};
