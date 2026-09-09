import type { InputHTMLAttributes } from "react";

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

type InputGroupProps = {
  name: string;
  type?: string;
  textSize?: keyof typeof textSizeClasses;
  textarea?: boolean;
} & InputHTMLAttributes<HTMLInputElement> &
  InputHTMLAttributes<HTMLTextAreaElement>;

export default function InputGroup({
  name,
  type = "text",
  textSize = "sm",
  textarea = false,
  ...props
}: InputGroupProps) {
  return (
    <div>
      <label htmlFor={name} className={textSizeClasses[textSize]}>
        {createLabelText(name)}
      </label>
      {textarea ? (
        <textarea
          name={name}
          id={name}
          className="block bg-text rounded-md text-surface px-2 py-2 w-full"
          rows={3}
          {...props}
        ></textarea>
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          className="block bg-text rounded-md text-surface px-2 py-2 w-full"
          {...(type === "date" && getDates())}
          {...props}
        />
      )}
    </div>
  );
}
