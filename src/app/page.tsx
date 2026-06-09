import type { Metadata } from "next";
import Link from 'next/link';
import { ArrowRight, Recycle, ShieldCheck, Map } from 'lucide-react';
import { RecyclingPointsExplorer } from "@/components/RecyclingPointsExplorer";
import { CSDI_DATA_ATTRIBUTION, CSDI_PORTAL_URL } from "@/lib/csdi/constants";

export const metadata: Metadata = {
  title: "Recycling in Hong Kong | Simplified",
  description:
    "Find Hong Kong recyclable collection points or book a professional door-to-door pickup. Live data from EPD via CSDI.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/30">
      {/* Hero Section */}
      <section className="w-full py-20 px-4 text-center bg-gradient-to-b from-green-50 to-slate-50 border-b border-slate-200/60">
        <div className="max-w-3xl mx-auto">
          <p className="badge-brand inline-flex items-center gap-2 rounded-full bg-white border border-emerald-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            Hong Kong · Smart Recycling
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mt-6 mb-6 text-slate-900">
            Recycling in HK <br />
            <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">Simplified.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Professional door-to-door collection. We weigh it, we pay it, you save the planet. 
            Or use our explorer below to find public drop-off points.
          </p>
          <Link 
            href="/booking" 
            className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-green-700 hover:scale-[1.02] transition-all shadow-lg shadow-green-200"
          >
            Start Your First Pickup <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8 px-4 py-16 max-w-6xl mx-auto w-full">
        <Feature icon={<Map className="text-blue-500 w-6 h-6" />} title="All 18 Districts" desc="From Central to Yuen Long, our pickup fleet covers the whole territory." />
        <Feature icon={<Recycle className="text-green-500 w-6 h-6" />} title="Verified Recycling" desc="We partner with Green@Community to ensure 100% material recovery." />
        <Feature icon={<ShieldCheck className="text-purple-500 w-6 h-6" />} title="Fair Pricing" desc="Live weight-based calculation. No hidden transport fees." />
      </section>

      {/* Interactive Map Explorer Section */}
      <section className="border-t border-b border-slate-200/80 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Find Public Recyclable Collection Points
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              Prefer to drop it off yourself? Search public recycling bins across Hong Kong via the{" "}
              <a
                href={CSDI_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline font-medium"
              >
                CSDI geoportal
              </a>
              .
            </p>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-inner">
            <RecyclingPointsExplorer />
          </div>
        </div>
      </section>

      {/* Footer / Data Source Attribution */}
      <section className="bg-slate-50 border-t border-slate-200 mt-auto">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <p className="text-xs leading-relaxed text-slate-500">
            <span className="font-semibold text-slate-600">Data source: </span>
            {CSDI_DATA_ATTRIBUTION}. Dataset layer: geotagging. Map explorer updates are irregular when
            locations change. This finder is for convenience only; verify details on site or via official channels.
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
    <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition duration-200">
      <div className="mb-4 p-3 bg-slate-50 inline-block rounded-xl">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-slate-800">{title}</h3>
      <p className="text-slate-500 leading-relaxed text-sm md:text-base">{desc}</p>
    </div>
  );
}