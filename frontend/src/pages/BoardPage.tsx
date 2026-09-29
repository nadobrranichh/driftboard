import { useState } from "react";
import NewTaskForm from "../components/NewTaskForm";
import { useLocation, useNavigate, useParams } from "react-router";
import type { BoardType, ColumnType, OpenForm } from "../types";
import ColumnPill from "../components/ColumnPill";
import useGetBoard from "../hooks/useGetBoard";
import useBreakpoints from "../hooks/useBreakpoints";
import Column from "../components/Column";
import NewColumn from "../components/NewColumn";
import {
  closestCorners,
  DndContext,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { getColumn } from "../utils/tasks";
import { AnimatePresence, motion } from "framer-motion";
import { fade } from "../motion/variants";
import BoardSettings from "../components/BoardSettings";
import TaskDetail from "../components/TaskDetail";
import { useAuthStore } from "../store/useAuthStore";
import useBoardEvents from "../hooks/useBoardEvents";
import useBoardDnd from "../hooks/useBoardDnd";
import BoardHeader from "../components/BoardHeader";

export default function BoardPage() {
  const { socket } = useAuthStore();
  const { isLg } = useBreakpoints();
  const navigate = useNavigate();
  const { boardId } = useParams();
  const location = useLocation();

  const boardQuery = useGetBoard(Number(boardId), location.state);
  const board: BoardType | null = boardQuery.data
    ? boardQuery.data.board
    : null;
  const { sensors, handleDragStart, handleDragOver, handleDragEnd } =
    useBoardDnd(board);

  const [openForm, setOpenForm] = useState<OpenForm>(null);
  const [activeColumnId, setActiveColumnId] = useState<UniqueIdentifier | null>(
    null,
  );
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const activeColumn =
    board?.columns &&
    activeColumnId &&
    getColumn(board, parseInt(activeColumnId.toString()));

  function handleAddingNewTask(columnId: UniqueIdentifier) {
    setActiveColumnId(columnId);
    setOpenForm("new-task");
  }

  function handleSelectTask(taskId: number) {
    setSelectedTaskId(taskId);
    setOpenForm("task-detail");
  }

  function handleNavigateHome() {
    if (socket && board) socket.emit("close-board", { boardId: board.id });
    navigate("/home");
  }

  useBoardEvents(Number(boardId), board?.title);

  if (!board?.columns) return <p>Loading...</p>;

  return (
    <main className="flex flex-col p-1-5">
      <AnimatePresence>
        {openForm === "settings" && (
          <BoardSettings onClose={() => setOpenForm(null)} />
        )}
        {openForm === "new-task" && (
          <NewTaskForm
            columnId={Number(activeColumnId)}
            onClose={() => setOpenForm(null)}
          />
        )}
        {openForm === "task-detail" && selectedTaskId && (
          <TaskDetail
            taskId={selectedTaskId}
            onClose={() => {
              setOpenForm(null);
              setSelectedTaskId(null);
            }}
          />
        )}
      </AnimatePresence>

      <BoardHeader
        board={board}
        onNavigateHome={handleNavigateHome}
        onOpenSettings={() => setOpenForm("settings")}
      />
      {isLg ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <motion.div
            variants={fade({ withStagger: true })}
            initial="hidden"
            animate="visible"
            className="flex-1 flex gap-5 h-full overflow-x-auto"
          >
            {board &&
              board.columns.map((col: ColumnType) => (
                <Column
                  data={col}
                  key={col.id}
                  onNewTask={() => handleAddingNewTask(col.id)}
                  onSelectTask={handleSelectTask}
                />
              ))}
            <NewColumn />
          </motion.div>
        </DndContext>
      ) : (
        <>
          <p className="font-semibold text-xl mb-2">Columns</p>
          <div className="flex gap-2 mb-4 flex-wrap">
            {board &&
              board.columns.map((col: ColumnType) => (
                <ColumnPill
                  key={col.id}
                  data={col}
                  onClick={() => setActiveColumnId(col.id)}
                  isActive={activeColumnId === col.id}
                />
              ))}
            <NewColumn />
          </div>

          {activeColumn ? (
            <Column
              data={activeColumn}
              onNewTask={() => setOpenForm("new-task")}
              onSelectTask={handleSelectTask}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <h2 className="font-bold text-xl text-text-muted">
                select a column to see tasks
              </h2>
            </div>
          )}
        </>
      )}
    </main>
  );
}
