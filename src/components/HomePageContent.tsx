"use client";

import Link from "next/link";
import { ArrowRight, Map, Recycle, ShieldCheck } from "lucide-react";
import { RecyclingPointsExplorer } from "@/components/RecyclingPointsExplorer";
import { useLanguage } from "@/context/LanguageContext";
import { CSDI_DATA_ATTRIBUTION, CSDI_PORTAL_URL } from "@/lib/csdi/constants";

export function HomePageContent() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/30">
      <section className="w-full border-b border-slate-200/60 bg-gradient-to-b from-green-50 to-slate-50 px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="badge-brand inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800 shadow-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
            {t.home.badge}
          </p>
          <h1 className="mt-6 mb-6 text-5xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
            {t.home.titleLine1} <br />
            <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              {t.home.titleLine2}
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-slate-600">
            {t.home.subtitle}
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-green-200 transition-all hover:scale-[1.02] hover:bg-green-700"
          >
            {t.home.cta} <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 md:grid-cols-3">
        <Feature
          icon={<Map className="h-6 w-6 text-blue-500" />}
          title={t.home.feature1Title}
          desc={t.home.feature1Desc}
        />
        <Feature
          icon={<Recycle className="h-6 w-6 text-green-500" />}
          title={t.home.feature2Title}
          desc={t.home.feature2Desc}
        />
        <Feature
          icon={<ShieldCheck className="h-6 w-6 text-purple-500" />}
          title={t.home.feature3Title}
          desc={t.home.feature3Desc}
        />
      </section>

      <section className="border-b border-t border-slate-200/80 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              {t.home.explorerTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              {t.home.explorerDesc}{" "}
              <a
                href={CSDI_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-green-600 hover:underline"
              >
                {t.home.csdiPortal}
              </a>
              {t.home.explorerDescSuffix}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-inner">
            <RecyclingPointsExplorer />
          </div>
        </div>
      </section>

      <section className="mt-auto border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <p className="text-xs leading-relaxed text-slate-500">
            <span className="font-semibold text-slate-600">{t.common.dataSource}: </span>
            {CSDI_DATA_ATTRIBUTION}. {t.home.dataNote}
          </p>
        </div>
      </section>
    </div>
  );
}

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

function Feature({ icon, title, desc }: FeatureProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition duration-200 hover:shadow-md">
      <div className="mb-4 inline-block rounded-xl bg-slate-50 p-3">{icon}</div>
      <h3 className="mb-2 text-xl font-bold text-slate-800">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-500 md:text-base">{desc}</p>
    </div>
  );
}
