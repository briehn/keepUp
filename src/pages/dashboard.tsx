import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { useState } from "react";
import Link from "next/link";
import { Visibility } from "@/services/goal";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

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
        <div className="flex w-full>">
          {/* Sidebar */}
          <aside className="flex h-screen w-64 flex-col bg-background-light dark:bg-background-dark p-4 border-r border-white/10 sticky top-0">
            <div className="flex h-full flex-col justify-between">
              {/* Top Half (Logo, User Info, Nav Bar) */}
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-2">
                  <UserGroupIcon
                    className="h-6 w-6 text-primary"
                    aria-hidden="true"
                  />
                  <h1 className="text-xl font-bold text-white">KeepUp</h1>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCPbuQQuWIQsGJ6rjToQlq1iLl-yqk-Y5IcSjSbmkjYq3ox-5Ky5LeqMngd69YQnzoNn3RnW_tP5wM_RUNFJVMOjnVYooxkaZzc57xtMSqtHHD_LLBTulpsve4z828vOTjAqmUWPwudk1OOO66KslBjUkeMOWGKPZEmA4ex3YfV-UMF1qkc-uYcwOLIPsv2SBmqd-iDgk4xeuvhIn815uwgKIxMg6aj8IEcSg-yanzifkaivB1sOK1ENLkq7VOEo344zJ84i9LKp_Lf')",
                      }}
                    >
                      {/* Placeholder for user avatar */}
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-white text-base font-medium leading-normal">
                        {user.name}
                      </h2>
                      <p className="text-muted text-sm font-normal leading-normal">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <nav className="flex flex-col gap-2 mt-4">
                    {NavItems.map((item) => {
                      const isActive = router.pathname === item.link;
                      const stateClasses = isActive
                        ? "bg-subtle"
                        : "hover:bg-subtle/50 transition-colors";

                      return (
                        <Link
                          key={item.title}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg ${stateClasses}`}
                          href={item.link}
                        >
                          <span className="font-material-symbols text-white text-2xl">
                            {item.icon}
                          </span>
                          <p className="text-white text-sm font-medium leading-normal">
                            {item.title}
                          </p>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </div>
              {/* Bottom Half (Add New Habit Button) */}
              <div className="flex flex-col gap-3">
                <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-background-dark text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
                  <span className="truncate">Add New Habit</span>
                </button>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-lg text-[#9db8b4] hover:text-white hover:bg-[#293836]/60">
                    <span className="font-material-symbols">settings</span>
                    <p className="text-sm font-medium leading-normal">
                      Settings
                    </p>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-lg text-[#9db8b4] hover:text-white hover:bg-[#293836]/60">
                    <span className="font-material-symbols">logout</span>
                    <p className="text-sm font-medium leading-normal">
                      Log Out
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
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
