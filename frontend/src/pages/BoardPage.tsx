import { Check, Circle, X } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";
import NewTaskForm from "../components/NewTaskForm";
import { Outlet, useLocation, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getBoard } from "../http/boards";
import type { ColumnType, TaskType } from "../types";
import { formatDate } from "../utils/strings";

export default function BoardPage() {
  const [isNewTaskFormOpen, setIsNewTaskFormOpen] = useState(false);
  const [isAddingNewColumn, setIsAddingNewColumn] = useState(false);
  const { boardId } = useParams();
  const location = useLocation();
  const boardQuery = useQuery({
    queryKey: ["boards", Number(boardId)],
    queryFn: () => getBoard(Number(boardId)),
    initialData: location.state || null,
  });
  const board = boardQuery.data ? boardQuery.data.board : null;
  const [activeColumnId, setActiveColumnId] = useState(-1);
  const activeColumn = board
    ? board.columns.find((col: ColumnType) => col.id === activeColumnId)
    : null;

  function handleAddColumn(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setIsAddingNewColumn(false);
  }

  function handleCancelAddColumn(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setIsAddingNewColumn(false);
  }
  return (
    <main className="flex flex-col">
      {isNewTaskFormOpen && (
        <NewTaskForm
          columnId={activeColumnId}
          onClose={() => setIsNewTaskFormOpen(false)}
        />
      )}
      <Outlet />
      <p className="font-bold text-xl mb-2">Columns</p>
      <div className="flex gap-2 mb-4 flex-wrap">
        {board &&
          board.columns.map((col: ColumnType, i: number) => (
            <div
              key={i}
              className="rounded-3xl border border-border bg-surface py-2 px-4"
              style={{
                backgroundColor:
                  activeColumnId === col.id
                    ? "var(--color-primary)"
                    : "var(--color-surface)",
                color:
                  activeColumnId === col.id ? "var(--color-surface)" : "black",
              }}
              onClick={() => setActiveColumnId(col.id)}
            >
              {col.title} &bull; {col.tasks!.length}
            </div>
          ))}
        <div
          onClick={() => setIsAddingNewColumn(true)}
          className="rounded-3xl border border-border py-2 px-4 flex gap-2"
        >
          {isAddingNewColumn ? (
            <>
              <input
                name="new-column"
                className="border border-border rounded-lg px-2 w-35"
              />
              <button className="cursor-pointer" onClick={handleAddColumn}>
                <Check />
              </button>{" "}
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
            Tasks in {activeColumn.title} column
          </p>
          <div className="flex flex-col gap-2">
            {activeColumn.tasks.map((task: TaskType, i: number) => (
              <div
                key={i}
                className="bg-surface rounded-xl border border-border p-3"
              >
                <p className="font-semibold text-lg">{task.title}</p>
                <div className="flex justify-between items-end">
                  <p className="text-text-muted">
                    {task.dueDate
                      ? `Due ${formatDate(new Date(task.dueDate))}`
                      : "No deadline set"}
                  </p>
                  <div>
                    <Circle size={20} />
                  </div>
                </div>
              </div>
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
