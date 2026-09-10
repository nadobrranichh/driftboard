import type { Request, Response } from "express";
import prisma from "../config/db.js";
import { checkIfIsMember } from "../util/boardMembership.js";

export async function getBoards(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });
  const { id: userId } = req.user;

  const boards = await prisma.board.findMany({
    where: {
      members: { some: { userId } },
    },
    include: { columns: { select: { _count: { select: { tasks: true } } } } },
  });

  const boardsTransformed = boards.map((board) => {
    const newBoard: any = { ...board };
    newBoard.taskCount = board.columns.reduce(
      (acc, col) => acc + col._count.tasks,
      0,
    );
    delete newBoard.columns;
    return newBoard;
  });

  return res.json({ boards: boardsTransformed });
}

export async function getBoard(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });
  const boardId = Number(req.params.id);
  if (Number.isNaN(boardId))
    return res.status(400).json({ error: "Invalid board ID" });

  const isMember = await checkIfIsMember(boardId, req.user.id);
  if (!isMember)
    return res.status(403).json({ error: "Not a member of this board" });

  const board = await prisma.board.findUnique({
    where: { id: boardId },
    include: {
      columns: { include: { tasks: true } },

      members: {
        select: { member: { select: { id: true, name: true, email: true } } },
      },
    },
  });

  const response = { ...board, members: board?.members.map((m) => m.member) };

  return res.json({ board: response });
}

export async function createBoard(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });
  const { title, columns, icon, iconColor } = req.body;

  if (!title || !columns || !icon || !iconColor || columns.length < 1)
    return res.status(400).json({ error: "Required data not provided" });

  try {
    const board = await prisma.$transaction(async (tx) => {
      const newBoard = await tx.board.create({
        data: { title, icon, iconColor },
      });

      const columnsData = columns.map((col: string, i: number) => ({
        title: col,
        position: i,
        boardId: newBoard.id,
      }));

      await tx.column.createMany({ data: columnsData });

      await tx.boardMember.create({
        data: { boardId: newBoard.id, userId: req.user!.id },
      });

      const createdColumns = await tx.column.findMany({
        where: { boardId: newBoard.id },
        orderBy: { position: "asc" },
      });

      return { ...newBoard, columns: createdColumns };
    });

    return res.status(201).json({ board });
  } catch (error) {
    console.error("ERROR WHILE CREATING A NEW BOARD: ", error);
    return res.status(500).json({ error: "Board creation failed" });
  }
}

export async function updateBoard(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });
  const boardId = Number(req.params.id);
  if (Number.isNaN(boardId))
    return res.status(400).json({ error: "Invalid board ID" });
  const { title, icon, iconColor, members } = req.body;

  if (!title && !icon && !iconColor)
    return res.status(400).json({ error: "No data provided to update" });

  const isMember = await checkIfIsMember(boardId, req.user.id);
  if (!isMember)
    return res.status(403).json({ error: "Not a member of this board" });

  if (members?.length > 0) {
    const boardMembers = await prisma.boardMember.findMany({
      where: { boardId },
    });

    const membersIds = members.map((m) => m.id);
    const boardMembersIds = boardMembers.map((bm) => bm.userId);

    const memberIdsToRemove = boardMembersIds.filter(
      (id) => !membersIds.includes(id),
    );
    const memberIdsToAdd = membersIds.filter(
      (id: number) => !boardMembersIds.includes(id),
    );

    await prisma.$transaction(async (tx) => {
      if (memberIdsToRemove.length > 0) {
        await tx.boardMember.deleteMany({
          where: { boardId, userId: { in: memberIdsToRemove } },
        });
      }

      if (memberIdsToAdd.length > 0)
        await tx.boardMember.createMany({
          data: memberIdsToAdd.map((userId: number) => ({ userId, boardId })),
        });
    });
  }

  try {
    const updated = await prisma.board.update({
      where: { id: boardId },
      data: {
        ...(title && title.trim().length > 0 && { title }),
        ...(icon && icon.trim().length > 0 && { icon }),
        ...(iconColor && iconColor.trim().length > 0 && { iconColor }),
      },
    });
    return res.json({
      board: { ...updated, ...(members?.length > 0 && { members }) },
    });
  } catch (error: any) {
    if (error.code === "P2025")
      return res.status(404).json({ error: "Board not found" });

    console.error(error);
    return res.status(500).json({ error: "Failed to update board" });
  }
}

export async function deleteBoard(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });
  const boardId = Number(req.params.id);
  if (Number.isNaN(boardId))
    return res.status(400).json({ error: "Invalid board ID" });

  const isMember = await checkIfIsMember(boardId, req.user.id);
  if (!isMember)
    return res.status(403).json({ error: "Not a member of this board" });

  try {
    await prisma.board.delete({ where: { id: boardId } });
    return res.json({ message: "Board deleted successfully", boardId });
  } catch (error: any) {
    if (error.code === "P2025")
      return res.status(404).json({ error: "Board not found" });

    console.error(error);
    return res.status(500).json({ error: "Failed to delete board" });
  }
}

export async function addMemberToBoard(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });
  const boardId = Number(req.params.id);
  if (Number.isNaN(boardId))
    return res.status(400).json({ error: "Invalid board ID" });

  const isMember = await checkIfIsMember(boardId, req.user.id);
  if (!isMember)
    return res.status(403).json({ error: "Not a member of this board" });

  const { email: userToAddEmail } = req.body;

  const userToAdd = await prisma.user.findUnique({
    where: { email: userToAddEmail },
  });
  if (!userToAdd) return res.status(400).json({ error: "User doesn't exist" });

  try {
    await prisma.boardMember.create({
      data: { boardId, userId: userToAdd.id },
    });

    return res.json({ message: "User added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "User wasn't added to board" });
  }
}
