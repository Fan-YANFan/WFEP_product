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
      <section className="gradient-mesh relative w-full overflow-hidden border-b border-slate-200/60 px-4 py-20 text-center">
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand-cyan/20 blur-3xl animate-float" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-brand-orange/15 blur-3xl animate-float stagger-3" />

        <div className="relative mx-auto max-w-3xl">
          <p className="badge-brand animate-fade-in inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider shadow-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-gradient" />
            {t.home.badge}
          </p>
          <h1 className="animate-fade-in-up stagger-1 mt-6 mb-6 text-5xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
            {t.home.titleLine1} <br />
            <span className="text-brand-gradient">{t.home.titleLine2}</span>
          </h1>
          <p className="animate-fade-in-up stagger-2 mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-slate-600">
            {t.home.subtitle}
          </p>
          <Link
            href="/booking"
            className="btn-primary animate-fade-in-up stagger-3 inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg"
          >
            {t.home.cta} <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 md:grid-cols-3">
        <Feature
          icon={<Map className="h-6 w-6 text-blue-500" />}
          title={t.home.feature1Title}
          desc={t.home.feature1Desc}
          delay="stagger-1"
          accent="from-blue-50 to-sky-50 border-blue-100"
        />
        <Feature
          icon={<Recycle className="h-6 w-6 text-emerald-500" />}
          title={t.home.feature2Title}
          desc={t.home.feature2Desc}
          delay="stagger-2"
          accent="from-emerald-50 to-green-50 border-emerald-100"
        />
        <Feature
          icon={<ShieldCheck className="h-6 w-6 text-violet-500" />}
          title={t.home.feature3Title}
          desc={t.home.feature3Desc}
          delay="stagger-3"
          accent="from-violet-50 to-purple-50 border-violet-100"
        />
      </section>

      <section className="animate-fade-in border-b border-t border-slate-200/80 bg-white py-16">
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
                className="link-brand font-medium underline"
              >
                {t.home.csdiPortal}
              </a>
              {t.home.explorerDescSuffix}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 shadow-inner">
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
  delay: string;
  accent: string;
}

function Feature({ icon, title, desc, delay, accent }: FeatureProps) {
  return (
    <div
      className={`hover-lift animate-fade-in-up ${delay} rounded-2xl border bg-gradient-to-br p-8 shadow-sm ${accent}`}
    >
      <div className="mb-4 inline-flex rounded-xl bg-white/80 p-3 shadow-sm backdrop-blur-sm">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-slate-800">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-600 md:text-base">{desc}</p>
    </div>
  );
}
