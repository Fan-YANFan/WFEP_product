"use client";

import Link from "next/link";
import { useState } from "react";
import { useCookies } from "@/context/CookieContext";

export function CookieBanner() {
  const { bannerVisible, acceptAll, rejectNonEssential, savePreferences } = useCookies();
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  if (!bannerVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10 sm:p-6">
        <h2 className="font-display text-lg font-semibold text-slate-900">Cookie settings</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          We use cookies to run our site, understand usage, and personalize offers. You can accept
          all, reject non-essential cookies, or customize your choices. See our{" "}
          <Link href="/cookies" className="link-brand underline">
            Cookie Policy
          </Link>
          .
        </p>

        {showDetails && (
          <div className="mt-4 space-y-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm">
            <label className="flex items-start gap-3 opacity-70">
              <input type="checkbox" checked disabled className="mt-1" />
              <span>
                <strong className="text-slate-800">Strictly necessary</strong>
                <span className="block text-slate-500">Required for checkout, security, and preferences.</span>
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-1 accent-brand-cyan"
              />
              <span>
                <strong className="text-slate-800">Analytics</strong>
                <span className="block text-slate-500">Helps us improve pages and measure performance.</span>
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="mt-1 accent-brand-cyan"
              />
              <span>
                <strong className="text-slate-800">Marketing</strong>
                <span className="block text-slate-500">Personalized content and promotional emails.</span>
              </span>
            </label>
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={acceptAll}
            className="btn-primary rounded-full px-5 py-2.5 text-sm"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={rejectNonEssential}
            className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Reject non-essential
          </button>
          {showDetails ? (
            <button
              type="button"
              onClick={() => savePreferences({ analytics, marketing })}
              className="badge-brand rounded-full px-5 py-2.5 text-sm font-semibold transition hover:bg-brand-cyan-muted/80"
            >
              Save preferences
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowDetails(true)}
              className="link-brand rounded-full px-5 py-2.5 text-sm font-semibold transition hover:bg-brand-cyan-muted/60"
            >
              Customize
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
