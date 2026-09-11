import { useMutation } from "@tanstack/react-query";
import { getUserByEmail } from "../http/user";

export default function useUserByEmail() {
  return useMutation({
    mutationFn: getUserByEmail,
  });
}
