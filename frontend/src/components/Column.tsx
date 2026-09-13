import type { ColumnType, TaskType } from "../types";
import Task from "./Task";

export default function Column({
  data,
  onNewTask,
}: {
  data: ColumnType;
  onNewTask: () => void;
}) {
  return (
    <div className="bg-border lg:w-80 p-3 rounded-xl shrink-0">
      <p className="text-center mb-3 font-semibold">{data.title}</p>
      <div className="flex flex-col gap-3">
        {data.tasks?.map((task: TaskType) => (
          <Task data={task} key={task.id} />
        ))}
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
