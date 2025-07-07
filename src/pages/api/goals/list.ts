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
  if (!validateMethod(req, res, ["GET"])) return;
  const session = await requireSession(req, res);
  if (!session) return;

  const goals = await prisma.goal.findMany({
    where: {
      user: { email: session.user!.email! },
    },
    orderBy: { createdAt: "desc" },
  });

  return res.status(200).json(goals);
}
