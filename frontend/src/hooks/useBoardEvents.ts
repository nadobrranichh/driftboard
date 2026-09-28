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
import type { BoardType, ColumnType, TaskType } from "../types";

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

    function onBoardUpdated({ board }: { board: BoardType }) {
      addNotification(`Board info updated!`);
      updateBoardCache({ board });
    }
    function onRemovedFromBoard({ boardId: removedId }: { boardId: number }) {
      if (boardTitle)
        addNotification(`You just got removed from board: ${boardTitle}`);
      removeBoardFromCache({ boardId: removedId });
      if (removedId === boardId) navigate("/home");
    }
    function onColumnAdded({ column }: { column: ColumnType }) {
      addNotification(`Column added: ${column.title}`);
      handleAddColumn({ column });
    }
    function onTaskAdded({ task }: { task: TaskType }) {
      addNotification(`Task added: ${task.title}`);
      addTaskInCache({ task, boardId });
    }
    function onTaskUpdated({ task, tasks, oldColumnId }: TaskUpdatedPayload) {
      addNotification(`Task updated: ${task.title}`);
      updateTaskInCache({ task, tasks, oldColumnId, boardId });
    }

    socket.on("board-updated", onBoardUpdated);
    socket.on("removed-from-board", onRemovedFromBoard);
    socket.on("column-added", onColumnAdded);
    socket.on("task-added", onTaskAdded);
    socket.on("task-updated", onTaskUpdated);
    return () => {
      socket.off("board-updated", onBoardUpdated);
      socket.off("removed-from-board", onRemovedFromBoard);
      socket.off("column-added", onColumnAdded);
      socket.off("task-added", onTaskAdded);
      socket.off("task-updated", onTaskUpdated);
    };
  }, [socket, boardId, boardTitle]);
}
