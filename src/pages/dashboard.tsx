import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { useState } from "react";
import Link from "next/link";
import { Visibility } from "@/services/goal";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import SignOutButton from "@/components/SignOutButton";
import SideBar from "@/components/Sidebar";


type GoalProgress = { id: string; date: string };
type GoalType = {
  id: string;
  title: string;
  description: string | null;
  frequency: string;
  visibility: Visibility;
  createdAt: string;
  progress: GoalProgress[];
};

type DashboardProps = {
  user: { email: string; name: string };
  goals: GoalType[];
};

type NavBar = {
  icon: string;
  title: string;
  link: string;
};

const NavItems: NavBar[] = [
  { icon: "dashboard", title: "Dashboard", link: "/dashboard" },
  { icon: "checklist", title: "My Habits", link: "/" }, //Todo: change link to habits page when created which should be maybe like /profile/{habitId}?
  { icon: "forum", title: "Community Feed", link: "/" }, //Todo: change link to community feed page when created
  { icon: "group", title: " Friends", link: "/" }, //Todo: change link to friends page when created
];

export default function Dashboard({ user, goals }: DashboardProps) {
  const router = useRouter();

  return (
    <>
      <div className="relative flex min-h-screen w-full font-display dark">
        <div className="flex w-full">
          {/* Sidebar */}
          <SideBar user={user} />

          {/* Main Content Area & Right Side Bar (Community Feed)*/}
          <div className="flex flex-1">
            <main className="flex-1 max-w-5xl p-8">
              <div className="flex flex-col gap-8">
                <header className="flex flex-wrap justify-between items-center gap-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                      Good Morning, {user.name.split(" ")[0]}!
                    </p>
                    <p className="text-muted text-base font-normal leading-normal">
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-subtle text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-white/20 transition-colors">
                    <span className="truncate">Weekly Report</span>
                  </button>
                </header>
                <section>
                  <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
                    {" "}
                    Today's Habits
                  </h2>
                </section>
              </div>
            </main>
            <aside className="w-80 border-l border-white/10 p-6 h-screen sticky top-0 overflow-y-auto">
                      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">Community Feed</h2>
            </aside>
          </div>
        </div>
      </div>
    </>
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
      user: { email: session.user.email, name: session.user.name },
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
