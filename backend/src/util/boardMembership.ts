import prisma from "../config/db.js";

export async function checkIfIsMember(
  boardId: number,
  userId: number,
): Promise<boolean> {
  const boardMember = await prisma.boardMember.findFirst({
    where: { boardId, userId },
  });
  return !!boardMember;
}
