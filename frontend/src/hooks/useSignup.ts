import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { signup } from "../http";
import { useAuthStore } from "../store/useAuthStore";

export default function useSignup() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: signup,
    onSuccess: (res) => {
      setUser(res.user);
      navigate("/home");
    },
  });
}
