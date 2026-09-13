import type { TaskType } from "../types";
import { Circle } from "lucide-react";
import { formatDate } from "../utils/strings";
import { useNavigate } from "react-router";

export default function Task({ data }: { data: TaskType }) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-surface rounded-xl border border-border p-3 cursor-pointer"
      onClick={() => navigate(`task/${data.id}`)}
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
