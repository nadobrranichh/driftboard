import { useRef, useState } from "react";
import InputGroup from "./InputGroup";
import Button from "./Button";
import useUserByEmail from "../hooks/useUserByEmail";
import { isValidEmail } from "../utils/formFieldValidation";
import type { User } from "../types";

export default function AddMemberByEmail({
  onAdd,
}: {
  onAdd: (user: User) => void;
}) {
  const addMemberInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const getUserByEmail = useUserByEmail();
  const userByEmail = getUserByEmail.data ? getUserByEmail.data.user : null;

  function handleFindUser() {
    if (!addMemberInputRef.current) return;
    const emailValue = addMemberInputRef.current.value;
    if (!isValidEmail(emailValue)) {
      setError("New member's email is invalid");
      return;
    }
    setError(null);
    getUserByEmail.mutate(emailValue);
  }

  function handleAddUser() {
    onAdd(userByEmail);
    getUserByEmail.reset();
    if (addMemberInputRef.current) addMemberInputRef.current.value = "";
  }

  return (
    <>
      <div>
        <div className="grid grid-cols-[2fr_1fr] gap-3">
          <InputGroup name="add-member-by-email" ref={addMemberInputRef} />
          <Button className="py-2 self-end" onClick={handleFindUser}>
            Find
          </Button>
          {getUserByEmail.isPending && (
            <p className="col-span-2 text-center">Searching for the user...</p>
          )}
          {getUserByEmail.data?.user && (
            <>
              <div>
                <p>Found user:</p>
                <p>
                  {userByEmail.name} ({userByEmail.email})
                </p>
              </div>
              <Button className="py-2 self-end" onClick={handleAddUser}>
                Add
              </Button>
            </>
          )}
        </div>
        {error && error.length > 0 && (
          <p key={error} className="text-danger">
            {error}
          </p>
        )}
      </div>
    </>
  );
}
