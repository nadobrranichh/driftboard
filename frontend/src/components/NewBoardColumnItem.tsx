import { Check, Pencil, X } from "lucide-react";
import { useState } from "react";

export default function NewBoardColumnItem({
  name,
  changeColumnName,
  deleteColumn,
}: {
  name: string;
  changeColumnName: (newName: string) => void;
  deleteColumn: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [nameBeforeSubmit, setNameBeforeSubmit] = useState(name);

  return (
    <div className="bg-text rounded-md flex justify-between items-center p-1.5">
      {isEditing ? (
        <input
          value={nameBeforeSubmit}
          onChange={(e) => setNameBeforeSubmit(e.target.value)}
          className="border border-surface rounded-md text-surface px-1"
        />
      ) : (
        <p className="text-surface">{name}</p>
      )}
      <div className="flex items-center gap-1">
        {isEditing ? (
          <Check
            size={20}
            className="text-surface cursor-pointer"
            onClick={() => {
              setIsEditing(false);
              changeColumnName(nameBeforeSubmit);
            }}
          />
        ) : (
          <Pencil
            size={20}
            className="text-surface cursor-pointer"
            onClick={() => setIsEditing(true)}
          />
        )}
        <X
          size={23}
          className="text-surface cursor-pointer"
          onClick={deleteColumn}
        />
      </div>
    </div>
  );
}
