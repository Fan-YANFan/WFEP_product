"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, CheckCircle2, MapPin, Weight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { formatMessage } from "@/lib/i18n";

const MATERIAL_IDS = ["plastics", "paper", "metals", "ewaste"] as const;
const MATERIAL_RATES: Record<(typeof MATERIAL_IDS)[number], number> = {
  plastics: 1.5,
  paper: 1.0,
  metals: 2.5,
  ewaste: 0.5,
};

export default function BookingPage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    address: "",
    date: "",
    materialType: "plastics" as (typeof MATERIAL_IDS)[number],
    estimatedWeight: 5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const currentRate = MATERIAL_RATES[formData.materialType];
  const estimatedPayout = (formData.estimatedWeight * currentRate).toFixed(1);

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-xl">
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
          <div className="mb-6 rounded-xl border border-slate-100 bg-slate-50 p-4 text-left text-sm">
            <p className="text-slate-500">
              {t.booking.estWeight}{" "}
              <span className="font-medium text-slate-800">{formData.estimatedWeight} kg</span>
            </p>
            <p className="text-slate-500">
              {t.booking.estCashback}{" "}
              <span className="font-bold text-green-600">HK$ {estimatedPayout}</span>
            </p>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 font-semibold text-green-600 hover:underline">
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

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-gradient-to-r from-green-50 to-emerald-50/50 p-6 sm:p-10">
            <h1 className="text-3xl font-extrabold text-slate-900">{t.booking.title}</h1>
            <p className="mt-2 text-slate-600">{t.booking.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">{t.booking.fullName}</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 transition focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.booking.namePlaceholder}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">{t.booking.phone}</label>
                <input
                  type="tel"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 transition focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={t.booking.phonePlaceholder}
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">{t.booking.region}</label>
              <select
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 transition focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
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
              <label className="mb-1 block text-sm font-medium text-slate-700">{t.booking.address}</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <textarea
                  required
                  rows={2}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 transition focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder={t.booking.addressPlaceholder}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">{t.booking.date}</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="date"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 transition focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">{t.booking.material}</label>
                <select
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 transition focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  value={formData.materialType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      materialType: e.target.value as (typeof MATERIAL_IDS)[number],
                    })
                  }
                >
                  {MATERIAL_IDS.map((id) => (
                    <option key={id} value={id}>
                      {t.booking.materials[id]} (HK$ {MATERIAL_RATES[id]}/kg)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <div className="mb-2 flex items-center justify-between">
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                  <Weight className="h-4 w-4 text-slate-500" /> {t.booking.weight}
                </label>
                <span className="text-lg font-bold text-slate-900">{formData.estimatedWeight} kg</span>
              </div>
              <input
                type="range"
                min="2"
                max="100"
                className="h-2 w-full cursor-pointer rounded-lg bg-slate-200 accent-green-600"
                value={formData.estimatedWeight}
                onChange={(e) =>
                  setFormData({ ...formData, estimatedWeight: parseInt(e.target.value, 10) })
                }
              />
              <div className="mt-1 flex justify-between text-xs text-slate-400">
                <span>{t.booking.minWeight}</span>
                <span>{t.booking.maxWeight}</span>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-200/60 pt-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {t.booking.estPayout}
                </span>
                <span className="text-2xl font-black text-green-600">HK$ {estimatedPayout}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-green-600 py-4 text-lg font-bold text-white shadow-md shadow-green-100 transition duration-150 hover:bg-green-700"
            >
              {t.booking.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
