import { fade } from "../motion/variants";
import Backdrop from "./Backdrop";
import { motion } from "framer-motion";
import Button from "./Button";
import { useParams } from "react-router";
import useDeleteBoard from "../hooks/useDeleteBoard";

export default function BoardDeleteForm({
  boardTitle,
  onClose,
}: {
  boardTitle: string;
  onClose: () => void;
}) {
  const { boardId } = useParams();
  const deleteBoardMutation = useDeleteBoard(Number(boardId));

  function handleDeleteBoard() {
    deleteBoardMutation.mutate({ boardId: Number(boardId) });
  }
  return (
    <Backdrop onClick={onClose}>
      <motion.div
        variants={fade({ withStagger: true })}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="bg-surface rounded-xl p-6 flex flex-col gap-3 relative max-w-100"
      >
        <motion.h2 variants={fade()} className="text-xl text-center font-bold">
          Delete {boardTitle}?
        </motion.h2>
        <motion.p variants={fade()}>
          This will permanently delete the board for all members. This cannot be
          undone.
        </motion.p>

        <Button variant="danger" className="py-2" onClick={handleDeleteBoard}>
          Delete {boardTitle}
        </Button>
      </motion.div>
    </Backdrop>
  );
}
