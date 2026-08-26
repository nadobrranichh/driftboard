import { Plus } from "lucide-react";
import InputGroup from "./InputGroup";
import NewBoardColumnItem from "./NewBoardColumnItem";
import { boardColorRamps, boardIconsList } from "../lists/boardIconsList";

export default function NewBoardForm({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      className="absolute h-full w-full top-0 left-0 flex justify-center items-center bg-text/20"
    >
      <form className="bg-surface rounded-xl border border-border w-80 p-4 flex flex-col gap-4">
        <h2 className="text-center font-bold text-2xl">New Board</h2>
        <InputGroup name="board-name" textSize="base" />
        <div>
          <div className="flex justify-between items-center mb-1">
            <p>Columns</p>
            <button className="bg-primary rounded-lg cursor-pointer h-8 w-8 flex items-center justify-center">
              <Plus className="text-surface" />
            </button>
          </div>
          <div className="bg-bg border border-border p-2 flex flex-col gap-2 rounded-md">
            <NewBoardColumnItem />
            <NewBoardColumnItem />
            <NewBoardColumnItem />
          </div>
        </div>
        <div>
          <p>Icon</p>
          <div className="flex justify-between">
            {boardIconsList.map((icon, index) => (
              <div
                key={index}
                className="p-2 rounded-md"
                style={{ backgroundColor: boardColorRamps[icon.color].bg }}
              >
                <icon.icon style={{ color: boardColorRamps[icon.color].fg }} />
              </div>
            ))}
          </div>
        </div>

        <button className="bg-primary p-3 text-surface rounded-lg">
          Create Board
        </button>
      </form>
    </div>
  );
}
