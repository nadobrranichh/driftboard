import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import InputGroup, { type InputGroupProps } from "./InputGroup";

type PasswordInputGroupProps = Omit<
  InputGroupProps,
  "type" | "textarea" | "labelaAction"
>;

export default function PasswordInputGroup(props: PasswordInputGroupProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <InputGroup
      {...props}
      type={showPassword ? "text" : "password"}
      labelAction={
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeClosed height={20} /> : <Eye height={20} />}
        </button>
      }
    />
  );
}
