import type { SubmitEvent } from "react";
import Backdrop from "./Backdrop";
import InputGroup from "./InputGroup";

export default function NewTaskForm({ onClose }: { onClose: () => void }) {
  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e);
    // const fd = new FormData(e.target);
  }

  return (
    <Backdrop onClick={onClose}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="bg-surface rounded-xl border border-border w-80 p-4 flex flex-col gap-4"
      >
        <h2 className="text-center font-bold text-2xl">New Task</h2>
        <InputGroup name="title" />
        <InputGroup name="description" textarea />
        <InputGroup name="due-date" type="date" />
        <button className="bg-primary p-3 text-surface rounded-lg">
          Add Task
        </button>
      </form>
    </Backdrop>
  );
}
