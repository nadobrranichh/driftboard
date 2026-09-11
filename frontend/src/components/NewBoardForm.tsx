import { Plus } from "lucide-react";
import InputGroup from "./InputGroup";
import NewBoardColumnItem from "./NewBoardColumnItem";
import Backdrop from "./Backdrop";
import { useState, type SyntheticEvent } from "react";
import Button from "./Button";
import useCreateBoard from "../hooks/useCreateBoard";
import IconAndColorPicker from "./IconAndColorPicker";

const MAX_COLUMNS = 5;

export default function NewBoardForm({ onClose }: { onClose: () => void }) {
  const createBoard = useCreateBoard();
  const [iconValues, setIconValues] = useState({ icon: "", iconColor: "" });
  const [inputErrors, setInputErrors] = useState<string[]>([]);
  const [columns, setColumns] = useState<string[]>([
    "To do",
    "In progress",
    "Done",
  ]);

  function updateIconValue(field: string, value: string) {
    setIconValues((prev) => ({ ...prev, [field]: value }));
  }

  function changeColumnName(index: number, newName: string) {
    setColumns((prev) => {
      const newColumns = [...prev];
      newColumns[index] = newName;
      return newColumns;
    });
  }

  function deleteColumn(index: number) {
    setColumns((prev) => {
      const newColumns = [...prev.slice(0, index), ...prev.slice(index + 1)];
      return newColumns;
    });
  }

  function addColumn() {
    setColumns((prev) =>
      prev.length >= MAX_COLUMNS ? prev : [...prev, "New Column"],
    );
  }

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const errors = [];
    const boardName = String(formData.get("board-name"));
    if (!boardName || boardName.trim().length < 1)
      errors.push("Board name is not provided");
    if (columns.length < 1) errors.push("There must be at least one column");
    if (iconValues.icon === "") errors.push("Board icon isn't selected");
    if (iconValues.iconColor === "") errors.push("Icon color isn't selected");

    if (errors.length > 0) {
      setInputErrors(errors);
      return;
    }

    setInputErrors([]);
    createBoard.mutate({
      title: boardName,
      columns,
      ...iconValues,
    });
    onClose();
  }

  return (
    <Backdrop onClick={onClose}>
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-surface rounded-xl border border-border w-80 p-4 flex flex-col gap-4"
      >
        <h2 className="text-center font-bold text-2xl">New Board</h2>
        <InputGroup name="board-name" textSize="base" />
        <div>
          <div className="flex justify-between items-center mb-1">
            <p>Columns</p>
            <Button type="button" className="p-1" onClick={addColumn}>
              <Plus className="text-surface" />
            </Button>
          </div>
          <div className="bg-bg border border-text p-2 flex flex-col gap-2 rounded-md">
            {columns.map((col, i) => (
              <NewBoardColumnItem
                key={i}
                name={col}
                changeColumnName={changeColumnName.bind(null, i)}
                deleteColumn={deleteColumn.bind(null, i)}
              />
            ))}
          </div>
        </div>
        <IconAndColorPicker
          icon={iconValues.icon}
          iconColor={iconValues.iconColor}
          onChange={updateIconValue}
        />
        {inputErrors.length > 0 && (
          <div>
            {inputErrors.map((err) => (
              <p key={err} className="text-danger">
                {err}
              </p>
            ))}
          </div>
        )}

        <Button className="p-3">Create Board</Button>
      </form>
    </Backdrop>
  );
}
