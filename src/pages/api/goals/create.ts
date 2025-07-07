import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { title, description, frequency } = req.body;

  if (!title || !frequency) {
    return res.status(400).json({ message: "Title and frequency are required." });
  }

  const goal = await prisma.goal.create({
    data: {
      title,
      description,
      frequency,
      user: { connect: { email: session.user!.email! } },
    },
  });

  return res.status(201).json(goal);
}
