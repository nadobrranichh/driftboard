import { useState, type SubmitEvent } from "react";
import Backdrop from "./Backdrop";
import InputGroup from "./InputGroup";
import Button from "./Button";
import { validateNewTaskFields } from "../utils/formFieldValidation";
import useCreateTask from "../hooks/useCreateTask";
import { useParams } from "react-router";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { fade } from "../motion/variants";

export default function NewTaskForm({
  columnId,
  onClose,
}: {
  columnId: number;
  onClose: () => void;
}) {
  const { boardId } = useParams();
  const [inputErrors, setInputErrors] = useState<string[]>([]);
  const { mutate, error } = useCreateTask(Number(boardId));
  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const { fields, errors } = validateNewTaskFields(e);
    if (errors.length === 0) {
      mutate({ ...fields, columnId });
      onClose();
    }
    setInputErrors(errors);
  }

  return (
    <Backdrop onClick={onClose}>
      <motion.form
        variants={fade({ withStagger: true })}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="bg-surface rounded-xl border border-border w-80 p-4 flex flex-col gap-4 relative"
      >
        <button
          className="absolute top-4 right-4 cursor-pointer"
          onClick={onClose}
        >
          <X />
        </button>
        {error && (
          <div className="absolute top-1/2 left-1/2 -translate-1/2 shadow-xl p-5 bg-surface rounded-xl border border-danger text-center">
            <h2 className="text-danger font-bold text-xl">Error!</h2>
            {error.error}
          </div>
        )}
        <h2 className="text-center font-bold text-2xl">New Task</h2>
        <InputGroup name="title" />
        <InputGroup name="description" textarea />
        <InputGroup name="due-date" type="date" />
        {inputErrors.length > 0 && (
          <div>
            {inputErrors.map((err) => (
              <p className="text-danger" key={err}>
                {err}
              </p>
            ))}
          </div>
        )}
        <Button className="p-3">Add Task</Button>
      </motion.form>
    </Backdrop>
  );
}
