import { NextApiRequest, NextApiResponse } from "next";
import { requireSession } from "@/lib/getSession";
import { validateMethod } from "@/lib/validateMethod";
import { listFollowing } from "@/services/follow";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (!validateMethod(req, res, ["GET"])) return;
    const session = await requireSession(req, res);
    if (!session) return;

    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }

    const following = await listFollowing(userId);

    return res.status(201).json(following);
}