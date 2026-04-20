import type { Variant } from "@prisma/client";
import type { QuizInput } from "../schemas/quiz.js";

/**
 * Pick the best single variant per car given the quiz.
 * Preference: cheapest variant satisfying all must-have features; fallback to the
 * variant covering the most must-haves at the lowest price.
 */
export function pickBestVariant(variants: Variant[], quiz: QuizInput): Variant {
  if (variants.length === 1) return variants[0];
  const must = quiz.mustHaveFeatures;
  if (must.length === 0) {
    return [...variants].sort((a, b) => a.priceInr - b.priceInr)[0];
  }

  const fullyMatching = variants.filter((v) =>
    must.every((m) => v.features.includes(m))
  );
  if (fullyMatching.length > 0) {
    return [...fullyMatching].sort((a, b) => a.priceInr - b.priceInr)[0];
  }

  // Fallback: rank by features matched desc, then price asc
  return [...variants]
    .map((v) => ({
      v,
      matched: must.filter((m) => v.features.includes(m)).length,
    }))
    .sort((a, b) => b.matched - a.matched || a.v.priceInr - b.v.priceInr)[0].v;
}
