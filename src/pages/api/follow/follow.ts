import { NextApiRequest, NextApiResponse } from "next";
import { requireSession } from "@/lib/getSession";
import { validateMethod } from "@/lib/validateMethod";
import { followUser } from "@/services/follow";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (!validateMethod(req, res, ["POST"])) return;
    const session = await requireSession(req, res);
    if (!session) return;

    const { followingId } = req.body;
    if (!followingId) {
        return res.status(400).json({ message: "Following ID is required." });
    }

    const following = await followUser(session.user!.id, followingId);
}