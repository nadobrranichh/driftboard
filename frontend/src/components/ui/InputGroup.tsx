import {
  type InputHTMLAttributes,
  type ReactNode,
  type RefObject,
} from "react";
import { motion } from "framer-motion";
import { fade } from "../../motion/variants";

const textSizeClasses = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

function createLabelText(name: string) {
  return name[0].toUpperCase() + name.slice(1).replaceAll("-", " ");
}

function getDates() {
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return {
    min: minDate.toISOString().split("T")[0],
    max: maxDate.toISOString().split("T")[0],
  };
}

export type InputGroupProps = {
  name: string;
  type?: string;
  textSize?: keyof typeof textSizeClasses;
  textarea?: boolean;
  labelAction?: ReactNode;
  ref?: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
} & InputHTMLAttributes<HTMLInputElement> &
  InputHTMLAttributes<HTMLTextAreaElement>;

export default function InputGroup({
  name,
  type = "text",
  textSize = "sm",
  textarea = false,
  labelAction,
  ref,
  ...props
}: InputGroupProps) {
  return (
    <motion.div variants={fade()}>
      <div className="flex justify-between">
        <label htmlFor={name} className={textSizeClasses[textSize]}>
          {createLabelText(name)}
        </label>
        {labelAction}
      </div>
      {textarea ? (
        <textarea
          name={name}
          id={name}
          className="block bg-text rounded-md text-surface px-2 py-2 w-full"
          rows={3}
          ref={ref as RefObject<HTMLTextAreaElement>}
          {...props}
        ></textarea>
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          className="block bg-text rounded-md text-surface px-2 py-2 w-full"
          ref={ref as RefObject<HTMLInputElement>}
          {...(type === "date" && getDates())}
          {...props}
        />
      )}
    </motion.div>
  );
}
