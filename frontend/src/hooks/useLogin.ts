import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { login } from "../http";
import { useAuthStore } from "../store/useAuthStore";

export default function useLogin() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      setUser(res.user);
      navigate("/home");
    },
  });
}
