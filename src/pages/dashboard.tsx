import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";
import SignOutButton from "../components/SignOutButton";
import { Goal } from "@prisma/client/wasm";
import CreateGoalForm from "../components/CreateGoalForm";
import MarkCompleteButton from "@/components/MarkCompleteButton";

const prisma = new PrismaClient();

type DashboardProps = {
  user: { email: string };
  goals: {
    id: string;
    title: string;
    description: string | null;
    frequency: string;
    createdAt: string;
    progress: { id: string; date: string }[];
  }[];
};

export default function Dashboard({ user, goals }: DashboardProps) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="mb-4">Welcome, {user.email}!</p>
      <SignOutButton />
      <CreateGoalForm />
      <h2 className="text-xl font-semibold mt-6 mb-2">Your Goals</h2>
      {goals.length === 0 ? (
        <p>No goals yet.</p>
      ) : (
        <ul className="space-y-2">
          {goals.map((goal) => (
            <li key={goal.id} className="border p-3 rounded">
              <h3 className="font-semibold">{goal.title}</h3>
              <p className="text-sm text-gray-600">
                {goal.description ?? "No description"}
              </p>
              <p className="text-xs text-gray-500">
                Frequency: {goal.frequency}
              </p>
              <p className="text-xs text-gray-400">
                Created: {new Date(goal.createdAt).toLocaleDateString()}
              </p>
              <MarkCompleteButton goalId={goal.id} />
              {goal.progress.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-sm font-semibold">Completion History:</h4>
                  <ul className="list-disc list-inside text-xs text-gray-500">
                    {goal.progress.map((p) => (
                      <li key={p.id}>
                        {new Date(p.date).toLocaleDateString()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session?.user?.email) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  const goals = await prisma.goal.findMany({
    where: { user: { email: session.user.email } },
    orderBy: { createdAt: "desc" },
    include: { progress: true },
  });

  return {
    props: {
      user: { email: session.user.email },
      goals: goals.map((goal: any) => ({
        ...goal,
        createdAt: goal.createdAt.toISOString(),
        progress: goal.progress.map((p: any) => ({
          id: p.id,
          date: p.date.toISOString(),
        })),
      })),
    },
  };
};
