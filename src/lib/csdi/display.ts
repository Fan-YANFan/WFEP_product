import type { AddressLocale, RecyclingCollectionPoint } from "./types";

export function formatDistrictLabel(districtId: string): string {
  return districtId.replace(/_/g, " ");
}

export function getAddress(
  point: RecyclingCollectionPoint,
  locale: AddressLocale,
): string {
  const line1 =
    locale === "tc"
      ? point.address_tc
      : locale === "sc"
        ? point.address_sc
        : point.address_en;
  const line2 =
    locale === "tc"
      ? point.address2_tc
      : locale === "sc"
        ? point.address2_sc
        : point.address2_en;

  return [line1, line2].filter(Boolean).join(", ") || point.address_en || "—";
}

export function getContact(
  point: RecyclingCollectionPoint,
  locale: AddressLocale,
): string | null {
  if (locale === "tc") return point.contact_tc;
  if (locale === "sc") return point.contact_sc;
  return point.contact_en;
}

export function getOpenHours(
  point: RecyclingCollectionPoint,
  locale: AddressLocale,
): string | null {
  if (locale === "tc") return point.openhour_tc;
  if (locale === "sc") return point.openhour_sc;
  return point.openhour_en;
}

export function parseWasteTypes(wasteType: string | null): string[] {
  if (!wasteType) return [];
  return wasteType.split(",").map((s) => s.trim()).filter(Boolean);
}

export function openStreetMapUrl(lat: number, lng: number): string {
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=17/${lat}/${lng}`;
}

export function googleMapsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}
