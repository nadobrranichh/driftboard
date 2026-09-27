import { ChevronRight } from "lucide-react";
import type { BoardType, TaskType } from "../types";
import { boardColorRamps, boardIcons } from "../lists/boardIconsList";
import { isSingular } from "../utils/strings";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { fade } from "../motion/variants";
import { hoverScale, tapScale } from "../motion/value-presets";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { addTaskInCache } from "../utils/query-cache/tasks";

export default function Board({ data }: { data: BoardType }) {
  const { socket } = useAuthStore();
  const navigate = useNavigate();
  const Icon = boardIcons[data.icon];
  const colors =
    boardColorRamps[data.iconColor as keyof typeof boardColorRamps];

  useEffect(() => {
    if (!socket) return;
    function handleUpdateCache({
      task,
      boardId,
    }: {
      task: TaskType;
      boardId: number;
    }) {
      if (data.id === boardId) addTaskInCache({ task, boardId });
    }
    socket.on("task-added", handleUpdateCache);

    return () => {
      socket.off("task-added", handleUpdateCache);
    };
  }, [socket]);

  function handleClick() {
    if (!socket) return;
    socket.emit("open-board", { boardId: data.id });
    navigate(`/board/${data.id}`);
  }

  return (
    <motion.div
      variants={fade()}
      whileHover={hoverScale}
      whileTap={tapScale}
      className="flex gap-3 p-4 bg-surface rounded-lg border border-border min-h-20 cursor-pointer"
      onClick={handleClick}
    >
      <div
        className={`h-full p-3 rounded-lg`}
        style={{ backgroundColor: colors.bg }}
      >
        <Icon color={colors.fg} />
      </div>
      <div>
        <p className="font-semibold">{data.title}</p>
        <p className="text-text-muted text-sm">
          {data.taskCount} task{!isSingular(data.taskCount!) && "s"}
        </p>
      </div>
      <ChevronRight className="ml-auto my-auto" />
    </motion.div>
  );
}
