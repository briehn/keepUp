import { NextApiRequest, NextApiResponse } from "next";
import { requireSession } from "@/lib/getSession";
import { validateMethod } from "@/lib/validateMethod";
import { listGoals } from "@/services/goal";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!validateMethod(req, res, ["GET"])) return;
  const session = await requireSession(req, res);
  if (!session) return;

  try {
    const goals = await listGoals({ userEmail: session.user!.email! });
    return res.status(200).json(goals)
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}
