import { Link } from "react-router";
import InputGroup from "../InputGroup";
import AuthLayout from "./AuthLayout";

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

      <button className="bg-primary text-surface rounded-md px-2 py-2">
        Log in
      </button>
      <p className="text-center ">
        No account?{" "}
        <Link to="?mode=signup" className="underline">
          Sign up.
        </Link>
      </p>
    </AuthLayout>
  );
}
