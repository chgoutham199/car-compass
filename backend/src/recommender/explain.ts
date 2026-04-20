import type { Car, Variant } from "@prisma/client";
import type { QuizInput } from "../schemas/quiz.js";
import type { Components } from "./score.js";
import type { WeightKey } from "./weights.js";

export type Reason = {
  whyItFits: string;
  tradeoff: string;
  bestFor: string;
};

const FEATURE_LABEL: Record<string, string> = {
  sunroof: "sunroof",
  adas: "ADAS",
  ventilated_seats: "ventilated seats",
  "360_cam": "360° camera",
  wireless_charging: "wireless charging",
  connected_car: "connected-car tech",
  cruise_control: "cruise control",
  auto_ac: "auto AC",
  touchscreen: "touchscreen",
};

function inr(amount: number): string {
  if (amount >= 10_000_000) return `₹${(amount / 10_000_000).toFixed(2)} Cr`;
  if (amount >= 100_000) return `₹${(amount / 100_000).toFixed(2)} L`;
  return `₹${amount.toLocaleString("en-IN")}`;
}

function topComponents(c: Components, n = 2): WeightKey[] {
  return (Object.keys(c) as WeightKey[]).sort((a, b) => c[b] - c[a]).slice(0, n);
}

function bottomComponent(c: Components): WeightKey {
  return (Object.keys(c) as WeightKey[]).sort((a, b) => c[a] - c[b])[0];
}

function whyPhrase(k: WeightKey, car: Car, variant: Variant): string {
  switch (k) {
    case "city":
      return `easy in city traffic at ${car.lengthMm}mm long`;
    case "family":
      return `${variant.seating}-seater with a ${car.bootLitres}L boot`;
    case "fuel":
      return `efficient at ${variant.mileageKmpl} kmpl`;
    case "feature":
      const matched = variant.features
        .filter((f) => FEATURE_LABEL[f])
        .slice(0, 3)
        .map((f) => FEATURE_LABEL[f]);
      return matched.length
        ? `loaded with ${matched.join(", ")}`
        : `well-equipped for the price`;
    case "safety":
      return `${variant.safetyRating}-star safety rating`;
    case "value":
      return `strong value at ${inr(variant.priceInr)}`;
  }
}

function tradeoffPhrase(k: WeightKey, car: Car, variant: Variant): string {
  switch (k) {
    case "city":
      return `at ${car.lengthMm}mm it can feel large in tight lanes`;
    case "family":
      return `cabin space is best for smaller families`;
    case "fuel":
      return `mileage of ${variant.mileageKmpl} kmpl is on the lower side`;
    case "feature":
      return `feature list is basic for the segment`;
    case "safety":
      return `safety rating sits at ${variant.safetyRating}-star — verify if that's a dealbreaker`;
    case "value":
      return `you pay a slight premium versus rivals`;
  }
}

function persona(quiz: QuizInput): string {
  if (quiz.useCase === "family" || quiz.seating >= 6) return "growing families needing space and safety";
  if (quiz.useCase === "first_car") return "first-time buyers prioritising easy ownership";
  if (quiz.useCase === "road_trips") return "weekend explorers who log highway km";
  if (quiz.cityHwy === "mostly_city") return "daily commuters who mostly drive in town";
  return "buyers who want a balanced all-rounder";
}

export function buildReason(
  car: Car,
  variant: Variant,
  components: Components,
  quiz: QuizInput
): Reason {
  const top = topComponents(components, 2);
  const bottom = bottomComponent(components);
  const whyParts = top.map((k) => whyPhrase(k, car, variant));
  return {
    whyItFits: `${capitalize(whyParts[0])}; ${whyParts[1]}.`,
    tradeoff: `Tradeoff: ${tradeoffPhrase(bottom, car, variant)}.`,
    bestFor: `Best for ${persona(quiz)}.`,
  };
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
