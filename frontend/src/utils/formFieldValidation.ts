import type { SyntheticEvent } from "react";
import type { TaskType } from "../types";

function checkDueDate(dueDate: string) {
  const dateObj = new Date(dueDate);
  const checkObj = new Date();
  checkObj.setHours(0, 0, 0, 0);
  if (dateObj < checkObj) return "Due date cannot be in the past";
  checkObj.setFullYear(checkObj.getFullYear() + 1);
  if (dateObj > checkObj) return "Due date too far in the future";
  return null;
}

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

export function validateNewTaskFields(e: SyntheticEvent<HTMLFormElement>) {
  const data = Object.fromEntries(new FormData(e.currentTarget));

  const title = String(data.title);
  const description = String(data.description);
  const dueDate = String(data["due-date"]);

  const errors = [];

  if (!title || title.trim().length < 1) errors.push("Title is required");

  if (dueDate) {
    const dateError = checkDueDate(dueDate);
    if (dateError) errors.push(dateError);
  }
  return { fields: { title, description, dueDate }, errors };
}

export function validateEditTaskFields(fieldsData: TaskType) {
  const { title, assigneeId, dueDate, description, columnId } = fieldsData;

  const errors = [];

  if (!title || title.trim().length < 1) errors.push("Title is required");

  if (dueDate) {
    const dateError = checkDueDate(dueDate);
    if (dateError) errors.push(dateError);
  }

  return {
    fields: { title, dueDate, assigneeId, description, columnId },
    errors,
  };
}

export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}
