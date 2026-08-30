import { Circle, Square, Trash, X } from "lucide-react";
import Button from "./Button";
import Backdrop from "./Backdrop";
import { useNavigate } from "react-router";

export default function TaskDetail() {
  const subtextStyles = "text-text-muted text-md";
  const navigate = useNavigate();
  return (
    <Backdrop onClick={() => navigate("..")}>
      <div className="w-9/10 md:w-1/2 bg-surface rounded-xl p-6 flex flex-col gap-4">
        <div className="flex justify-between mb-2">
          <div className="flex gap-2">
            <Square /> <p>In progress</p>
          </div>
          <div className="flex gap-5">
            <Trash />
            <X />
          </div>
        </div>
        <h2 className="text-2xl font-semibold">TASK TITLE GOES HERE</h2>
        <div className="flex justify-between">
          <p className={subtextStyles}>Assignee</p>{" "}
          <p className="flex gap-2">
            <Circle /> Someone S.
          </p>
        </div>
        <div className="flex justify-between">
          <p className={subtextStyles}>Due date</p> <p>July 30th</p>
        </div>
        <div>
          <p className={subtextStyles}>Description</p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Perspiciatis, aliquid fugit velit odio saepe error ducimus, et porro
            qui est quis? Odio eius quod at incidunt doloribus harum perferendis
            maxime.
          </p>
        </div>
        <Button>Move to column</Button>
      </div>
    </Backdrop>
  );
}
