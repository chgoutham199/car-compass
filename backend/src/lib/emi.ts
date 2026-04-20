const DEFAULT_DOWN_PCT = 0.2;
const DEFAULT_APR = 0.085;
const DEFAULT_MONTHS = 60;

export function emiInr(price: number, opts?: { downPct?: number; apr?: number; months?: number }) {
  const downPct = opts?.downPct ?? DEFAULT_DOWN_PCT;
  const apr = opts?.apr ?? DEFAULT_APR;
  const months = opts?.months ?? DEFAULT_MONTHS;
  const principal = price * (1 - downPct);
  const monthlyRate = apr / 12;
  const factor = Math.pow(1 + monthlyRate, months);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  return Math.round(emi);
}

const FUEL_RATE_INR_PER_LITRE: Record<string, number> = {
  PETROL: 105,
  DIESEL: 95,
  HYBRID: 100,
  CNG: 80,
};

const EV_INR_PER_KM = 1.5;
const KM_PER_MONTH = 1000;

export function monthlyFuelInr(fuelType: string, mileageKmpl: number): number {
  if (fuelType === "EV") {
    return Math.round(EV_INR_PER_KM * KM_PER_MONTH);
  }
  const rate = FUEL_RATE_INR_PER_LITRE[fuelType] ?? 100;
  if (mileageKmpl <= 0) return 0;
  return Math.round((KM_PER_MONTH / mileageKmpl) * rate);
}
