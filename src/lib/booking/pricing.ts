export const MATERIAL_IDS = ["plastics", "paper", "metals", "ewaste"] as const;
export type MaterialId = (typeof MATERIAL_IDS)[number];

/** HKD per kg — weight component of Total Charge */
export const MATERIAL_RATES_PER_KG: Record<MaterialId, number> = {
  plastics: 2.0,
  paper: 1.5,
  metals: 10,
  ewaste: 30,
};

/**
 * Includes fuel, driver time, and allowance for Western Harbour Crossing /
 * Tai Lam Tunnel on regular logistics routes.
 */
export const BASE_LOGISTICS_FEE_HKD = 180;

/** Midpoint of industry range HK$200–500 per floor, per bag/item */
export const WALK_UP_RATE_PER_FLOOR_PER_BAG_HKD = 350;
export const WALK_UP_RATE_MIN_HKD = 200;
export const WALK_UP_RATE_MAX_HKD = 500;

export const REMOTE_AREA_SURCHARGES = {
  none: 0,
  moderate: 50,
  standard: 100,
  remote: 150,
} as const;

export type RemoteAreaId = keyof typeof REMOTE_AREA_SURCHARGES;

export interface BookingPricingInput {
  materialType: MaterialId;
  weightKg: number;
  walkUp: boolean;
  floors: number;
  bagCount: number;
  remoteArea: RemoteAreaId;
}

export interface BookingPricingBreakdown {
  baseLogisticsFee: number;
  ratePerKg: number;
  weightKg: number;
  weightCharge: number;
  walkUpFee: number;
  walkUpFloors: number;
  walkUpBags: number;
  walkUpRatePerFloorPerBag: number;
  remoteAreaFee: number;
  remoteArea: RemoteAreaId;
  totalCharge: number;
}

export function calculateBookingCharge(input: BookingPricingInput): BookingPricingBreakdown {
  const ratePerKg = MATERIAL_RATES_PER_KG[input.materialType];
  const weightCharge = input.weightKg * ratePerKg;

  const walkUpFloors = input.walkUp ? Math.max(0, input.floors) : 0;
  const walkUpBags = input.walkUp ? Math.max(1, input.bagCount) : 0;
  const walkUpFee = input.walkUp
    ? walkUpFloors * walkUpBags * WALK_UP_RATE_PER_FLOOR_PER_BAG_HKD
    : 0;

  const remoteAreaFee = REMOTE_AREA_SURCHARGES[input.remoteArea];

  const totalCharge =
    BASE_LOGISTICS_FEE_HKD + weightCharge + walkUpFee + remoteAreaFee;

  return {
    baseLogisticsFee: BASE_LOGISTICS_FEE_HKD,
    ratePerKg,
    weightKg: input.weightKg,
    weightCharge,
    walkUpFee,
    walkUpFloors,
    walkUpBags,
    walkUpRatePerFloorPerBag: WALK_UP_RATE_PER_FLOOR_PER_BAG_HKD,
    remoteAreaFee,
    remoteArea: input.remoteArea,
    totalCharge,
  };
}

export function formatHkd(amount: number): string {
  return amount.toLocaleString("en-HK", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });
}
