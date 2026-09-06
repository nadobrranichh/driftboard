import type { SyntheticEvent } from "react";

export function validateAuthFields(
  e: SyntheticEvent<HTMLFormElement>,
  mode: string,
) {
  const data = Object.fromEntries(new FormData(e.currentTarget));

  const name = String(data.name);
  const email = String(data.email);
  const password = String(data.password);

  const errors = [];

  if (!email || email.trim().length < 1) errors.push("Email is required");
  if (!password || password.trim().length < 8)
    errors.push("Password must be at least 8 characters");

  if (mode === "signup") {
    const repeatPassword = String(data["repeat-password"]);

    if (!name || name.trim().length < 1) errors.push("Name shouldn't be empty");
    if (repeatPassword !== password) errors.push("Passwords should match");
  }

  return { fields: { name, email, password }, errors };
}
