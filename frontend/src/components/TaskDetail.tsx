import { Trash, X } from "lucide-react";
import Button from "./Button";
import Backdrop from "./Backdrop";
import { useParams } from "react-router";
import { formatDate } from "../utils/strings";
import { useEffect, useState, type SyntheticEvent } from "react";
import type { ColumnType, TaskType, User } from "../types";
import useGetBoard from "../hooks/useGetBoard";
import { validateEditTaskFields } from "../utils/formFieldValidation";
import useUpdateTask from "../hooks/useUpdateTask";
import { motion } from "motion/react";
import { fade } from "../motion/variants";

export default function TaskDetail({
  taskId,
  onClose,
}: {
  taskId: number;
  onClose: () => void;
}) {
  const { boardId } = useParams();
  const updateTaskMutation = useUpdateTask(Number(boardId));
  const boardQuery = useGetBoard(Number(boardId));
  const board = boardQuery.data ? boardQuery.data.board : null;
  const task =
    board &&
    board.columns
      .flatMap((col: ColumnType) => col.tasks)
      .find((t: TaskType) => t.id === taskId);
  const taskColumn =
    board &&
    task &&
    board.columns.find((col: ColumnType) => col.id === task.columnId);

  const [isEditing, setIsEditing] = useState(false);
  const [inputErrors, setInputErrors] = useState<string[]>([]);
  const [fieldsData, setFieldsData] = useState<TaskType>(task);

  useEffect(() => {
    setFieldsData(task);
    console.log(task);
  }, [task]);

  const toggleIsEditing = () => setIsEditing((prev) => !prev);

  function updateField(field: keyof TaskType, value: string | number | null) {
    setFieldsData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!fieldsData || !task) return;
    const { fields, errors } = validateEditTaskFields(fieldsData);

    if (errors.length > 0) {
      setInputErrors(errors);
      return;
    }
    if (
      fields.title === task.title &&
      fields.dueDate === task.dueDate &&
      fields.assigneeId === task.assigneeId &&
      fields.description === task.description &&
      fields.columnId === task.columnId
    ) {
      setIsEditing(false);
      return;
    }

    setInputErrors([]);
    setIsEditing(false);
    updateTaskMutation.mutate({
      id: fieldsData.id,
      newFields: fields,
      oldColumnId: task.columnId,
    });
  }

  if (!task || !board || !fieldsData)
    return (
      <Backdrop onClick={onClose}>
        <p className="text-surface">Loading...</p>
      </Backdrop>
    );

  return (
    <Backdrop onClick={onClose}>
      <motion.form
        variants={fade({ withStagger: true })}
        initial="hidden"
        animate="visible"
        exit="exit"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-9/10 md:w-120 bg-surface rounded-xl p-6 flex flex-col gap-3"
      >
        <motion.div variants={fade()} className="flex justify-between mb-2">
          <p className="text-text-muted">Task #{task.id}</p>
          <div className="flex gap-5">
            <Trash className="cursor-pointer" />
            <X className="cursor-pointer" onClick={onClose} />
          </div>
        </motion.div>
        <motion.div variants={fade()}>
          {isEditing ? (
            <input
              name="title"
              className="px-1 text-2xl font-semibold rounded-xl border border-text"
              value={fieldsData.title}
              onChange={(e) => updateField("title", e.target.value)}
            />
          ) : (
            <h2 className="text-2xl font-semibold">{fieldsData.title}</h2>
          )}
        </motion.div>

        <motion.div variants={fade()} className="flex justify-between">
          <p className="text-text-muted text-md">Assignee</p>
          {isEditing ? (
            <select
              value={fieldsData?.assigneeId ?? ""}
              onChange={(e) =>
                updateField(
                  "assigneeId",
                  e.target.value === "" ? null : Number(e.target.value),
                )
              }
              className="border border-text rounded-lg px-1"
            >
              <option value={""}>No assignee</option>
              {board?.members &&
                board.members.map((m: User) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
            </select>
          ) : (
            <p className="flex gap-2">
              {board.members.find((m: User) => m.id === fieldsData?.assigneeId)
                ?.name ?? "Not assigned"}
            </p>
          )}
        </motion.div>

        <motion.div variants={fade()} className="flex justify-between">
          <p className="text-text-muted text-md">Due date</p>
          {isEditing ? (
            <input
              type="date"
              value={
                fieldsData?.dueDate ? fieldsData?.dueDate.slice(0, 10) : ""
              }
              className="border border-text rounded-lg px-1"
              onChange={(e) => updateField("dueDate", e.target.value)}
            />
          ) : (
            <p>
              {fieldsData?.dueDate
                ? formatDate(new Date(fieldsData?.dueDate))
                : "No deadline set"}
            </p>
          )}
        </motion.div>

        <motion.div variants={fade()} className="flex justify-between">
          <p className="text-text-muted text-md">Column</p>
          {isEditing ? (
            <select
              className="border border-text rounded-lg px-1"
              value={fieldsData?.columnId}
              onChange={(e) => updateField("columnId", Number(e.target.value))}
            >
              {board?.columns.map((col: ColumnType) => (
                <option key={col.id} value={col.id}>
                  {col.title}
                </option>
              ))}
            </select>
          ) : (
            <p>{taskColumn.title}</p>
          )}
        </motion.div>
        <motion.div variants={fade()}>
          <p className="text-text-muted text-md">Description</p>
          {isEditing ? (
            <textarea
              name="description"
              value={fieldsData?.description}
              rows={3}
              className="rounded-xl border border-text px-1 w-full"
              onChange={(e) => updateField("description", e.target.value)}
            ></textarea>
          ) : (
            <p className="text-balance">{fieldsData?.description}</p>
          )}
        </motion.div>
        {inputErrors.length > 0 && (
          <div>
            {inputErrors.map((err) => (
              <p className="text-danger" key={err}>
                {err}
              </p>
            ))}
          </div>
        )}
        {isEditing ? (
          <div className="grid grid-cols-2 gap-2">
            <Button
              className="p-2"
              type="button"
              onClick={() => {
                setFieldsData({ ...task });
                toggleIsEditing();
              }}
            >
              Cancel Edit
            </Button>
            <Button className="p-2">Submit Edit</Button>
          </div>
        ) : (
          <Button className="p-2" type="button" onClick={toggleIsEditing}>
            Edit
          </Button>
        )}
      </motion.form>
    </Backdrop>
  );
}
