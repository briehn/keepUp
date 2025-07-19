// pages/api/goals/delete.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { validateMethod } from "@/lib/validateMethod";
import { requireSession } from "@/lib/getSession";
import { deleteGoal } from "@/services/goal";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!validateMethod(req, res, ["POST"])) return;
  const session = await requireSession(req, res);
  if (!session) return;

  const { goalId } = req.body;
  if (!goalId) {
    return res.status(400).json({ message: "goalId is required" });
  }

  try {
    await deleteGoal({
      userEmail: session.user!.email!,
      goalId,
    });
    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("Failed to delete goal:", err);
    return res.status(403).json({ message: err.message });
  }
}
