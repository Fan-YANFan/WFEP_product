"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useLanguage } from "@/context/LanguageContext";

type LegalLayoutProps = {
  title: string;
  updated: string;
  children: ReactNode;
};

export function LegalLayout({ title, updated, children }: LegalLayoutProps) {
  const { t } = useLanguage();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href="/" className="link-brand text-sm font-medium transition">
        {t.common.backToHome}
      </Link>
      <h1 className="font-display mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        {t.common.lastUpdated}: {updated}
      </p>
      <div className="legal-prose mt-10 space-y-4 text-base">{children}</div>
    </article>
  );
}
