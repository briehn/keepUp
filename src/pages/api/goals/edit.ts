import type { NextApiRequest, NextApiResponse } from "next";
import { validateMethod } from "@/lib/validateMethod";
import { requireSession } from "@/lib/getSession";
import { updateGoal, Visibility } from "@/services/goal";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!validateMethod(req, res, ["POST"])) return;
  const session = await requireSession(req, res);
  if (!session) return;

  const { goalId, title, description, frequency, visibility } = req.body;
  if (!goalId || !title || !frequency || !visibility) {
    return res
      .status(400)
      .json({
        message: "goalId, title, frequency, and visibility are required",
      });
  }

  if (!Object.values(Visibility).includes(visibility)) {
    return res.status(400).json({ message: "Invalid visibility." });
  }

  try {
    const updated = await updateGoal({
      userEmail: session.user!.email!,
      goalId,
      data: { title, description, frequency, visibility },
    });
    return res.status(200).json(updated);
  } catch (err: any) {
    return res.status(403).json({ message: err.message });
  }
}
