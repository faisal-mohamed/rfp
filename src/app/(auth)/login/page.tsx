"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(email, password);
    if (ok) {
      // remember is UI-only per requirements
      router.push("/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <main className="min-h-svh relative flex items-center justify-center px-4 py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(40%_50%_at_50%_0%,rgba(59,130,246,0.15),rgba(255,255,255,0))]" />
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-slate-200 bg-white/75 shadow-md backdrop-blur supports-[backdrop-filter]:backdrop-blur">
          <div className="p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-700 shadow" aria-hidden />
              <div>
                <h1 className="text-lg font-semibold tracking-tight text-slate-900">Sign in to BlueDash</h1>
                <p className="text-sm text-slate-600">Use the admin credentials to continue</p>
              </div>
            </div>

            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-xs font-medium text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
                    aria-pressed={showPassword}
                  >
                    {showPassword ? "Hide" : "Show"} password
                  </button>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                  />
                  Remember me
                </label>
                <span className="text-xs text-slate-500">admin@example.com / Admin@123</span>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}


