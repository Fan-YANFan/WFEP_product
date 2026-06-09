"use client";

import { useLanguage } from "@/context/LanguageContext";
import { LOCALES } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      className="flex items-center rounded-full border border-slate-200 bg-white p-0.5 text-xs font-semibold shadow-sm"
      role="group"
      aria-label={t.language.label}
    >
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`rounded-full px-3 py-1.5 transition ${
            locale === code
              ? "bg-brand-gradient text-white shadow-sm"
              : "text-slate-600 hover:bg-brand-cyan-muted/60 hover:text-slate-900"
          }`}
          aria-pressed={locale === code}
          aria-label={code === "en" ? t.language.switchToEn : t.language.switchTo}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
