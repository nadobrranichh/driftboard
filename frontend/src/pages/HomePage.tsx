import { Plus } from "lucide-react";
import Board from "../components/Board";

export default function HomePage() {
  return (
    <main>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold">Your boards</h2>
          <p>X boards</p>
        </div>
        <button className="bg-primary rounded-xl cursor-pointer h-12 w-12 flex items-center justify-center">
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
