// services/goal.ts
import prisma from "../lib/prisma";

export interface NewGoalData {
  title: string;
  description?: string;
  frequency: string;
}

export async function createGoal({
  userEmail,
  data,
}: {
  userEmail: string;
  data: NewGoalData;
}) {
  return prisma.goal.create({
    data: {
      ...data,
      user: { connect: { email: userEmail } },
    },
  });
}

export async function listGoals({ userEmail }: { userEmail: string }) {
  return await prisma.goal.findMany({
    where: { user: { email: userEmail } },
    include: { progress: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function completeGoal({
  userEmail,
  goalId,
}: {
  userEmail: string;
  goalId: string;
}) {
  const goal = await prisma.goal.findUnique({
    where: { id: goalId },
    include: { user: true },
  });
  if (!goal || goal.user.email !== userEmail) {
    throw new Error("Unauthorized or goal not found");
  }
  return prisma.progress.create({
    data: { goalId, date: new Date() },
  });
}

// add UpdateGoal and DeleteGoal
