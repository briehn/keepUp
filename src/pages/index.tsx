import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

type Feature = {
  icon: string;
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    icon: "check_circle",
    title: "Daily Habit Tracking",
    description:
      "Log your daily activities with a simple and intuitive interface to build powerful streaks.",
  },
  {
    icon: "bar_chart",
    title: "Visualize Your Progress",
    description:
      "See your journey unfold with charts and insightful data visualizations.",
  },
  {
    icon: "groups",
    title: "Community Motivation",
    description:
      "Share your milestones and get inspired by a community that cheers you on.",
  },
];

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>KeepUp – Build Habits That Stick</title>
        <meta
          name="description"
          content="KeepUp is the social platform to track your habits, visualize progress, and stay motivated with a supportive community."
        />
      </Head>

      <main className="min-h-screen bg-background-light text-slate-900 dark:bg-background-dark dark:text-slate-50">
        {/* TopNavBar */}
        <header className="bg-background-dark/60">
          <div className="mx-auto flex max-w-5xl items-center justify-between whitespace-nowrap border-b border-white/10 px-4 py-3 sm:px-10 dark:border-b-[#293836]">
            <div className="flex items-center gap-4 text-white">
              <div className="size-6">
                {" "}
                <UserGroupIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
                KeepUp
              </h2>
            </div>

            <div className="flex flex-1 justify-end gap-8">
              <div className="hidden items-center gap-9 sm:flex">
                <a
                  className="text-sm font-medium leading-normal"
                  href="#features"
                >
                  Features
                </a>
                <a className="text-sm font-medium leading-normal" href="#about">
                  About
                </a>
              </div>

              <div className="flex gap-2">
                <Link
                  href="/signup"
                  className="flex h-10 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold leading-normal tracking-[0.015em] text-black"
                >
                  <span className="truncate">Sign Up</span>
                </Link>

                <Link
                  href="/signin"
                  className="flex h-10 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#293836] px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white"
                >
                  <span className="truncate">Log In</span>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-16 md:flex-row md:items-center md:py-24">
          <div className="flex-1 space-y-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              KeepUp
            </p>
            <h1 className="font-landing text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Build Habits That Stick, Together.
            </h1>
            <p className="max-w-xl text-base text-muted">
              KeepUp is the social platform to track your progress, visualize
              your success, and stay motivated with a supportive community.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-slate-900 shadow-sm transition hover:brightness-110"
              >
                Get started for free
              </a>
              <a
                href="#features"
                className="text-sm font-medium text-primary hover:underline"
              >
                Learn more
              </a>
            </div>

            <p className="text-xs text-muted">
              Join 10,000+ users building better habits every day.
            </p>
          </div>

          {/* Hero illustration placeholder */}
          <div className="mt-10 flex-1 md:mt-0">
            <div
              className="
      w-full aspect-video rounded-lg bg-cover bg-center bg-no-repeat
      md:h-auto md:min-w-[400px] lg:w-full
    "
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDF2l8yBO6FwrUeYBpby0N1RWS8s4kXj-s_GNH74P0ClSl3c2PCMUo4G6R9URHzd1GqopetZAYXo6ziPvo0SAeR9ijXXXnjHvviynnQU-sA8N4pyBwynJUpnrb3RcJpk8hX73r1vlKVMaPRXLWMvHzpQQFjrj1ZcfaAnPUE8CA8rVmmdPjp9ejG0_EdyWlPeSvKVNQqr9vFNonUzNyvWonqfKhJ0vB276O1EKEV_eaFO8mT-7kp-MvKC80zB12aiIJj4ekyeS3FKRgo')",
              }}
              aria-label="Abstract gradient of teal and violet shapes representing progress and community"
              role="img"
            />
          </div>
        </section>

        {/* Feature grid */}
        <section className="bg-background-light/60 py-16 dark:bg-background-dark/60">
          <div id="features" className="mx-auto max-w-5xl px-4 pt-12">
            <div className="mb-10 space-y-3">
              <h2 className="font-landing text-2xl font-semibold sm:text-3xl">
                Everything you need to succeed
              </h2>
              <p className="max-w-2xl text-sm text-muted">
                Unlock your potential with tools designed for consistency,
                accountability, and long-term motivation.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {FEATURES.map((feature) => (
                <article
                  key={feature.title}
                  className="flex flex-col rounded-lg border border-[#3c534f] bg-surface p-5 shadow-sm ring-1 ring-subtle/60"
                >
                  <span className="font-material-symbols text-2xl text-primary">
                    {feature.icon}
                  </span>
                  <h3 className="mb-2 text-base font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / footer banner */}
        <section className=" py-14">
          <div className="mx-auto max-w-3xl px-4 pt-10 text-center">
            <h2 className="font-landing text-2xl font-semibold sm:text-3xl">
              Start building better habits today.
            </h2>
            <p className="mt-3 text-sm text-muted">
              Begin your journey towards a more consistent and motivated you.
              It&apos;s free to get started.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-slate-900 shadow-sm transition hover:brightness-110"
              >
                Create your free account
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
