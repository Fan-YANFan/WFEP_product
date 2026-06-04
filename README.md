# Collectiv

Modern Next.js app for **Collectiv** — find Hong Kong recycling points, save favourites, and manage member reminders.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/product` | Product detail & add to cart |
| Cart (overlay) | Floating cart box — header or Add to cart |
| `/terms` | Terms & Conditions |
| `/privacy` | Privacy Policy |
| `/cookies` | Cookie Policy |
| `/recycling` | Hong Kong recyclable collection points (CSDI / EPD live API) |

## Recycling data API

The app proxies Hong Kong **Recyclable Collection Points Data** from [CSDI](https://portal.csdi.gov.hk/geoportal/?datasetId=epd_rcd_1630899452408_9505&lang=zh-hk) (dataset `epd_rcd_1630899452408_9505`, layer `geotagging`):

- **App route:** `GET /api/recycling-points` — query params: `district`, `wasteType`, `search`, `lat`, `lng`, `radiusMeters`, `offset`, `limit`
- **Upstream:** ArcGIS FeatureServer (`portal.csdi.gov.hk`)

## Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript

## Note

Checkout is a **demo** only — no real payments are processed. Legal copy is template content; have a qualified attorney review before production use.
