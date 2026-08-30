import { Check, Circle, X } from "lucide-react";
import { useState, type MouseEvent } from "react";
import NewTaskForm from "../components/NewTaskForm";
import { Outlet } from "react-router";

const columns = ["To do", "In Progress", "Done"];

const tasks = [
  {
    title: "Design landing page hero",
    deadline: "Sep 2",
  },
  {
    title: "Write launch email copy",
    deadline: "Sep 2",
  },
  {
    title: "Set up analytics tracking",
  },
];

export default function BoardPage() {
  const [activeColumn, setActiveColumn] = useState(columns[0]);
  const [isNewTaskFormOpen, setIsNewTaskFormOpen] = useState(false);
  const [isAddingNewColumn, setIsAddingNewColumn] = useState(false);

  function handleAddColumn(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setIsAddingNewColumn(false);
  }

  function handleCancelAddColumn(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setIsAddingNewColumn(false);
  }
  return (
    <main>
      {isNewTaskFormOpen && (
        <NewTaskForm onClose={() => setIsNewTaskFormOpen(false)} />
      )}
      <Outlet />
      <p className="font-bold text-xl mb-2">Columns</p>
      <div className="flex gap-2 mb-4 flex-wrap">
        {columns.map((col, i) => (
          <div
            key={i}
            className="rounded-3xl border border-border bg-surface py-2 px-4"
            style={{
              backgroundColor:
                activeColumn === col
                  ? "var(--color-primary)"
                  : "var(--color-surface)",
              color: activeColumn === col ? "var(--color-surface)" : "black",
            }}
            onClick={() => setActiveColumn(col)}
          >
            {col} &bull; X
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
      <p className="font-bold text-xl mb-2">Tasks in {activeColumn} column</p>
      <div className="flex flex-col gap-2">
        {tasks.map((task, i) => (
          <div
            key={i}
            className="bg-surface rounded-xl border border-border p-3"
          >
            <p className="font-semibold text-lg">{task.title}</p>
            <div className="flex justify-between items-end">
              <p className="text-text-muted">
                {task.deadline ? task.deadline : "No deadline set"}
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
    </main>
  );
}
