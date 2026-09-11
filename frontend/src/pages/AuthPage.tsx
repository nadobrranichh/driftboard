import { useSearchParams } from "react-router";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import { useEffect, useState, type SyntheticEvent } from "react";
import useLogin from "../hooks/useLogin";
import useSignup from "../hooks/useSignup";
import { validateAuthFields } from "../utils/formFieldValidation";

export default function AuthPage() {
  const [params] = useSearchParams();
  const mode = params.get("mode") === "signup" ? "signup" : "login";
  const [inputErrors, setInputErrors] = useState<string[]>([]);
  const [showFetchError, setShowFetchError] = useState(false);
  const login = useLogin();
  const signup = useSignup();

  useEffect(() => {
    if (login.isError || signup.isError) {
      setShowFetchError(true);
      const timer = setTimeout(() => setShowFetchError(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [login.isError, signup.isError]);

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const { fields, errors } = validateAuthFields(e, mode);

    if (errors.length === 0) {
      if (mode === "signup") {
        signup.mutate({ ...fields });
      } else {
        login.mutate({ ...fields });
      }
    } else setInputErrors(errors);
  }

  return (
    <main className="bg-bg flex justify-center items-center h-screen w-screen">
      {showFetchError && (
        <div className="absolute top-1/2 left-1/2 -translate-1/2 shadow-xl p-5 bg-surface rounded-xl border border-danger text-center">
          <h2 className="text-danger font-bold text-xl">Error!</h2>
          {login.error?.error}

          {signup.error?.error}
        </div>
      )}
      {mode === "login" && (
        <LoginForm onSubmit={handleSubmit} errors={inputErrors} />
      )}
      {mode === "signup" && (
        <SignupForm onSubmit={handleSubmit} errors={inputErrors} />
      )}
    </main>
  );
}
