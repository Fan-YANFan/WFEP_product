import type { Metadata } from "next";
import Link from "next/link";
import { RecyclingPointsExplorer } from "@/components/RecyclingPointsExplorer";
import { CSDI_DATA_ATTRIBUTION, CSDI_PORTAL_URL } from "@/lib/csdi/constants";

export const metadata: Metadata = {
  title: "Recycling points",
  description:
    "Find Hong Kong recyclable collection points — paper, metals, plastics, glass, e-waste, and more. Live data from EPD via CSDI.",
};

export default function RecyclingPage() {
  return (
    <>
      <section className="gradient-mesh border-b border-slate-200/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-18">
          <p className="inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-teal-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-800">
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
              className="font-medium text-teal-700 underline hover:text-teal-900"
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
          <Link
            href="/"
            className="mt-4 inline-block text-sm font-semibold text-teal-700 hover:text-teal-900"
          >
            ← Back to home
          </Link>
        </div>
      </section>
    </>
  );
}
