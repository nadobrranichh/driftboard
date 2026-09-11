import { ArrowLeft, Check, Settings, X } from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";
import NewTaskForm from "../components/NewTaskForm";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import type { ColumnType, TaskType } from "../types";
import Task from "../components/Task";
import ColumnPill from "../components/ColumnPill";
import useCreateColumn from "../hooks/useCreateColumn";
import useGetBoard from "../hooks/useGetBoard";
import { boardColorRamps, boardIcons } from "../lists/boardIconsList";

export default function BoardPage() {
  const navigate = useNavigate();
  const [isNewTaskFormOpen, setIsNewTaskFormOpen] = useState(false);
  const [isAddingNewColumn, setIsAddingNewColumn] = useState(false);
  const newColumnRef = useRef<HTMLInputElement>(null);
  const { boardId } = useParams();
  const location = useLocation();
  const boardQuery = useGetBoard(Number(boardId), location.state);
  const createColumn = useCreateColumn(Number(boardId));
  const board = boardQuery.data ? boardQuery.data.board : null;
  const [activeColumnId, setActiveColumnId] = useState(-1);
  const activeColumn = board
    ? board.columns.find((col: ColumnType) => col.id === activeColumnId)
    : null;

  const Icon = board ? boardIcons[board.icon] : null;
  const colors = board
    ? boardColorRamps[board.iconColor as keyof typeof boardColorRamps]
    : null;

  function handleAddColumn(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (!newColumnRef.current) return;
    const title = newColumnRef.current.value;
    if (!title || title.trim().length === 0) return;
    createColumn.mutate({ title, boardId: Number(boardId) });
    newColumnRef.current.value = "";
    setIsAddingNewColumn(false);
  }

  function handleCancelAddColumn(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setIsAddingNewColumn(false);
  }

  if (!board || !colors || !Icon) return <p>Loading...</p>;

  return (
    <main className="flex flex-col">
      {isNewTaskFormOpen && (
        <NewTaskForm
          columnId={activeColumnId}
          onClose={() => setIsNewTaskFormOpen(false)}
        />
      )}
      <Outlet />
      <div className="relative flex flex-col justify-center items-center gap-1 -mt-3">
        <div
          className={`h-full p-1.5 rounded-lg`}
          style={{ backgroundColor: colors.bg }}
        >
          <Icon style={{ height: "1.5rem" }} color={colors.fg} />
        </div>

        <button
          className="absolute top-0 left-0.5"
          onClick={() => navigate("/home")}
        >
          <ArrowLeft className="text-text-muted" />
        </button>
        <button
          className="absolute top-0 right-0.5"
          onClick={() => navigate("settings")}
        >
          <Settings className="text-text-muted" />
        </button>

        <h2 className="font-bold text-xl mb-2">{board.title}</h2>
      </div>
      <p className="font-bold text-xl mb-2">Columns</p>
      <div className="flex gap-2 mb-4 flex-wrap">
        {board &&
          board.columns.map((col: ColumnType) => (
            <ColumnPill
              key={col.id}
              data={col}
              handleClick={() => setActiveColumnId(col.id)}
              activeColumnId={activeColumnId}
            />
          ))}
        <div
          onClick={() => setIsAddingNewColumn(true)}
          className="rounded-3xl border border-border py-2 px-4 flex gap-2"
        >
          {isAddingNewColumn ? (
            <>
              <input
                ref={newColumnRef}
                className="border border-border rounded-xl px-3 w-33"
              />
              <button
                className="cursor-pointer"
                onClick={(e) => handleAddColumn(e)}
              >
                <Check />
              </button>
              <button
                className="cursor-pointer"
                onClick={handleCancelAddColumn}
              >
                <X />
              </button>
            </>
          ) : (
            "+ Add"
          )}
        </div>
      </div>

      {activeColumn ? (
        <>
          <p className="font-bold text-xl mb-2">
            Tasks in {activeColumn.title} column:
          </p>
          <div className="flex flex-col gap-2">
            {activeColumn.tasks.map((task: TaskType) => (
              <Task key={task.id} data={{ ...task, column: activeColumn }} />
            ))}
            <div
              className="border border-border p-5 rounded-xl"
              onClick={() => setIsNewTaskFormOpen(true)}
            >
              <p className="text-center text-text-muted">+ New Task</p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <h2 className="font-bold text-xl text-text-muted">
            select a column to see tasks
          </h2>
        </div>
      )}
    </main>
  );
}
