import { Bell } from "lucide-react";
import Button from "./Button";
import { useNotificationsStore } from "../store/useNotificationsStore";
import { motion } from "framer-motion";
import { fade } from "../motion/variants";

export default function Notification({ text }: { text: string }) {
  const { removeNotification } = useNotificationsStore();
  return (
    <motion.div
      variants={fade({ yStart: -40 })}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      className="rounded-xl w-80 shadow-lg overflow-hidden z-100"
    >
      <div className="bg-primary flex gap-2 p-3 items-center">
        <Bell className="text-surface h-5" />
        <p className="text-surface font-semibold">Notification</p>
      </div>
      <div className="bg-surface p-3">
        <p className="text-text mb-3">{text}</p>
        <Button
          variants={fade({ yStart: -10 })}
          className="w-full px-3 py-1 font-normal"
          outlined
          onClick={() => removeNotification(text)}
        >
          Okay
        </Button>
      </div>
    </motion.div>
  );
}
