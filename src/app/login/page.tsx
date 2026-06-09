"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import type { Translations } from "@/lib/i18n";

function translateAuthError(message: string | undefined, t: Translations): string {
  const map: Record<string, keyof Translations["login"]["errors"]> = {
    "Email and password are required.": "required",
    "No account found. Please sign up first.": "notFound",
    "Incorrect password.": "wrongPassword",
    "Password must be at least 6 characters.": "shortPassword",
    "An account with this email already exists. Please log in.": "exists",
  };
  if (!message) return t.login.errors.generic;
  const key = map[message];
  return key ? t.login.errors[key] : t.login.errors.generic;
}

export default function LoginPage() {
  const router = useRouter();
  const { member, ready, login, signup } = useAuth();
  const { t } = useLanguage();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (ready && member) {
      router.replace("/account");
    }
  }, [ready, member, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const result = mode === "login" ? await login(email, password) : await signup(email, password);

    setSubmitting(false);
    if (result.ok) {
      router.push("/account");
    } else {
      setError(translateAuthError(result.error, t));
    }
  }

  if (!ready || member) {
    return null;
  }

  return (
    <section className="gradient-mesh flex flex-1 items-center justify-center px-4 py-16 sm:px-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <h1 className="font-display text-2xl font-semibold text-slate-900">
          {mode === "login" ? t.login.loginTitle : t.login.signupTitle}
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          {mode === "login" ? t.login.loginDesc : t.login.signupDesc}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              {t.login.email}
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input-brand mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-slate-700">
              {t.login.password}
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-brand mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full rounded-full py-3 text-sm disabled:opacity-60"
          >
            {submitting
              ? t.login.pleaseWait
              : mode === "login"
                ? t.login.submitLogin
                : t.login.submitSignup}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          {mode === "login" ? (
            <>
              {t.login.noAccount}{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setError(null);
                }}
                className="link-brand font-semibold"
              >
                {t.login.signupLink}
              </button>
            </>
          ) : (
            <>
              {t.login.hasAccount}{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError(null);
                }}
                className="link-brand font-semibold"
              >
                {t.login.loginLink}
              </button>
            </>
          )}
        </p>

        <Link
          href="/"
          className="mt-4 block text-center text-sm font-medium text-slate-500 hover:text-slate-700"
        >
          {t.common.backToHome}
        </Link>
      </div>
    </section>
  );
}
