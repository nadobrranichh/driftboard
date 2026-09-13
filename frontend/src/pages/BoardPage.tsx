import { ArrowLeft, Settings } from "lucide-react";
import { useState } from "react";
import NewTaskForm from "../components/NewTaskForm";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import type { ColumnType } from "../types";
import ColumnPill from "../components/ColumnPill";
import useGetBoard from "../hooks/useGetBoard";
import { boardColorRamps, boardIcons } from "../lists/boardIconsList";
import useBreakpoints from "../hooks/useBreakpoints";
import Column from "../components/Column";
import NewColumn from "../components/NewColumn";

export default function BoardPage() {
  const { isLg } = useBreakpoints();
  const navigate = useNavigate();
  const [isNewTaskFormOpen, setIsNewTaskFormOpen] = useState(false);
  const { boardId } = useParams();
  const location = useLocation();
  const boardQuery = useGetBoard(Number(boardId), location.state);
  const board = boardQuery.data ? boardQuery.data.board : null;
  const [activeColumnId, setActiveColumnId] = useState(-1);
  const activeColumn = board
    ? board.columns.find((col: ColumnType) => col.id === activeColumnId)
    : null;

  const Icon = board ? boardIcons[board.icon] : null;
  const colors = board
    ? boardColorRamps[board.iconColor as keyof typeof boardColorRamps]
    : null;

  if (!board || !colors || !Icon) return <p>Loading...</p>;

  return (
    <main className="flex flex-col p-1-5">
      {isNewTaskFormOpen && (
        <NewTaskForm
          columnId={activeColumnId}
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
        <div className="flex-1 flex gap-5 h-full overflow-x-auto">
          {board &&
            board.columns.map((col: ColumnType) => (
              <Column
                data={col}
                key={col.id}
                onNewTask={() => setIsNewTaskFormOpen(true)}
              />
            ))}
          <NewColumn />
        </div>
      ) : (
        <>
          <p className="font-semibold text-xl mb-2">Columns</p>
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
