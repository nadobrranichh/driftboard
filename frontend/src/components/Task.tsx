import type { TaskType } from "../types";
import { Circle } from "lucide-react";
import { formatDate } from "../utils/strings";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Task({
  data,
  onSelectTask,
}: {
  data: TaskType;
  onSelectTask: (taskId: number) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `${data.id}-task` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      className={`bg-surface rounded-xl border border-border p-3 cursor-pointer ${isDragging && "z-10 border-primary"}`}
      onClick={() => onSelectTask(data.id)}
    >
      <p className="font-semibold text-lg">{data.title}</p>
      <div className="flex justify-between items-end">
        <p className="text-text-muted">
          {data.dueDate
            ? `Due ${formatDate(new Date(data.dueDate))}`
            : "No deadline set"}
        </p>
        <div>
          <Circle size={20} />
        </div>
      </div>
    </div>
  );
}
