// src/pages/signin.tsx
import { useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { signIn } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";

const SignInPage: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/dashboard",
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }
    if (res?.ok && res.url) window.location.href = res.url;
  };

  return (
    <main className="min-h-screen bg-[#041e1a] text-slate-50">
      {/* full-screen center */}
      <div className="flex min-h-screen items-center justify-center px-4 py-10">
        {/* main card: left form, right image */}
        <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-[#111817] shadow-2xl md:grid-cols-2">
          {/* LEFT: form panel */}
          <div className="px-8 py-10 sm:px-10 sm:py-12">
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-[#7c8f8c]">
              Log in to track your habits and connect with friends.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Email */}
              <div className="space-y-2 text-sm">
                <label htmlFor="email" className="font-medium text-base">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-md border border-[#253734] bg-[#071f1c] px-3 py-2 text-sm text-slate-50 outline-none placeholder:text-[#5d6f6c] focus:border-[#30e8c9] focus:ring-1 focus:ring-[#30e8c9] mt-1"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div className="space-y-2 text-sm">
                <label htmlFor="password" className="font-medium text-base">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 w-full rounded-md border border-[#253734] bg-[#071f1c] px-3 py-2 pr-10 text-sm text-slate-50 outline-none placeholder:text-[#5d6f6c] focus:border-[#30e8c9] focus:ring-1 focus:ring-[#30e8c9]"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/3 text-[#5d6f6c] hover:text-slate-200"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <span
                      className="material-symbols-outlined text-[#9db8b4] password-toggle-icon"
                      data-icon="visibility_off"
                    >
                      {showPassword ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
                <div className="mt-1 text-right text-xs">
                  <a href="#" className="text-[#30e8c9] hover:underline">
                    Forgot Password?
                  </a>
                </div>
              </div>

              {error && (
                <div className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                  {error}
                </div>
              )}

              {/* Log in button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex h-11 w-full items-center justify-center rounded-md bg-[#30e8c9] text-sm font-semibold text-[#04201c] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 text-sm text-[#9db8b4]">
                <div className="h-px flex-1 bg-[#3c534f]" />
                <span>OR</span>
                <div className="h-px flex-1 bg-[#3c534f]" />
              </div>

              {/* Providers */}
              <button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="flex h-11 w-full items-center justify-center gap-3 rounded-md border border-[#253734] bg-[#071f1c] text-sm font-medium text-slate-50 transition hover:bg-[#0b2623]"
              >
                {/* Google icon */}
                <span className="text-lg"></span>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                className="flex h-11 w-full items-center justify-center gap-3 rounded-md border border-[#253734] bg-[#071f1c] text-sm font-medium text-slate-50 transition hover:bg-[#0b2623]"
              >
                {/* Apple icon */}
                <span className="text-lg"></span>
                <span>Continue with Github</span>
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-[#7c8f8c]">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#30e8c9] hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

          {/* RIGHT: image panel */}
          <div
            className="hidden bg-cover bg-center md:block"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuASKbpyuaXlaPnL-yp2GPh88GM5YDt1b1l4gj6yphWYZNb1JOPr9UE9_zIWfl61A0d_ruQ85dBq_S3SfyY-UnWRC0cXiRXp_HvkiYMppqDy8kZXaVDRNM_iv7zfzsJj5tLD-n3UH9vBI9839EXH1KoyFoaUjv-RBnnlbUBZ3wY7_szpDf8KEuQfY-CfombTEfLXaNt6cksCykyKZKCwl7g1GJ3Lp2VqXPPWCGAGgJ4v0p2KM8t_Pg22EPE1K7QML1ncqwmgynwb4baf')",
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </main>
  );
};

export default SignInPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (session) {
    return { redirect: { destination: "/dashboard", permanent: false } };
  }
  return { props: {} };
};
