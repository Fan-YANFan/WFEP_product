"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const nav = [{ href: "/", label: "Home" }];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { member, ready } = useAuth();

  const authHref = member ? "/account" : "/login";
  const authLabel = member ? "My Account" : "Log In / Sign In";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 glass">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-sm font-bold text-white shadow-md shadow-brand-orange/25">
            C
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-slate-900">
            Collectiv
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "nav-active"
                  : "text-slate-600 hover:bg-brand-cyan-muted/60 hover:text-slate-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {ready && (
            <Link
              href={authHref}
              className="btn-primary ml-2 rounded-full px-5 py-2 text-sm"
            >
              {authLabel}
            </Link>
          )}
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-600 md:hidden"
          aria-label="Open menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-brand-cyan-muted/60"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {ready && (
            <Link
              href={authHref}
              className="btn-primary mt-2 block rounded-full px-3 py-2.5 text-center text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {authLabel}
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
