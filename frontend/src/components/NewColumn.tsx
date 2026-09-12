import { Check, X } from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";
import useCreateColumn from "../hooks/useCreateColumn";
import { useParams } from "react-router";

export default function NewColumn() {
  const { boardId } = useParams();
  const createColumn = useCreateColumn(Number(boardId));
  const [isAddingNewColumn, setIsAddingNewColumn] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleCancel(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (inputRef.current) inputRef.current.value = "";
    setIsAddingNewColumn(false);
  }

  function handleAddColumn(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (!inputRef.current) return;
    const title = inputRef.current.value;
    if (!title || title.trim().length === 0) return;
    createColumn.mutate({ title, boardId: Number(boardId) });
    inputRef.current.value = "";
    setIsAddingNewColumn(false);
  }

  return (
    <div
      onClick={() => setIsAddingNewColumn(true)}
      className="rounded-3xl border border-border hover:border-primary items-start justify-center flex gap-2 py-2 px-4 cursor-pointer shrink-0 lg:w-80 lg:p-3 lg:rounded-xl "
    >
      {isAddingNewColumn ? (
        <>
          <input
            ref={inputRef}
            className="border border-border rounded-xl px-3 w-33"
          />
          <button className="cursor-pointer" onClick={handleAddColumn}>
            <Check />
          </button>
          <button className="cursor-pointer" onClick={handleCancel}>
            <X />
          </button>
        </>
      ) : (
        <button>+ Add</button>
      )}
    </div>
  );
}
