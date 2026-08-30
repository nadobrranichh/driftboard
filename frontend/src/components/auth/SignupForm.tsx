import { Link } from "react-router";
import InputGroup from "../InputGroup";
import AuthLayout from "./AuthLayout";
import Button from "../Button";

export default function SignupForm() {
  return (
    <AuthLayout>
      <div className="flex flex-col gap-2">
        <InputGroup name="name" />
        <InputGroup type="email" name="email" />
        <InputGroup name="password" />
        <InputGroup name="repeat-password" />
      </div>
      <Button>Sign up</Button>

      <p className="text-center ">
        Already have an account?{" "}
        <Link to="?mode=login" className="underline">
          Log in.
        </Link>
      </p>
    </AuthLayout>
  );
}
