// src/pages/habit/add.tsx
import type { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import Sidebar from "@/components/Sidebar";

type UserInfo = {
  name: string;
  email: string;
};

type HabitProps = {
  user: UserInfo;
};

const AddHabit: NextPage<HabitProps> = ({ user }) => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
      <Sidebar user={user} />

        {/* Add-habit UI here */}
    </div>
  );
};

export default AddHabit;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session?.user?.email) {
    return {
      redirect: { destination: "/api/auth/signin", permanent: false },
    };
  }

  return {
    props: {
      user: {
        name: session.user.name ?? "",
        email: session.user.email,
      },
    },
  };
};
