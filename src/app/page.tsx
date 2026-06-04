import type { Metadata } from "next";
import { RecyclingPointsExplorer } from "@/components/RecyclingPointsExplorer";
import { CSDI_DATA_ATTRIBUTION, CSDI_PORTAL_URL } from "@/lib/csdi/constants";

export const metadata: Metadata = {
  title: "Recycling points",
  description:
    "Find Hong Kong recyclable collection points — paper, metals, plastics, glass, e-waste, and more. Live data from EPD via CSDI.",
};

export default function HomePage() {
  return (
    <>
      <section className="gradient-mesh border-b border-slate-200/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-18">
          <p className="badge-brand inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
            Hong Kong · Live open data
          </p>
          <h1 className="font-display mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Recyclable collection points
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            Search public recycling bins and collection points across Hong Kong — paper, metals,
            plastics, glass, lamps, batteries, small appliances, clothes, and more. Data is
            provided by the Environmental Protection Department through the{" "}
            <a
              href={CSDI_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-brand underline"
            >
              CSDI geoportal
            </a>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <RecyclingPointsExplorer />
      </section>

      <section className="border-t border-slate-200 bg-slate-50/80">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <p className="text-xs leading-relaxed text-slate-500">
            <span className="font-semibold text-slate-600">Data source: </span>
            {CSDI_DATA_ATTRIBUTION}. Dataset layer: geotagging. Updates are irregular when
            locations change. This finder is for convenience only; verify details on site or via
            official channels.
          </p>
        </div>
      </section>
    </>
  );
}

import Link from 'next/link';
import { ArrowRight, Recycle, ShieldCheck, Map } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 px-6 text-center bg-gradient-to-b from-green-50 to-slate-50">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          Recycling in HK <br /><span className="text-green-600">Simplified.</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          Professional door-to-door collection. We weigh it, we pay it, you save the planet.
        </p>
        <Link href="/booking" className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:scale-105 transition-all shadow-lg shadow-green-200">
          Start Your First Pickup <ArrowRight />
        </Link>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 px-6 py-20 max-w-6xl">
        <Feature icon={<Map className="text-blue-500" />} title="All 18 Districts" desc="From Central to Yuen Long, our fleet covers the whole territory." />
        <Feature icon={<Recycle className="text-green-500" />} title="Verified Recycling" desc="We partner with Green@Community to ensure 100% material recovery." />
        <Feature icon={<ShieldCheck className="text-purple-500" />} title="Fair Pricing" desc="Live weight-based calculation. No hidden transport fees." />
      </section>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}
