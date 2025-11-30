// src/pages/signup.tsx
import { useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { signIn } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";
import { UserGroupIcon } from "@heroicons/react/24/solid";

const SignUpPage: NextPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [whyOpen, setWhyOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }

      await signIn("credentials", {
        redirect: true,
        email,
        password,
        callbackUrl: "/dashboard",
      });
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background-dark text-slate-50">
      {/* Wrapper to mimic the centered card with side illustration */}
      <div className="flex min-h-screen items-center justify-center px-4 py-10">
        <div className="grid w-full max-w-5xl gap-8 rounded-2xl bg-surface/80 p-6 shadow-xl ring-1 ring-subtle/60 md:grid-cols-[1.2fr,1fr] md:p-8 lg:p-10">
          {/* Left: form */}
          <div className="flex flex-col justify-center">
            {/* Logo + title row */}
            <div className="mb-6 flex items-center gap-3">
              <Link href="/" className="inline-flex">
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 cursor-pointer hover:bg-primary hover:text-background-dark"
                >
                  <UserGroupIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </Link>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  KeepUp
                </p>
                <p className="text-sm text-muted">
                  Build habits that stick, together.
                </p>
              </div>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Create your KeepUp account
            </h1>
            <p className="mt-2 text-sm text-muted">
              Join a community of people staying accountable and building better
              habits every day.
            </p>

            {/* OAuth buttons (placeholders for now) */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-subtle bg-background-dark/40 px-3 text-sm font-medium text-slate-50 transition hover:bg-background-dark/70"
              >
                {/* Google icon here */}
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                className="flex h-10 items-center justify-center gap-2 rounded-lg border border-subtle bg-background-dark/40 px-3 text-sm font-medium text-slate-50 transition hover:bg-background-dark/70"
              >
                {/* Provider icon here */}
                <span>Continue with GitHub</span>
              </button>
            </div>

            {/* Divider */}
            <div className="mt-6 flex items-center gap-3 text-xs text-muted">
              <div className="h-px flex-1 bg-subtle" />
              <span>Or create an account with email</span>
              <div className="h-px flex-1 bg-subtle" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block text-sm">
                <span className="mb-1 block text-muted">Full Name</span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-subtle bg-background-dark/40 px-3 py-2 text-sm text-slate-50 outline-none placeholder:text-muted focus:ring-2 focus:ring-primary"
                  placeholder="Brian Yu"
                />
              </label>

              <label className="block text-sm">
                <span className="mb-1 block text-muted">Email</span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-subtle bg-background-dark/40 px-3 py-2 text-sm text-slate-50 outline-none placeholder:text-muted focus:ring-2 focus:ring-primary"
                  placeholder="you@example.com"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1 block text-muted">Password</span>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full rounded-lg border border-subtle bg-background-dark/40 px-3 py-2 pr-10 text-sm text-slate-50 outline-none placeholder:text-muted focus:ring-2 focus:ring-primary"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted"
                    >
                      <span
                        className="material-symbols-outlined text-[#9db8b4] password-toggle-icon"
                        data-icon="visibility_off"
                      >
                        {showPassword ? "visibility" : "visibility_off"}
                      </span>
                    </button>
                  </div>
                </label>

                <label className="block text-sm">
                  <span className="mb-1 block text-muted">
                    Confirm password
                  </span>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full rounded-lg border border-subtle bg-background-dark/40 px-3 py-2 pr-10 text-sm text-slate-50 outline-none placeholder:text-muted focus:ring-2 focus:ring-primary"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted cursor-pointer"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      <span
                        className="material-symbols-outlined text-[#9db8b4] password-toggle-icon"
                        data-icon="visibility_off"
                      >
                        {showConfirmPassword ? "visibility" : "visibility_off"}
                      </span>
                    </button>
                  </div>
                </label>
              </div>

              <div className="flex items-start gap-2 pt-1 text-xs text-muted">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="
                        mt-0.5 h-4 w-4 cursor-pointer
                        rounded-[0.35rem]
                        border border-subtleS
                        bg-background-dark/40
                        text-primary
                        outline-none
                        focus:ring-2 focus:ring-primary focus:ring-offset-0
                        appearance-none
                        checked:bg-primary checked:text-background-dark
                      "
                />
                <label htmlFor="terms">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="font-medium text-primary hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="font-medium text-primary hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              {error && (
                <div className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer mt-2 flex h-10 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-slate-900 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-muted">
              Already have an account?{" "}
              <Link href="/signin" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
          </div>

          <aside className="mt-6 rounded-xl bg-background-dark/60 p-4 ring-1 ring-subtle/60">
            <button
              type="button"
              onClick={() => setWhyOpen((v) => !v)}
              className="flex w-full items-center justify-between text-left"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  Why KeepUp?
                </p>
                {!whyOpen && (
                  <p className="mt-1 text-xs text-muted">
                    Tap to see how KeepUp helps you stay consistent.
                  </p>
                )}
              </div>
              <span
                className={`transition-transform duration-200 ${
                  whyOpen ? "rotate-180" : ""
                }`}
              >
                ▾
              </span>
            </button>

            {/* Smooth expanding body */}
            <div
              className={`
      overflow-hidden transition-[max-height,opacity] duration-300 ease-out
      ${whyOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"}
    `}
            >
              <div className="space-y-3 text-sm">
                <p className="text-muted">
                  Stay consistent with powerful visual feedback. Track streaks,
                  celebrate milestones, and stay accountable with a supportive
                  community.
                </p>

                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    {/* icon */}
                    <span className="font-medium">
                      Personalized habit tracking
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    {/* icon */}
                    <span className="font-medium">
                      Visual progress insights
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    {/* icon */}
                    <span className="font-medium">
                      Supportive accountability
                    </span>
                  </li>
                </ul>

                <div className="mt-3 rounded-lg bg-surface/80 p-3 text-xs text-muted">
                  “KeepUp has helped me stay consistent with my routines for
                  months. The streaks and community support keep me motivated
                  every day.”
                  <p className="mt-2 font-medium text-slate-50">
                    — Future power user
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (session) {
    return { redirect: { destination: "/dashboard", permanent: false } };
  }
  return { props: {} };
};
