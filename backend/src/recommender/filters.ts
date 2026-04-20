import type { Car, Variant } from "@prisma/client";
import type { QuizInput } from "../schemas/quiz.js";

export type CarWithVariants = Car & { variants: Variant[] };

const PARKING_LENGTH_CAP: Record<QuizInput["parking"], number> = {
  tight: 4000,
  normal: 4500,
  spacious: 99999,
};

export function applyHardFilters(
  cars: CarWithVariants[],
  quiz: QuizInput
): CarWithVariants[] {
  const lengthCap = PARKING_LENGTH_CAP[quiz.parking];
  const dealbreakers = new Set(quiz.dealbreakers);
  const safetyFloor = dealbreakers.has("low_safety") ? 4 : 0;

  const out: CarWithVariants[] = [];
  for (const car of cars) {
    if (car.lengthMm > lengthCap) continue;
    if (dealbreakers.has("length_over_4m") && car.lengthMm > 4000) continue;

    const eligible = car.variants.filter((v) => {
      if (v.priceInr > quiz.budgetMaxInr) return false;
      if (v.priceInr < quiz.budgetMinInr) return false;
      if (quiz.fuelPref !== "ANY" && v.fuelType !== quiz.fuelPref) return false;
      if (quiz.transmissionPref === "MT" && v.transmission !== "MT") return false;
      if (quiz.transmissionPref === "AT" && v.transmission === "MT") return false;
      if (v.seating < quiz.seating) return false;
      if (v.safetyRating < safetyFloor) return false;
      if (dealbreakers.has("manual_only") && v.transmission !== "MT") return false;
      if (dealbreakers.has("no_at") && v.transmission !== "MT") return false;
      if (dealbreakers.has("no_ev") && v.fuelType === "EV") return false;
      return true;
    });

    if (eligible.length > 0) {
      out.push({ ...car, variants: eligible });
    }
  }
  return out;
}

/** If hard filters are too strict, relax in stages and report which rule was loosened. */
export function relaxedFilter(
  cars: CarWithVariants[],
  quiz: QuizInput
): { result: CarWithVariants[]; relaxed: string[] } {
  let result = applyHardFilters(cars, quiz);
  const relaxed: string[] = [];
  if (result.length >= 3) return { result, relaxed };

  const stages: Array<[string, (q: QuizInput) => QuizInput]> = [
    [
      "budget band ±20%",
      (q) => ({
        ...q,
        budgetMaxInr: Math.round(q.budgetMaxInr * 1.2),
        budgetMinInr: Math.max(0, Math.round(q.budgetMinInr * 0.8)),
      }),
    ],
    ["fuel preference", (q) => ({ ...q, fuelPref: "ANY" })],
    ["transmission preference", (q) => ({ ...q, transmissionPref: "ANY" })],
    ["parking constraint", (q) => ({ ...q, parking: "spacious" })],
  ];

  let current = quiz;
  for (const [label, mutate] of stages) {
    current = mutate(current);
    relaxed.push(label);
    result = applyHardFilters(cars, current);
    if (result.length >= 3) break;
  }
  return { result, relaxed };
}
