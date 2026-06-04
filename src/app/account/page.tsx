"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { formatDistrictLabel } from "@/lib/csdi/display";

export default function AccountPage() {
  const router = useRouter();
  const {
    member,
    ready,
    logout,
    orders,
    bookmarks,
    reminders,
    removeBookmark,
    addReminder,
    removeReminder,
  } = useAuth();

  const [reminderTitle, setReminderTitle] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [reminderNotes, setReminderNotes] = useState("");

  useEffect(() => {
    if (ready && !member) {
      router.replace("/login");
    }
  }, [ready, member, router]);

  if (!ready || !member) {
    return null;
  }

  function handleAddReminder(e: React.FormEvent) {
    e.preventDefault();
    if (!reminderTitle.trim() || !reminderDate) return;
    addReminder(reminderTitle.trim(), reminderDate, reminderNotes.trim());
    setReminderTitle("");
    setReminderDate("");
    setReminderNotes("");
  }

  return (
    <>
      <section className="gradient-mesh border-b border-slate-200/60">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-cyan-foreground">
                Member area
              </p>
              <h1 className="font-display mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
                Welcome back
              </h1>
              <p className="mt-2 text-slate-600">{member.email}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Log out
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 sm:px-6">
        <section>
          <h2 className="font-display text-xl font-semibold text-slate-900">Order history</h2>
          <p className="mt-1 text-sm text-slate-600">Review your past purchases and delivery status.</p>

          {orders.length === 0 ? (
            <p className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
              No orders yet.
            </p>
          ) : (
            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="border-b border-slate-100 bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-3">Order</th>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Items</th>
                    <th className="px-5 py-3">Total</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="text-slate-700">
                      <td className="px-5 py-4 font-medium text-slate-900">{order.id}</td>
                      <td className="px-5 py-4">{order.date}</td>
                      <td className="px-5 py-4">{order.items}</td>
                      <td className="px-5 py-4">${order.total.toFixed(2)}</td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-brand-cyan-muted px-2.5 py-0.5 text-xs font-medium text-brand-cyan-foreground">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-slate-900">
            Saved recycling points
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Bookmarks from the recycling finder.{" "}
            <Link href="/" className="link-brand font-semibold">
              Browse points →
            </Link>
          </p>

          {bookmarks.length === 0 ? (
            <p className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
              No saved points yet. Browse recycling locations on the home page and bookmark your
              favourites.
            </p>
          ) : (
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {bookmarks.map((point) => (
                <li
                  key={point.cp_id}
                  className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
                >
                  <p className="font-display font-semibold text-slate-900">{point.address}</p>
                  {point.district && (
                    <p className="mt-1 text-xs text-slate-500">
                      {formatDistrictLabel(point.district)}
                    </p>
                  )}
                  {point.wasteTypes && (
                    <p className="mt-2 text-xs text-slate-600">{point.wasteTypes}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => removeBookmark(point.cp_id)}
                    className="mt-4 text-xs font-semibold text-red-600 hover:text-red-800"
                  >
                    Remove bookmark
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-slate-900">
            Recycling event reminders
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Set reminders for community recycling drives, e-waste collection days, and other events.
          </p>

          <form
            onSubmit={handleAddReminder}
            className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="event-title" className="text-sm font-medium text-slate-700">
                  Event name
                </label>
                <input
                  id="event-title"
                  required
                  value={reminderTitle}
                  onChange={(e) => setReminderTitle(e.target.value)}
                  placeholder="e.g. Central district e-waste drive"
                  className="input-brand mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
                />
              </div>
              <div>
                <label htmlFor="event-date" className="text-sm font-medium text-slate-700">
                  Date
                </label>
                <input
                  id="event-date"
                  type="date"
                  required
                  value={reminderDate}
                  onChange={(e) => setReminderDate(e.target.value)}
                  className="input-brand mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
                />
              </div>
              <div>
                <label htmlFor="event-notes" className="text-sm font-medium text-slate-700">
                  Notes (optional)
                </label>
                <input
                  id="event-notes"
                  value={reminderNotes}
                  onChange={(e) => setReminderNotes(e.target.value)}
                  placeholder="Location, time, what to bring…"
                  className="input-brand mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn-primary mt-4 rounded-full px-6 py-2.5 text-sm"
            >
              Add reminder
            </button>
          </form>

          {reminders.length === 0 ? (
            <p className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
              No reminders set yet.
            </p>
          ) : (
            <ul className="mt-6 space-y-3">
              {reminders.map((reminder) => (
                <li
                  key={reminder.id}
                  className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-slate-100 bg-white px-5 py-4 shadow-sm"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{reminder.title}</p>
                    <p className="mt-1 text-sm text-brand-cyan-dark">{reminder.date}</p>
                    {reminder.notes && (
                      <p className="mt-1 text-sm text-slate-600">{reminder.notes}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeReminder(reminder.id)}
                    className="text-xs font-semibold text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
