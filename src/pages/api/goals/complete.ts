import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";
import { requireSession } from "@/lib/getSession";
import { validateMethod } from "@/lib/validateMethod";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!validateMethod(req, res, ["POST"])) return;
  const session = await requireSession(req, res);
  if (!session) return;

  const { goalId } = req.body;

  if (!goalId) {
    return res.status(400).json({ message: "Goal ID is required." });
  }

  const goal = await prisma.goal.findUnique({
    where: { id: goalId },
    include: { user: true },
  });

  if (!goal || goal.user.email !== session.user!.email) {
    return res.status(404).json({ message: "Goal not found." });
  }

  const progress = await prisma.progress.create({
    data: {
      goalId: goal.id,
      date: new Date(),
    },
  });

  return res.status(201).json(progress);
}
