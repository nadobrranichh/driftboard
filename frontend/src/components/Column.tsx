import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { ColumnType, TaskType } from "../types";
import Task from "./Task";
import { useDroppable } from "@dnd-kit/core";

export default function Column({
  data,
  onNewTask,
}: {
  data: ColumnType;
  onNewTask: () => void;
}) {
  const { setNodeRef } = useDroppable({ id: `${data.id}-column` });
  return (
    <div ref={setNodeRef} className="bg-border lg:w-80 p-3 rounded-xl shrink-0">
      <p className="text-center mb-3 font-semibold">{data.title}</p>
      <div className="flex flex-col gap-3">
        <SortableContext
          items={data.tasks?.map((t) => `${t.id}-task`) || []}
          strategy={verticalListSortingStrategy}
        >
          {data.tasks?.map((task: TaskType) => (
            <Task data={task} key={task.id} />
          ))}
        </SortableContext>
        <div
          className="border border-text-muted p-5 rounded-xl cursor-pointer"
          onClick={onNewTask}
        >
          <p className="text-center text-text-muted">+ New Task</p>
        </div>
      </div>
    </div>
  );
}
