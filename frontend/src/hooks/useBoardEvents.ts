import { useNavigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { useNotificationsStore } from "../store/useNotificationsStore";
import { useEffect } from "react";
import {
  removeBoardFromCache,
  updateBoardCache,
} from "../utils/query-cache/boards";
import { addTaskInCache, updateTaskInCache } from "../utils/query-cache/tasks";
import { handleAddColumn } from "../utils/query-cache/columns";
import type { ColumnType, TaskType } from "../types";

type TaskUpdatedPayload = {
  task: TaskType;
  tasks?: TaskType[];
  oldColumnId: number;
};

export default function useBoardEvents(boardId: number, boardTitle?: string) {
  const { socket } = useAuthStore();
  const { addNotification } = useNotificationsStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) return;

    const onRemoved = ({ boardId: removedId }: { boardId: number }) => {
      if (boardTitle)
        addNotification(`You just got removed from board: ${boardTitle}`);
      removeBoardFromCache({ boardId: removedId });
      if (removedId === boardId) navigate("/home");
    };
    const onTaskUpdated = ({ task, tasks, oldColumnId }: TaskUpdatedPayload) =>
      updateTaskInCache({ task, tasks, oldColumnId, boardId });
    const onColumnAdded = ({ column }: { column: ColumnType }) => {
      addNotification(`Column added: ${column.title}`);
      handleAddColumn({ column });
    };

    socket.on("board-updated", updateBoardCache);
    socket.on("removed-from-board", onRemoved);
    socket.on("column-added", onColumnAdded);
    socket.on("task-added", addTaskInCache);
    socket.on("task-updated", onTaskUpdated);
    return () => {
      socket.off("board-updated", updateBoardCache);
      socket.off("removed-from-board", onRemoved);
      socket.off("column-added", onColumnAdded);
      socket.off("task-added", addTaskInCache);
      socket.off("task-updated", onTaskUpdated);
    };
  }, [socket, boardId, boardTitle]);
}
