// src/components/dashboard/SideBar.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import SignOutButton from "@/components/SignOutButton";

type UserInfo = {
  name: string;
  email: string;
};

type NavBar = {
  icon: string;
  title: string;
  link: string;
};

const NavItems: NavBar[] = [
  { icon: "dashboard", title: "Dashboard", link: "/dashboard" },
  { icon: "checklist", title: "My Habits", link: "/" },
  { icon: "forum", title: "Community Feed", link: "/" },
  { icon: "group", title: "Friends", link: "/" },
];

type SideBarProps = {
  user: UserInfo;
};

export default function SideBar({ user }: SideBarProps) {
  const router = useRouter();

  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-white/10 bg-background-light p-4 dark:bg-background-dark">
      <div className="flex h-full flex-col justify-between">
        {/* Top half */}
        <div className="flex flex-col gap-8">
          {/* Logo */}
          <Link href="/dashboard" className="inline-flex items-center gap-2">
            <UserGroupIcon
              className="h-6 w-6 text-primary"
              aria-hidden="true"
            />
            <h1 className="text-xl font-bold text-white">KeepUp</h1>
          </Link>

          <div className="flex flex-col gap-4">
            {/* User info */}
            <div className="flex items-center gap-3">
              <div
                className="size-10 rounded-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCPbuQQuWIQsGJ6rjToQlq1iLl-yqk-Y5IcSjSbmkjYq3ox-5Ky5LeqMngd69YQnzoNn3RnW_tP5wM_RUNFJVMOjnVYooxkaZzc57xtMSqtHHD_LLBTulpsve4z828vOTjAqmUWPwudk1OOO66KslBjUkeMOWGKPZEmA4ex3YfV-UMF1qkc-uYcwOLIPsv2SBmqd-iDgk4xeuvhIn815uwgKIxMg6aj8IEcSg-yanzifkaivB1sOK1ENLkq7VOEo344zJ84i9LKp_Lf')",
                }}
              />
              <div className="flex flex-col">
                <h2 className="text-base font-medium leading-normal text-white">
                  {user.name}
                </h2>
                <p className="text-sm font-normal leading-normal text-muted">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Nav */}
            <nav className="mt-4 flex flex-col gap-2">
              {NavItems.map((item) => {
                const isActive = router.pathname === item.link;
                const stateClasses = isActive
                  ? "bg-subtle"
                  : "hover:bg-subtle/50 transition-colors";

                return (
                  <Link
                    key={item.title}
                    href={item.link}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${stateClasses}`}
                  >
                    <span className="font-material-symbols text-2xl text-white">
                      {item.icon}
                    </span>
                    <p className="text-sm font-medium leading-normal text-white">
                      {item.title}
                    </p>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom half */}
        <div className="flex flex-col gap-3">
          <Link
            href="/habits/new"
            className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold leading-normal tracking-[0.015em] text-background-dark transition-colors hover:bg-primary/90"
          >
            <span className="truncate">Add New Habit</span>
          </Link>
          <div className="flex flex-col gap-1">
            <div className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-[#9db8b4] hover:bg-[#293836]/60 hover:text-white">
              <span className="font-material-symbols">settings</span>
              <p className="text-sm font-medium leading-normal">Settings</p>
            </div>
            <div className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-[#9db8b4] hover:bg-[#293836]/60 hover:text-white">
              <span className="font-material-symbols">logout</span>
              <p className="text-sm font-medium leading-normal">
                <SignOutButton />
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
