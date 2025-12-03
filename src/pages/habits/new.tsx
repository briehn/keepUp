// src/pages/habits/new.tsx

import type { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import Sidebar from "@/components/Sidebar";

type UserInfo = {
  name: string;
  email: string;
};

type AddHabitProps = {
  user: UserInfo;
};

const AddHabitPage: NextPage<AddHabitProps> = ({ user }) => {
  // TODO: wire up real state + data
  // const [search, setSearch] = useState("");
  // const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);

  return (
    <div className="relative flex min-h-screen w-full font-display dark">
      <div className="flex w-full">
        {/* Shared sidebar */}
        <Sidebar user={user} />

        {/* Main content + right info panel */}
        <div className="flex flex-1">
          {/* Main column */}
          <main className="flex-1 max-w-5xl p-8">
            <div className="flex flex-col gap-8">
              {/* Header */}
              <header className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <p className="text-3xl font-bold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
                    Create a New Habit
                  </p>
                  <p className="text-sm text-muted">
                    Start your journey by picking a habit below or creating your
                    own.
                  </p>
                </div>
              </header>

              {/* Search + grid */}
              <section className="space-y-6">
                {/* Search bar */}
                <div className="relative max-w-md">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted">
                    {/* search icon placeholder */}
                    <span className="material-symbols-outlined text-lg">
                      search
                    </span>
                  </span>
                  <input
                    type="text"
                    // value={search}
                    // onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search habits (e.g. reading, running, sleep)"
                    className="w-full rounded-lg border border-subtle bg-background-dark/60 py-2 pl-9 pr-3 text-sm text-slate-50 outline-none placeholder:text-[#5d6f6c] focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Preset habits grid (structure only; replace with real data) */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="flex flex-col items-start gap-2 rounded-xl border border-[#253734] bg-background-dark/60 p-4 text-left text-slate-50 transition-colors hover:border-primary hover:bg-background-dark"
                      // onClick={() => setSelectedHabitId(id)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">
                          check_circle
                        </span>
                        <span className="text-sm font-semibold">
                          Preset habit {idx + 1}
                        </span>
                      </div>
                      <p className="text-xs text-muted">
                        Short description of what this habit helps you achieve.
                      </p>
                    </button>
                  ))}
                </div>

                {/* Custom habit area */}
                <div className="mt-4 rounded-xl border border-dashed border-[#2f4441] bg-background-dark/60 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-sm font-semibold text-white">
                        Create custom habit
                      </h2>
                      <p className="mt-1 text-xs text-muted">
                        Can&apos;t find what you&apos;re looking for? Create
                        your own personalized habit.
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    <label className="block text-xs text-muted">
                      Habit name
                      <input
                        type="text"
                        className="mt-1 w-full rounded-lg border border-subtle bg-background-dark/60 px-3 py-2 text-sm text-slate-50 outline-none placeholder:text-[#5d6f6c] focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="e.g. Practice guitar for 20 minutes"
                      />
                    </label>

                    <label className="block text-xs text-muted">
                      Optional description
                      <textarea
                        className="mt-1 w-full rounded-lg border border-subtle bg-background-dark/60 px-3 py-2 text-sm text-slate-50 outline-none placeholder:text-[#5d6f6c] focus:border-primary focus:ring-1 focus:ring-primary"
                        rows={3}
                        placeholder="Describe why this habit matters or how you’ll track it."
                      />
                    </label>

                    <p className="mt-2 text-[11px] leading-relaxed text-muted">
                      Custom habits must follow our community guidelines. Avoid
                      explicit, illegal, or harmful content. Focus on positive,
                      constructive actions you want to repeat.
                    </p>
                  </div>
                </div>
              </section>

              {/* Continue button */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  className="flex h-10 min-w-[120px] items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold tracking-[0.015em] text-background-dark transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                  // disabled={!selectedHabitId && !customName}
                >
                  Continue
                </button>
              </div>
            </div>
          </main>

          {/* Right info panel */}
          <aside className="hidden xl:flex w-80 flex-col gap-6 rounded-xl border border-[#3c534f] bg-[#111a19] px-6 py-7 my-12">
            <h3 className="text-white text-lg font-semibold">
              Choosing Your Habit
            </h3>

            <div className="flex flex-col gap-6 text-sm">
              {/* Presets section */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-material-symbols text-primary text-lg">
                    verified
                  </span>
                  <h4 className="text-white font-semibold text-sm">
                    Preset Habits
                  </h4>
                </div>

                <ul className="flex flex-col gap-1.5 pl-5">
                  <li className="flex items-start gap-2 text-[#9db8b4]">
                    <span className="font-material-symbols mt-[2px] text-xs text-primary">
                      arrow_forward_ios
                    </span>
                    <span>Better social prompts &amp; sharing.</span>
                  </li>
                  <li className="flex items-start gap-2 text-[#9db8b4]">
                    <span className="font-material-symbols mt-[2px] text-xs text-primary">
                      arrow_forward_ios
                    </span>
                    <span>Track progress with the community.</span>
                  </li>
                  <li className="flex items-start gap-2 text-[#9db8b4]">
                    <span className="font-material-symbols mt-[2px] text-xs text-primary">
                      arrow_forward_ios
                    </span>
                    <span>Ensures safer, verified content.</span>
                  </li>
                </ul>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-[#243331]" />

              {/* Custom section */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-material-symbols text-[#8b5cf6] text-lg">
                    edit
                  </span>
                  <h4 className="text-white font-semibold text-sm">
                    Custom Habits
                  </h4>
                </div>

                <ul className="flex flex-col gap-1.5 pl-5">
                  <li className="flex items-start gap-2 text-[#9db8b4]">
                    <span className="font-material-symbols mt-[2px] text-xs text-[#8b5cf6]">
                      arrow_forward_ios
                    </span>
                    <span>Total personalization for your goals.</span>
                  </li>
                  <li className="flex items-start gap-2 text-[#9db8b4]">
                    <span className="font-material-symbols mt-[2px] text-xs text-[#8b5cf6]">
                      arrow_forward_ios
                    </span>
                    <span>More flexibility for unique habits.</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AddHabitPage;

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
