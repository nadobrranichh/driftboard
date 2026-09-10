import { Link } from "react-router";
import InputGroup from "../InputGroup";
import AuthLayout from "./AuthLayout";
import Button from "../Button";
import type { SyntheticEvent } from "react";

export default function SignupForm({
  onSubmit,
  errors,
}: {
  onSubmit: (e: SyntheticEvent<HTMLFormElement>) => void;
  errors: string[];
}) {
  return (
    <AuthLayout onSubmit={onSubmit}>
      <div className="flex flex-col gap-2">
        <InputGroup name="name" />
        <InputGroup type="email" name="email" />
        <InputGroup name="password" />
        <InputGroup name="repeat-password" />
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

      <Button className="p-2">Sign up</Button>
      <p className="text-center ">
        Already have an account?{" "}
        <Link to="?mode=login" className="underline">
          Log in.
        </Link>
      </p>
    </AuthLayout>
  );
}
