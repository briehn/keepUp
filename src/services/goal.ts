import prisma from "../lib/prisma";
import type { Visibility } from "@prisma/client";

export { Visibility } from "@prisma/client";

export interface NewGoalData {
  title: string;
  description?: string;
  frequency: string;
  visibility?: Visibility;
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


export interface UpdateGoalArgs {
  userEmail: string;
  goalId: string;
  data: {
    title: string;
    description?: string;
    frequency: string; 
    visibility: Visibility;
  }
}

export async function updateGoal({ userEmail, goalId, data }: UpdateGoalArgs) {
  const goal = await prisma.goal.findUnique({
    where: { id: goalId },
    include: { user: true }
  });

  if (!goal || goal.user.email !== userEmail) {
    throw new Error("Unauthorized or goal not found");
  }

  return prisma.goal.update({
    where: { id: goalId },
    data,
  });
}

export interface DeleteGoalArgs {
  userEmail: string;
  goalId: string;
}

export async function deleteGoal({ userEmail, goalId }: DeleteGoalArgs) {
  const goal = await prisma.goal.findUnique({
    where: { id: goalId },
    include: { user: true }
  });

  if (!goal || goal.user.email !== userEmail) {
    throw new Error("Unauthorized or goal not found");
  }

  await prisma.progress.deleteMany({
    where: { goalId },
  });

  return prisma.goal.delete({
    where: { id: goalId },
  });
}