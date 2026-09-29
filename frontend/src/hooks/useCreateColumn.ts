import { useMutation } from "@tanstack/react-query";
import { createColumn } from "../http/columns";
import { handleAddColumn } from "../utils/query-cache/columns";

export default function useCreateColumn() {
  return useMutation({
    mutationFn: createColumn,
    onSuccess: (data) => handleAddColumn(data),
  });
}
