"use client";

import { Building2, MapPinned, Package, Truck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  calculateBookingCharge,
  formatHkd,
  type BookingPricingInput,
  type RemoteAreaId,
} from "@/lib/booking/pricing";
import { formatMessage } from "@/lib/i18n";

interface PricingBreakdownProps {
  input: BookingPricingInput;
}

export function PricingBreakdown({ input }: PricingBreakdownProps) {
  const { t } = useLanguage();
  const pricing = calculateBookingCharge(input);

  return (
    <div className="animate-scale-in rounded-2xl border border-brand-cyan/20 bg-gradient-to-br from-brand-cyan-muted/40 to-brand-orange-muted/30 p-5">
      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700">
        <Truck className="h-4 w-4 text-brand-cyan-dark" />
        {t.booking.pricingTitle}
      </h3>

      <p className="mt-2 rounded-lg bg-white/70 px-3 py-2 font-mono text-xs leading-relaxed text-slate-600">
        {t.booking.pricingFormula}
      </p>
      <p className="mt-1.5 text-xs text-slate-500">{t.booking.pricingFormulaNote}</p>

      <dl className="mt-4 space-y-2.5 text-sm">
        <LineItem
          icon={<Truck className="h-3.5 w-3.5" />}
          label={t.booking.baseLogisticsFee}
          hint={t.booking.baseLogisticsNote}
          value={pricing.baseLogisticsFee}
        />
        <LineItem
          icon={<Package className="h-3.5 w-3.5" />}
          label={t.booking.weightCharge}
          hint={formatMessage(t.booking.weightChargeFormula, {
            weight: pricing.weightKg,
            rate: pricing.ratePerKg,
          })}
          value={pricing.weightCharge}
        />
        {pricing.walkUpFee > 0 && (
          <LineItem
            icon={<Building2 className="h-3.5 w-3.5" />}
            label={t.booking.walkUpFee}
            hint={`${pricing.walkUpFloors} × ${pricing.walkUpBags} × HK$ ${pricing.walkUpRatePerFloorPerBag}`}
            value={pricing.walkUpFee}
            accent
          />
        )}
        {pricing.remoteAreaFee > 0 && (
          <LineItem
            icon={<MapPinned className="h-3.5 w-3.5" />}
            label={t.booking.remoteAreaTitle}
            hint={t.booking.remoteAreas[pricing.remoteArea as RemoteAreaId]}
            value={pricing.remoteAreaFee}
            accent
          />
        )}
      </dl>

      <p className="mt-3 text-xs leading-relaxed text-slate-500">{t.booking.tunnelNote}</p>

      <div className="mt-4 flex items-center justify-between border-t border-slate-200/80 pt-4">
        <span className="text-sm font-semibold text-slate-700">{t.booking.totalCharge}</span>
        <span className="text-2xl font-black text-brand-orange-dark transition-all duration-300">
          HK$ {formatHkd(pricing.totalCharge)}
        </span>
      </div>
    </div>
  );
}

function LineItem({
  icon,
  label,
  hint,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  hint?: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex items-start justify-between gap-3 rounded-xl px-3 py-2 ${
        accent ? "bg-violet-50/80" : "bg-white/60"
      }`}
    >
      <div className="min-w-0">
        <dt className="flex items-center gap-1.5 font-medium text-slate-800">
          <span className="text-slate-400">{icon}</span>
          {label}
        </dt>
        {hint && <dd className="mt-0.5 text-xs text-slate-500">{hint}</dd>}
      </div>
      <dd className="shrink-0 font-semibold text-slate-900">HK$ {formatHkd(value)}</dd>
    </div>
  );
}
