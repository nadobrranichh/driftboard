import { useEffect, useState } from "react";
import useGetBoard from "../hooks/useGetBoard";
import Backdrop from "./Backdrop";
import { Navigate, useNavigate, useParams } from "react-router";
import InputGroup from "./InputGroup";
import type { BoardType, User } from "../types";
import { X } from "lucide-react";
import Button from "./Button";
import { useAuthStore } from "../store/useAuthStore";
import { arraysAreEqual } from "../utils/arrays";
import useUpdateBoard from "../hooks/useUpdateBoard";
import IconAndColorPicker from "./IconAndColorPicker";
import AddMemberByEmail from "./AddMemberByEmail";

export default function BoardSettings() {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const { user, status } = useAuthStore();
  const boardQuery = useGetBoard(Number(boardId));
  const updateBoard = useUpdateBoard(Number(boardId));
  const board = boardQuery.data ? boardQuery.data.board : null;
  const [fieldsData, setFieldsData] = useState(board);
  const [inputErrors, setInputErrors] = useState<string[]>([]);

  const membersToDisplay =
    fieldsData && user
      ? fieldsData.members.filter((m: User) => m.id !== user.id)
      : null;

  function updateField(field: keyof BoardType, value: string | number | null) {
    setFieldsData((prev: BoardType) => ({ ...prev, [field]: value }));
  }

  function handleAddMember(newMember: User) {
    setFieldsData((prev: BoardType) => ({
      ...prev,
      members: [...prev.members!, newMember],
    }));
  }

  function handleRemoveMember(idToDelete: number) {
    setFieldsData((prev: BoardType) => ({
      ...prev,
      members: [...prev.members!.filter((m: User) => m.id !== idToDelete)],
    }));
  }

  function handleSubmitChanges() {
    if (!fieldsData || !board) return;
    if (fieldsData.title.trim().length < 1) {
      setInputErrors(["Title cannot be empty"]);
      return;
    }
    setInputErrors([]);
    const updatedMembersIds = fieldsData.members.map((m: User) => m.id);
    const boardMembersIds = board.members.map((bm: User) => bm.id);
    const membersAreEqual = arraysAreEqual(updatedMembersIds, boardMembersIds);

    const { columns, ...data } = fieldsData;
    updateBoard.mutate({
      ...data,
      ...(membersAreEqual && { members: undefined }),
    });
    navigate("..");
  }

  useEffect(() => {
    if (board) setFieldsData(board);
  }, [board]);

  if (!board || !fieldsData) {
    return (
      <Backdrop onClick={() => navigate("..")}>
        <p className="text-surface">Loading...</p>
      </Backdrop>
    );
  }

  if (!user) {
    if (status === "loading")
      return (
        <Backdrop onClick={() => navigate("..")}>
          <p className="text-surface">Authenticating...</p>
        </Backdrop>
      );

    return <Navigate to={"/auth"} />;
  }

  return (
    <Backdrop onClick={() => navigate("..")}>
      <div
        className="bg-surface rounded-xl p-6 flex flex-col gap-3 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => navigate("..")}
          className="absolute top-4 right-4"
        >
          <X className="cursor-pointer" />
        </button>
        <h2 className="text-2xl text-center font-bold">Board Settings</h2>
        <InputGroup
          name="title"
          value={fieldsData.title}
          onChange={(e) => updateField("title", e.target.value)}
        />
        <IconAndColorPicker
          icon={fieldsData.icon}
          iconColor={fieldsData.iconColor}
          onChange={updateField}
        />
        <div>
          <p>Members (excluding you):</p>
          <div className="flex flex-wrap gap-2">
            {membersToDisplay.map((m: User) => (
              <div
                className="px-2 py-1 rounded-2xl border flex gap-2"
                key={m.id}
              >
                {m.name}{" "}
                <button onClick={() => handleRemoveMember(m.id)}>
                  <X className="cursor-pointer" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <AddMemberByEmail onAdd={handleAddMember} />
        {inputErrors.length > 0 && (
          <div>
            {inputErrors.map((err) => (
              <p key={err} className="text-danger">
                {err}
              </p>
            ))}
          </div>
        )}
        <div className="grid grid-cols-2 gap-2">
          <Button className="py-2" onClick={() => navigate("..")}>
            Cancel Changes
          </Button>
          <Button className="py-2" onClick={handleSubmitChanges}>
            Submit Changes
          </Button>
        </div>
      </div>
    </Backdrop>
  );
}
