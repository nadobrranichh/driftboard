import { Plus } from "lucide-react";
import Board from "../components/Board";
import NewBoardForm from "../components/NewBoardForm";
import { useState } from "react";

export default function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <main>
      {isFormOpen && <NewBoardForm onClose={() => setIsFormOpen(false)} />}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold">Your boards</h2>
          <p>X boards</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-primary rounded-xl cursor-pointer h-12 w-12 flex items-center justify-center"
        >
          <Plus className="text-surface" />
        </button>
      </div>
      <div className="py-3 flex flex-col gap-3">
        <Board />
        <Board />
        <Board />
      </div>
    </main>
  );
}
