import { Link } from "react-router";
import InputGroup from "../InputGroup";
import AuthLayout from "./AuthLayout";
import Button from "../Button";

export default function LoginForm() {
  return (
    <AuthLayout>
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
