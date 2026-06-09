"use client";

import Link from "next/link";
import { useState } from "react";
import { useCookies } from "@/context/CookieContext";
import { useLanguage } from "@/context/LanguageContext";

export function CookieBanner() {
  const { bannerVisible, acceptAll, rejectNonEssential, savePreferences } = useCookies();
  const { t } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  if (!bannerVisible) return null;

  return (
    <div
      role="dialog"
      aria-label={t.cookies.dialogLabel}
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10 sm:p-6">
        <h2 className="font-display text-lg font-semibold text-slate-900">{t.cookies.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {t.cookies.body}{" "}
          <Link href="/cookies" className="link-brand underline">
            {t.cookies.policyLink}
          </Link>
          {t.cookies.bodySuffix}
        </p>

        {showDetails && (
          <div className="mt-4 space-y-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm">
            <label className="flex items-start gap-3 opacity-70">
              <input type="checkbox" checked disabled className="mt-1" />
              <span>
                <strong className="text-slate-800">{t.cookies.necessary}</strong>
                <span className="block text-slate-500">{t.cookies.necessaryDesc}</span>
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
                <strong className="text-slate-800">{t.cookies.analytics}</strong>
                <span className="block text-slate-500">{t.cookies.analyticsDesc}</span>
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
                <strong className="text-slate-800">{t.cookies.marketing}</strong>
                <span className="block text-slate-500">{t.cookies.marketingDesc}</span>
              </span>
            </label>
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={acceptAll} className="btn-primary rounded-full px-5 py-2.5 text-sm">
            {t.cookies.acceptAll}
          </button>
          <button
            type="button"
            onClick={rejectNonEssential}
            className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            {t.cookies.reject}
          </button>
          {showDetails ? (
            <button
              type="button"
              onClick={() => savePreferences({ analytics, marketing })}
              className="badge-brand rounded-full px-5 py-2.5 text-sm font-semibold transition hover:bg-brand-cyan-muted/80"
            >
              {t.cookies.save}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowDetails(true)}
              className="link-brand rounded-full px-5 py-2.5 text-sm font-semibold transition hover:bg-brand-cyan-muted/60"
            >
              {t.cookies.customize}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
