import { NextApiRequest, NextApiResponse } from "next";
import { requireSession } from "@/lib/getSession";
import { validateMethod } from "@/lib/validateMethod";
import { createGoal, NewGoalData } from "@/services/goal";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!validateMethod(req, res, ["POST"])) return;
  const session = await requireSession(req, res);
  if (!session) return;

  const { title, description, frequency, visibility } = req.body as NewGoalData;

  if (!title || !frequency) {
    return res
      .status(400)
      .json({ message: "Title and frequency are required." });
  }

  const goal = await createGoal({
    userEmail: session.user!.email!,
    data: { title, description, frequency, visibility },
  });

  return res.status(201).json(goal);
}
