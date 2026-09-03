import type { Request, Response } from "express";
import { checkIfIsMember } from "../util/boardMembership.js";
import prisma from "../config/db.js";
import { error } from "node:console";

export async function addColumn(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });
  const boardId = Number(req.params.id);
  if (Number.isNaN(boardId))
    return res.status(400).json({ error: "Invalid board ID" });
  const isMember = await checkIfIsMember(boardId, req.user.id);
  if (!isMember)
    return res.status(403).json({ error: "Not a member of this board" });

  const { title } = req.body;
  if (!title && title.length < 1)
    return res.status(400).json({ error: "Column title not provided" });

  const lastColumn = await prisma.column.findFirst({
    where: { boardId },
    orderBy: { position: "desc" },
  });

  const position = lastColumn ? lastColumn.position + 1 : 1;

  try {
    const column = await prisma.column.create({
      data: { title, boardId, position },
    });

    return res.status(201).json({ column });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create column" });
  }
}

export async function updateColumn(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });

  const { title, position } = req.body;
  if ((!title || title.trim().length < 1) && !position)
    return res.status(400).json({ error: "No data provided to update" });

  const columnId = Number(req.params.id);
  if (Number.isNaN(columnId))
    return res.status(400).json({ error: "Invalid column ID" });

  const column = await prisma.column.findUnique({ where: { id: columnId } });
  if (!column) return res.status(400).json({ error: "Column doesn't exist" });

  const isMember = await checkIfIsMember(column.boardId, req.user.id);
  if (!isMember)
    return res.status(403).json({ error: "Not a member of this board" });

  try {
    const updatedColumn = await prisma.column.update({
      where: { id: columnId },
      data: { title, position },
    });

    return res.json({ column: updatedColumn });
  } catch (error: any) {
    if (error.code === "P2025")
      return res.status(404).json({ error: "Column not found" });

    console.error(error);
    return res.status(500).json({ error: "Faild to update column" });
  }
}

export async function deleteColumn(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });
  const columnId = Number(req.params.id);
  if (Number.isNaN(columnId))
    return res.status(400).json({ error: "Invalid column ID" });

  const column = await prisma.column.findUnique({ where: { id: columnId } });
  if (!column) return res.status(400).json({ error: "Column doesn't exist" });

  const isMember = await checkIfIsMember(column.boardId, req.user.id);
  if (!isMember)
    return res.status(403).json({ error: "Not a member of this board" });

  try {
    const deleted = await prisma.column.delete({ where: { id: columnId } });
    return res.json({ message: "Column deleted successfully", columnId });
  } catch (error: any) {
    if (error.code === "P2025")
      return res.status(404).json({ error: "Column not found" });

    console.error(error);
    return res.status(500).json({ error: "Faild to delete column" });
  }
}
