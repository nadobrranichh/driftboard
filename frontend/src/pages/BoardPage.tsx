import { ArrowLeft, Settings } from "lucide-react";
import { useRef, useState } from "react";
import NewTaskForm from "../components/NewTaskForm";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import type { BoardType, ColumnType, TaskType } from "../types";
import ColumnPill from "../components/ColumnPill";
import useGetBoard from "../hooks/useGetBoard";
import { boardColorRamps, boardIcons } from "../lists/boardIconsList";
import useBreakpoints from "../hooks/useBreakpoints";
import Column from "../components/Column";
import NewColumn from "../components/NewColumn";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import useUpdateTask from "../hooks/useUpdateTask";
import { findColumnId } from "../utils/tasks";
import { moveTaskInCache, syncTaskPosition } from "../http/boardCacheUpdates";
import { motion } from "framer-motion";
import { fade } from "../motion/variants";

export default function BoardPage() {
  const { isLg } = useBreakpoints();
  const navigate = useNavigate();
  const { boardId } = useParams();
  const location = useLocation();
  const updateTask = useUpdateTask(Number(boardId));
  const boardQuery = useGetBoard(Number(boardId), location.state);
  const board: BoardType | null = boardQuery.data
    ? boardQuery.data.board
    : null;
  const startDraggingRef = useRef<Partial<TaskType>>(null);
  const [isNewTaskFormOpen, setIsNewTaskFormOpen] = useState(false);
  const [activeColumnId, setActiveColumnId] = useState<UniqueIdentifier | null>(
    null,
  );
  const activeColumn =
    (board &&
      board.columns &&
      board.columns.find((col: ColumnType) => col.id === activeColumnId)) ||
    null;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10, tolerance: 5, delay: 75 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleAddingNewTask(columnId: UniqueIdentifier) {
    setIsNewTaskFormOpen(true);
    setActiveColumnId(columnId);
  }

  function handleDragStart(e: DragStartEvent) {
    if (!board?.columns) return;
    const columnId = findColumnId(board, e.active.id);
    if (!columnId) return;
    startDraggingRef.current = { columnId };
  }

  function handleDragOver(e: DragOverEvent) {
    const { active, over } = e;
    if (!active || !over || !board?.columns) return;

    moveTaskInCache({ board, active, over });
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active } = e;
    if (!active || !board?.columns) return;
    const oldColumnId = startDraggingRef.current?.columnId;
    if (!oldColumnId) return;

    syncTaskPosition({ oldColumnId, active, board, mutate: updateTask.mutate });

    startDraggingRef.current = null;
  }

  const Icon = board ? boardIcons[board.icon] : null;
  const colors = board
    ? boardColorRamps[board.iconColor as keyof typeof boardColorRamps]
    : null;

  if (!board?.columns || !colors || !Icon) return <p>Loading...</p>;

  return (
    <main className="flex flex-col p-1-5">
      {isNewTaskFormOpen && activeColumnId && (
        <NewTaskForm
          columnId={Number(activeColumnId)}
          onClose={() => setIsNewTaskFormOpen(false)}
        />
      )}
      <Outlet />
      <div className=" flex flex-col justify-start items-center gap-1 -mt-3">
        <div
          className={`h-full p-1.5 rounded-lg`}
          style={{ backgroundColor: colors.bg }}
        >
          <Icon style={{ height: "1.5rem" }} color={colors.fg} />
        </div>

        <button
          className="absolute left-3 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <ArrowLeft className="text-text-muted" />
        </button>
        <button
          className="absolute right-3 cursor-pointer"
          onClick={() => navigate("settings")}
        >
          <Settings className="text-text-muted" />
        </button>

        <h2 className="font-bold text-xl mb-2">{board.title}</h2>
      </div>
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
              onNewTask={() => setIsNewTaskFormOpen(true)}
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
