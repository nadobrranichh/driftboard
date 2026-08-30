import { useSearchParams } from "react-router";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";

export default function AuthPage() {
  const [params] = useSearchParams();
  const mode = params.get("mode") === "signup" ? "signup" : "login";
  return (
    <main className="bg-bg flex justify-center items-center h-screen w-screen">
      {mode === "login" && <LoginForm />}
      {mode === "signup" && <SignupForm />}
    </main>
  );
}
