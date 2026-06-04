"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { HK_DISTRICTS, WASTE_TYPE_FILTERS } from "@/lib/csdi/constants";
import {
  formatDistrictLabel,
  getAddress,
  getContact,
  getOpenHours,
  googleMapsUrl,
  openStreetMapUrl,
  parseWasteTypes,
} from "@/lib/csdi/display";
import type { AddressLocale, RecyclingCollectionPoint } from "@/lib/csdi/types";

interface ApiResponse {
  points: RecyclingCollectionPoint[];
  total: number;
  offset: number;
  limit: number;
  error?: string;
}

const PAGE_SIZE = 25;
const NEARBY_RADIUS_M = 2000;

export function RecyclingPointsExplorer() {
  const { member, addBookmark, removeBookmark, isBookmarked } = useAuth();
  const [locale, setLocale] = useState<AddressLocale>("en");
  const [district, setDistrict] = useState("");
  const [wasteType, setWasteType] = useState("");
  const [search, setSearch] = useState("");
  const [nearby, setNearby] = useState(false);
  const [offset, setOffset] = useState(0);
  const [refreshNonce, setRefreshNonce] = useState(0);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        offset: String(offset),
        limit: String(PAGE_SIZE),
      });

      if (district) params.set("district", district);
      if (wasteType) params.set("wasteType", wasteType);
      if (search.trim()) params.set("search", search.trim());

      if (nearby && coords) {
        params.set("lat", String(coords.lat));
        params.set("lng", String(coords.lng));
        params.set("radiusMeters", String(NEARBY_RADIUS_M));
      }

      try {
        const res = await fetch(`/api/recycling-points?${params}`);
        const json = (await res.json()) as ApiResponse;
        if (cancelled) return;
        if (!res.ok) {
          setError(json.error ?? "Request failed");
          setData(null);
        } else {
          setData(json);
        }
      } catch {
        if (!cancelled) {
          setError("Could not reach the recycling points API.");
          setData(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [coords, district, nearby, offset, refreshNonce, search, wasteType]);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOffset(0);
    setRefreshNonce((n) => n + 1);
  }

  function requestNearby() {
    setGeoError(null);
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setNearby(true);
        setOffset(0);
      },
      () => setGeoError("Location permission denied or unavailable."),
      { enableHighAccuracy: true, timeout: 15000 },
    );
  }

  const total = data?.total ?? 0;
  const pageStart = total === 0 ? 0 : offset + 1;
  const pageEnd = Math.min(offset + PAGE_SIZE, total);

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSearchSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="flex flex-wrap items-end gap-4">
          <div className="min-w-[140px] flex-1">
            <label htmlFor="rcp-search" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Search address
            </label>
            <input
              id="rcp-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Street, building, area…"
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-teal-600/30 focus:border-teal-500 focus:ring-2"
            />
          </div>
          <div className="min-w-[160px]">
            <label htmlFor="rcp-district" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              District
            </label>
            <select
              id="rcp-district"
              value={district}
              onChange={(e) => {
                setDistrict(e.target.value);
                setOffset(0);
              }}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-600/30"
            >
              <option value="">All districts</option>
              {HK_DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {formatDistrictLabel(d)}
                </option>
              ))}
            </select>
          </div>
          <div className="min-w-[160px]">
            <label htmlFor="rcp-locale" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Language
            </label>
            <select
              id="rcp-locale"
              value={locale}
              onChange={(e) => setLocale(e.target.value as AddressLocale)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-600/30"
            >
              <option value="en">English</option>
              <option value="tc">繁體中文</option>
              <option value="sc">简体中文</option>
            </select>
          </div>
          <button
            type="submit"
            className="rounded-full bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            Search
          </button>
          <button
            type="button"
            onClick={requestNearby}
            className="rounded-full border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Near me
          </button>
          {nearby && (
            <button
              type="button"
              onClick={() => {
                setNearby(false);
                setCoords(null);
                setOffset(0);
              }}
              className="text-sm text-teal-700 underline"
            >
              Clear nearby filter
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="w-full text-xs font-semibold uppercase tracking-wider text-slate-500">
            Waste type
          </span>
          {WASTE_TYPE_FILTERS.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                setWasteType(wasteType === type ? "" : type);
                setOffset(0);
              }}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                wasteType === type
                  ? "bg-teal-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {geoError && <p className="mt-3 text-sm text-amber-700">{geoError}</p>}
        {nearby && coords && (
          <p className="mt-3 text-sm text-slate-600">
            Showing points within {(NEARBY_RADIUS_M / 1000).toFixed(1)} km of your location.
          </p>
        )}
      </form>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
        <p>
          {loading ? "Loading…" : total === 0 ? "No results" : `Showing ${pageStart}–${pageEnd} of ${total.toLocaleString()} points`}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={loading || offset === 0}
            onClick={() => setOffset(Math.max(0, offset - PAGE_SIZE))}
            className="rounded-lg border border-slate-200 px-3 py-1.5 disabled:opacity-40"
          >
            Previous
          </button>
          <button
            type="button"
            disabled={loading || !data || offset + PAGE_SIZE >= total}
            onClick={() => setOffset(offset + PAGE_SIZE)}
            className="rounded-lg border border-slate-200 px-3 py-1.5 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      )}

      <ul className="grid gap-4 sm:grid-cols-2">
        {!loading &&
          data?.points.map((point) => {
            const address = getAddress(point, locale);
            const bookmarked = isBookmarked(point.cp_id);

            return (
            <li
              key={point.cp_id}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-display text-base font-semibold text-slate-900 leading-snug">
                  {address}
                </p>
                <div className="flex shrink-0 items-center gap-2">
                  {member && (
                    <button
                      type="button"
                      onClick={() =>
                        bookmarked
                          ? removeBookmark(point.cp_id)
                          : addBookmark(point, address)
                      }
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${
                        bookmarked
                          ? "bg-teal-100 text-teal-800"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                      title={bookmarked ? "Remove bookmark" : "Save to my account"}
                    >
                      {bookmarked ? "Saved" : "Save"}
                    </button>
                  )}
                  {point.cp_state && (
                    <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-800">
                      {point.cp_state}
                    </span>
                  )}
                </div>
              </div>
              {point.district_id && (
                <p className="mt-1 text-xs text-slate-500">{formatDistrictLabel(point.district_id)}</p>
              )}
              {point.legend && (
                <p className="mt-2 text-sm text-slate-600">{point.legend}</p>
              )}
              {point.waste_type && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {parseWasteTypes(point.waste_type).map((w) => (
                    <span
                      key={w}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-700"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              )}
              {getOpenHours(point, locale) && (
                <p className="mt-2 text-xs text-slate-600">
                  <span className="font-medium text-slate-700">Hours: </span>
                  {getOpenHours(point, locale)}
                </p>
              )}
              {getContact(point, locale) && (
                <p className="mt-1 text-xs text-slate-600">{getContact(point, locale)}</p>
              )}
              {point.accessibilty_notes && (
                <p className="mt-2 text-xs text-slate-500">{point.accessibilty_notes}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold">
                <a
                  href={openStreetMapUrl(point.lat, point.lng)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 hover:text-teal-900"
                >
                  OpenStreetMap
                </a>
                <a
                  href={googleMapsUrl(point.lat, point.lng)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 hover:text-teal-900"
                >
                  Google Maps
                </a>
                <span className="text-slate-400">
                  {point.lat.toFixed(5)}, {point.lng.toFixed(5)}
                </span>
              </div>
            </li>
            );
          })}
      </ul>

      {loading && (
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl bg-slate-200/60" />
          ))}
        </div>
      )}
    </div>
  );
}
