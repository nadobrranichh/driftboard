import { Plus } from "lucide-react";
import Board from "../components/Board";
import NewBoardForm from "../components/NewBoardForm";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBoards } from "../http/boards";
import type { BoardType } from "../types";
import { isSingular } from "../utils/strings";

export default function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const boardsQuery = useQuery({ queryKey: ["boards"], queryFn: getBoards });
  const boards = boardsQuery.data ? boardsQuery.data.boards : [];

  return (
    <main>
      {isFormOpen && <NewBoardForm onClose={() => setIsFormOpen(false)} />}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold">Your boards</h2>
          <p>
            {boards.length} board{!isSingular(boards.length) && "s"}
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-primary rounded-xl cursor-pointer h-12 w-12 flex items-center justify-center"
        >
          <Plus className="text-surface" />
        </button>
      </div>
      <div className="py-3 flex flex-col gap-3">
        {boards &&
          boards.map((board: BoardType) => (
            <Board key={board.id} data={board} />
          ))}
      </div>
    </main>
  );
}
