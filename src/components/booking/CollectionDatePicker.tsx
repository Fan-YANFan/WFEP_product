"use client";

import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface CollectionDatePickerProps {
  value: string;
  onChange: (isoDate: string) => void;
  required?: boolean;
}

function toYmd(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseYmd(value: string): Date | null {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function CollectionDatePicker({ value, onChange, required }: CollectionDatePickerProps) {
  const { locale, t } = useLanguage();
  const intlLocale = locale === "zh" ? "zh-Hant-HK" : "en-HK";
  const today = useMemo(() => startOfDay(new Date()), []);

  const selected = parseYmd(value);
  const [viewDate, setViewDate] = useState(() => selected ?? today);

  const monthLabel = new Intl.DateTimeFormat(intlLocale, {
    month: "long",
    year: "numeric",
  }).format(viewDate);

  const weekdayLabels = useMemo(() => {
    const base = new Date(2024, 0, 7); // Sunday
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      return new Intl.DateTimeFormat(intlLocale, { weekday: "short" }).format(d);
    });
  }, [intlLocale]);

  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const startOffset = firstOfMonth.getDay();
    const gridStart = new Date(year, month, 1 - startOffset);

    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + i);
      return d;
    });
  }, [viewDate]);

  const selectedLabel = selected
    ? new Intl.DateTimeFormat(intlLocale, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(selected)
    : t.booking.selectDateHint;

  function shiftMonth(delta: number) {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  }

  function selectDay(day: Date) {
    if (startOfDay(day) < today) return;
    onChange(toYmd(day));
  }

  return (
    <div className="collection-date-picker">
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
        <CalendarDays className="h-4 w-4 text-brand-cyan-dark" />
        {t.booking.date}
        {required && <span className="text-brand-orange-dark">*</span>}
      </label>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white via-brand-cyan-muted/20 to-brand-orange-muted/15 shadow-sm">
        {/* Selected date hero */}
        <div className="border-b border-slate-200/60 bg-white/80 px-5 py-4 sm:px-6 sm:py-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {t.booking.selectedDate}
          </p>
          <p
            className={`mt-1 font-display text-xl font-semibold sm:text-2xl ${
              selected ? "text-slate-900" : "text-slate-400"
            }`}
          >
            {selectedLabel}
          </p>
        </div>

        {/* Month navigation */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-5">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-brand-cyan hover:bg-brand-cyan-muted/50 hover:text-brand-cyan-foreground"
            aria-label={t.booking.prevMonth}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <p className="text-base font-bold text-slate-800 sm:text-lg">{monthLabel}</p>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-brand-cyan hover:bg-brand-cyan-muted/50 hover:text-brand-cyan-foreground"
            aria-label={t.booking.nextMonth}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 px-3 pb-1 sm:gap-1.5 sm:px-4">
          {weekdayLabels.map((label) => (
            <div
              key={label}
              className="py-1 text-center text-[11px] font-bold uppercase tracking-wide text-slate-400 sm:text-xs"
            >
              {label}
            </div>
          ))}
        </div>

        {/* Day grid — enlarged cells */}
        <div className="grid grid-cols-7 gap-1 px-3 pb-4 sm:gap-1.5 sm:px-4 sm:pb-5">
          {calendarDays.map((day) => {
            const inMonth = day.getMonth() === viewDate.getMonth();
            const disabled = startOfDay(day) < today;
            const isSelected = selected ? isSameDay(day, selected) : false;
            const isToday = isSameDay(day, today);

            return (
              <button
                key={toYmd(day)}
                type="button"
                disabled={disabled}
                onClick={() => selectDay(day)}
                className={[
                  "collection-day-cell relative flex aspect-square min-h-[2.75rem] items-center justify-center rounded-xl text-sm font-semibold transition sm:min-h-[3.25rem] sm:text-base",
                  !inMonth && "text-slate-300",
                  inMonth && !disabled && !isSelected && "text-slate-700 hover:bg-white hover:shadow-sm",
                  disabled && "cursor-not-allowed text-slate-300 opacity-50",
                  isSelected && "bg-brand-gradient text-white shadow-md shadow-brand-orange/30 scale-[1.02]",
                  isToday && !isSelected && !disabled && "ring-2 ring-brand-cyan/50 ring-offset-1",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
