import { Plus } from "lucide-react";
import Board from "../components/Board";
import NewBoardForm from "../components/NewBoardForm";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBoards } from "../http/boards";
import type { BoardType } from "../types";
import { isSingular } from "../utils/strings";
import { motion } from "framer-motion";
import { fade } from "../motion/variants";
import { hoverScale, tapScale } from "../motion/value-presets";

export default function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const boardsQuery = useQuery({ queryKey: ["boards"], queryFn: getBoards });
  const boards = boardsQuery.data ? boardsQuery.data.boards : [];

  return (
    <main>
      {isFormOpen && <NewBoardForm onClose={() => setIsFormOpen(false)} />}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold">Your boards</h2>
          <p>
            {boards.length} board{!isSingular(boards.length) && "s"}
          </p>
        </div>
        <motion.button
          whileHover={hoverScale}
          whileTap={tapScale}
          onClick={() => setIsFormOpen(true)}
          className="bg-primary rounded-xl cursor-pointer h-12 w-12 flex items-center justify-center"
        >
          <Plus className="text-surface" />
        </motion.button>
      </div>
      <motion.div
        variants={fade({ withStagger: true })}
        initial="hidden"
        animate="visible"
        className="py-3 flex flex-col lg:grid lg:grid-cols-3 gap-3"
      >
        {boards &&
          boards.map((board: BoardType) => (
            <Board key={board.id} data={board} />
          ))}
        <motion.div
          variants={fade()}
          whileHover={hoverScale}
          whileTap={tapScale}
          className="flex flex-col p-4 items-center justify-center rounded-lg border border-border bg-surface min-h-20 cursor-pointer"
          onClick={() => setIsFormOpen(true)}
        >
          <Plus className="text-text-muted" />
          <p className="font-semibold text-text-muted">Create a new board</p>
        </motion.div>
      </motion.div>
    </main>
  );
}
