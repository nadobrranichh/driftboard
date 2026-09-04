import { Link } from "react-router";
import InputGroup from "../InputGroup";
import AuthLayout from "./AuthLayout";
import Button from "../Button";
import type { SyntheticEvent } from "react";

export default function LoginForm({
  onSubmit,
  errors,
}: {
  onSubmit: (e: SyntheticEvent<HTMLFormElement>) => void;
  errors: string[];
}) {
  return (
    <AuthLayout onSubmit={onSubmit}>
      <div className="flex flex-col gap-2">
        <InputGroup type="email" name="email" />
        <div>
          <InputGroup name="password" />
          <Link
            to="/forgot-password"
            className="text-primary text-end w-full block text-sm"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      {errors.length > 0 && (
        <div>
          {errors.map((err) => (
            <p className="text-danger" key={err}>
              {err}
            </p>
          ))}
        </div>
      )}

      <Button>Log in</Button>
      <p className="text-center ">
        No account?{" "}
        <Link to="?mode=signup" className="underline">
          Sign up.
        </Link>
      </p>
    </AuthLayout>
  );
}
