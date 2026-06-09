"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  MapPin,
  MapPinned,
  Weight,
} from "lucide-react";
import { CollectionDatePicker } from "@/components/booking/CollectionDatePicker";
import { PricingBreakdown } from "@/components/booking/PricingBreakdown";
import { useLanguage } from "@/context/LanguageContext";
import {
  calculateBookingCharge,
  formatHkd,
  MATERIAL_IDS,
  MATERIAL_RATES_PER_KG,
  type MaterialId,
  type RemoteAreaId,
  REMOTE_AREA_SURCHARGES,
} from "@/lib/booking/pricing";
import { formatMessage } from "@/lib/i18n";

const REMOTE_AREA_IDS = Object.keys(REMOTE_AREA_SURCHARGES) as RemoteAreaId[];

export default function BookingPage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    address: "",
    date: "",
    materialType: "plastics" as MaterialId,
    estimatedWeight: 5,
    walkUp: false,
    floors: 1,
    bagCount: 1,
    remoteArea: "none" as RemoteAreaId,
  });

  const pricingInput = useMemo(
    () => ({
      materialType: formData.materialType,
      weightKg: formData.estimatedWeight,
      walkUp: formData.walkUp,
      floors: formData.floors,
      bagCount: formData.bagCount,
      remoteArea: formData.remoteArea,
    }),
    [formData],
  );

  const pricing = useMemo(() => calculateBookingCharge(pricingInput), [pricingInput]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <div className="animate-scale-in w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-slate-900">{t.booking.confirmed}</h2>
          <p className="mb-6 text-slate-600">
            {formatMessage(t.booking.confirmedBody, {
              name: formData.name,
              phone: formData.phone,
              date: formData.date,
            })}
          </p>
          <div className="mb-6 space-y-2 rounded-xl border border-slate-100 bg-slate-50 p-4 text-left text-sm">
            <p className="text-slate-500">
              {t.booking.estWeight}{" "}
              <span className="font-medium text-slate-800">{formData.estimatedWeight} kg</span>
            </p>
            <p className="text-slate-500">
              {t.booking.estTotalCharge}{" "}
              <span className="font-bold text-brand-orange-dark">
                HK$ {formatHkd(pricing.totalCharge)}
              </span>
            </p>
          </div>
          <Link href="/" className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm">
            <ArrowLeft className="h-4 w-4" /> {t.booking.backHome}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 font-medium text-slate-500 transition hover:text-slate-800"
        >
          <ArrowLeft className="h-4 w-4" /> {t.booking.back}
        </Link>

        <div className="animate-fade-in-up overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="gradient-mesh border-b border-slate-100 p-6 sm:p-10">
            <h1 className="text-3xl font-extrabold text-slate-900">{t.booking.title}</h1>
            <p className="mt-2 text-slate-600">{t.booking.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  {t.booking.fullName}
                </label>
                <input
                  type="text"
                  required
                  className="input-brand w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.booking.namePlaceholder}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  {t.booking.phone}
                </label>
                <input
                  type="tel"
                  required
                  className="input-brand w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={t.booking.phonePlaceholder}
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {t.booking.region}
              </label>
              <select
                required
                className="input-brand w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              >
                <option value="">{t.booking.selectRegion}</option>
                {t.booking.regions.map((dist, idx) => (
                  <option key={idx} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {t.booking.address}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <textarea
                  required
                  rows={2}
                  className="input-brand w-full resize-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder={t.booking.addressPlaceholder}
                />
              </div>
            </div>

            <CollectionDatePicker
              required
              value={formData.date}
              onChange={(date) => setFormData({ ...formData, date })}
            />

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {t.booking.material}
              </label>
              <select
                className="input-brand w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
                value={formData.materialType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    materialType: e.target.value as MaterialId,
                  })
                }
              >
                {MATERIAL_IDS.map((id) => (
                  <option key={id} value={id}>
                    {t.booking.materials[id]} (HK$ {MATERIAL_RATES_PER_KG[id]}
                    {t.booking.perKg})
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <div className="mb-2 flex items-center justify-between">
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                  <Weight className="h-4 w-4 text-slate-500" /> {t.booking.weight}
                </label>
                <span className="text-lg font-bold text-slate-900">
                  {formData.estimatedWeight} kg
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="100"
                className="h-2 w-full cursor-pointer rounded-lg bg-slate-200 accent-brand-cyan-dark"
                value={formData.estimatedWeight}
                onChange={(e) =>
                  setFormData({ ...formData, estimatedWeight: parseInt(e.target.value, 10) })
                }
              />
              <div className="mt-1 flex justify-between text-xs text-slate-400">
                <span>{t.booking.minWeight}</span>
                <span>{t.booking.maxWeight}</span>
              </div>
            </div>

            {/* Walk-up (Tong Lau) surcharge */}
            <fieldset className="rounded-2xl border border-slate-200 bg-white p-5">
              <legend className="flex items-center gap-2 px-1 text-sm font-bold text-slate-800">
                <Building2 className="h-4 w-4 text-violet-600" />
                {t.booking.walkUpTitle}
              </legend>
              <p className="mt-1 text-xs text-slate-500">{t.booking.walkUpDesc}</p>
              <label className="mt-3 flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={formData.walkUp}
                  onChange={(e) => setFormData({ ...formData, walkUp: e.target.checked })}
                  className="mt-0.5 accent-violet-600"
                />
                <span className="text-sm text-slate-700">{t.booking.walkUpToggle}</span>
              </label>
              {formData.walkUp && (
                <div className="animate-fade-in mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600">
                      {t.booking.floors}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={40}
                      className="input-brand w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                      value={formData.floors}
                      onChange={(e) =>
                        setFormData({ ...formData, floors: parseInt(e.target.value, 10) || 1 })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600">
                      {t.booking.bagCount}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      className="input-brand w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                      value={formData.bagCount}
                      onChange={(e) =>
                        setFormData({ ...formData, bagCount: parseInt(e.target.value, 10) || 1 })
                      }
                    />
                  </div>
                  <p className="sm:col-span-2 text-xs text-violet-700">{t.booking.walkUpRateNote}</p>
                </div>
              )}
            </fieldset>

            {/* Remote area surcharge */}
            <fieldset className="rounded-2xl border border-slate-200 bg-white p-5">
              <legend className="flex items-center gap-2 px-1 text-sm font-bold text-slate-800">
                <MapPinned className="h-4 w-4 text-amber-600" />
                {t.booking.remoteAreaTitle}
              </legend>
              <p className="mt-1 text-xs text-slate-500">{t.booking.remoteAreaDesc}</p>
              <select
                className="input-brand mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm"
                value={formData.remoteArea}
                onChange={(e) =>
                  setFormData({ ...formData, remoteArea: e.target.value as RemoteAreaId })
                }
              >
                {REMOTE_AREA_IDS.map((id) => (
                  <option key={id} value={id}>
                    {t.booking.remoteAreas[id]}
                  </option>
                ))}
              </select>
            </fieldset>

            <PricingBreakdown input={pricingInput} />

            <button type="submit" className="btn-primary w-full rounded-xl py-4 text-lg">
              {t.booking.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
