import type { Car, Variant } from "@prisma/client";
import type { QuizInput } from "../schemas/quiz.js";
import type { Weights, WeightKey } from "./weights.js";

export type Components = Record<WeightKey, number>;

const FEATURE_RICH = ["sunroof", "ventilated_seats", "adas", "360_cam", "wireless_charging", "cruise_control"];

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}

function normalize(value: number, min: number, max: number): number {
  if (max === min) return 0.5;
  return clamp01((value - min) / (max - min));
}

export function scoreComponents(
  car: Car,
  variant: Variant,
  quiz: QuizInput,
  pool: { minPrice: number; maxPrice: number; minMileage: number; maxMileage: number }
): Components {
  // city: shorter cars + better mileage do well
  const cityCar = clamp01(1 - normalize(car.lengthMm, 3500, 4800));
  const cityFuel = normalize(variant.mileageKmpl, pool.minMileage, pool.maxMileage);
  const city = (cityCar * 0.6 + cityFuel * 0.4);

  // family: seating + boot + comfort features
  const seatScore = clamp01(variant.seating / 7);
  const bootScore = normalize(car.bootLitres, 150, 550);
  const comfortFeatureCount = FEATURE_RICH.filter((f) => variant.features.includes(f)).length;
  const comfortFeatureScore = clamp01(comfortFeatureCount / FEATURE_RICH.length);
  const family = seatScore * 0.4 + bootScore * 0.3 + comfortFeatureScore * 0.3;

  const fuel = normalize(variant.mileageKmpl, pool.minMileage, pool.maxMileage);

  const must = quiz.mustHaveFeatures;
  const matched = must.filter((m) => variant.features.includes(m)).length;
  const feature = must.length === 0
    ? clamp01(comfortFeatureCount / FEATURE_RICH.length)
    : matched / must.length;

  const safety = clamp01(variant.safetyRating / 5);

  // value: composite "goodness" per rupee, normalized within pool
  const goodness = (safety + fuel + feature + family) / 4;
  const inversePrice = 1 - normalize(variant.priceInr, pool.minPrice, pool.maxPrice);
  const value = clamp01(goodness * 0.5 + inversePrice * 0.5);

  return { city, family, fuel, feature, safety, value };
}

export function weightedScore(c: Components, w: Weights): number {
  let s = 0;
  for (const k of Object.keys(w) as WeightKey[]) {
    s += c[k] * w[k];
  }
  return Math.round(s * 100);
}
