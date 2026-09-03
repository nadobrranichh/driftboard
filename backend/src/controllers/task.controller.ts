import type { Request, Response } from "express";
import prisma from "../config/db.js";
import { checkIfIsMember } from "../util/boardMembership.js";

function validateDate(dateStr: string) {
  const parsed = new Date(dateStr);
  if (!parsed) return "Invalid date";

  const now = new Date();
  now.setHours(0, 0, 0, 0); // to compare only by dates
  if (parsed < now) return "Due date cannot be in the past";

  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

  if (parsed > oneYearFromNow)
    return "Due date cannot be more than 1 year from now";
}

export async function addTask(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });
  const { title, description, dueDate, assigneeId, columnId } = req.body;
  if (!title || title.trim().length < 1)
    return res.status(400).json({ error: "Task title shouldn't be empty" });
  if (!columnId || Number.isNaN(Number(columnId)))
    return res.status(400).json({ error: "Task should have its column" });

  if (dueDate) {
    const error = validateDate(dueDate);
    if (error) return res.status(400).json({ error });
  }

  const column = await prisma.column.findUnique({ where: { id: columnId } });
  if (!column) return res.status(400).json({ error: "Column not found" });

  if (assigneeId) {
    const user = await prisma.user.findUnique({ where: { id: assigneeId } });
    if (!user)
      return res
        .status(400)
        .json({ error: "Task should be assigned to an existing user" });
    const assigneeIsMember = await checkIfIsMember(column.boardId, assigneeId);
    if (!assigneeIsMember)
      return res
        .status(400)
        .json({ error: "Task assignee should be a member of this board" });
  }

  const isMember = await checkIfIsMember(column.boardId, req.user.id);
  if (!isMember)
    return res.status(403).json({ error: "Not a member of this board" });

  const lastTask = await prisma.task.findFirst({
    where: { columnId },
    orderBy: { position: "desc" },
  });

  const position = lastTask ? lastTask.position + 1 : 1;

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        position,
        assigneeId,
        columnId,
      },
    });

    return res.status(201).json({ task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create the task" });
  }
}

export async function updateTask(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });
  const taskId = Number(req.params.id);
  if (Number.isNaN(taskId))
    return res.status(400).json({ error: "Invalid task ID" });

  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: { column: { select: { boardId: true } } },
  });
  if (!task) return res.status(404).json({ error: "Task does not exist" });

  const { title, description, dueDate, assigneeId, columnId, position } =
    req.body;
  if (
    !title &&
    !description &&
    !dueDate &&
    !assigneeId &&
    !columnId &&
    !position
  ) {
    return res.status(400).json({ error: "No data provided to update" });
  }

  const data: Record<string, unknown> = {};
  if (title) {
    if (title.trim().length < 1)
      return res.status(400).json({ error: "Task title shouldn't be empty" });

    data.title = title;
  }

  if (description) data.description = description;

  if (dueDate) {
    const error = validateDate(dueDate);
    if (error) return res.status(400).json({ error });
    data.dueDate = new Date(dueDate);
  }

  if (assigneeId) {
    const assigneeIsMember = await checkIfIsMember(
      task.column.boardId,
      assigneeId,
    );
    if (!assigneeIsMember)
      return res
        .status(400)
        .json({ error: "Task assignee should be a member of this board" });

    data.assigneeId = assigneeId;
  }

  if (columnId) {
    if (Number.isNaN(Number(columnId)))
      return res.status(400).json({ error: "Invalid column ID" });

    let newPosition = position;
    if (!newPosition) {
      const lastTask = await prisma.task.findFirst({
        where: { columnId },
        orderBy: { position: "desc" },
      });
      newPosition = lastTask ? lastTask.position + 1 : 1;
    }

    data.columnId = columnId;
    data.position = position;
  } else if (position) {
    if (position && Number.isNaN(Number(position)))
      return res.status(400).json({ error: "Invalid task position" });

    data.position = position;
  }

  try {
    const updated = await prisma.task.update({
      where: { id: taskId },
      data,
    });
    return res.json({ task: updated });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update task" });
  }
}

export async function deleteTask(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });
  const taskId = Number(req.params.id);
  if (Number.isNaN(taskId))
    return res.status(400).json({ error: "Invalid task ID" });

  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: { column: { select: { boardId: true } } },
  });
  if (!task) return res.status(404).json({ error: "Task does not exist" });

  const isMember = await checkIfIsMember(task.column.boardId, req.user.id);
  if (!isMember)
    return res.status(403).json({ error: "Not a member of this board" });

  try {
    await prisma.task.delete({ where: { id: taskId } });
    return res.json({ message: "Task deleted successfully", taskId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete task" });
  }
}
