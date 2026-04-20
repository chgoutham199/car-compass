import type { QuizInput } from "../schemas/quiz.js";

export type WeightKey =
  | "city"
  | "family"
  | "fuel"
  | "feature"
  | "safety"
  | "value";

export type Weights = Record<WeightKey, number>;

const BASE: Weights = {
  city: 1,
  family: 1,
  fuel: 1,
  feature: 1,
  safety: 1,
  value: 1,
};

const USE_CASE_BIAS: Record<QuizInput["useCase"], Partial<Weights>> = {
  commute: { city: 1.5, fuel: 1.4, value: 1.2 },
  road_trips: { feature: 1.3, safety: 1.3, fuel: 1.1 },
  family: { family: 1.6, safety: 1.5, value: 1.2 },
  first_car: { value: 1.5, fuel: 1.3, city: 1.3 },
};

const PRIORITY_BOOST: Record<string, Partial<Weights>> = {
  mileage: { fuel: 1.6 },
  comfort: { family: 1.3, feature: 1.2 },
  features: { feature: 1.6 },
  safety: { safety: 1.6 },
  performance: { feature: 1.2 },
};

const CITY_HWY_BIAS: Record<QuizInput["cityHwy"], Partial<Weights>> = {
  mostly_city: { city: 1.4, fuel: 1.2 },
  mixed: {},
  mostly_highway: { safety: 1.2, feature: 1.1 },
};

export function deriveWeights(quiz: QuizInput): Weights {
  const w: Weights = { ...BASE };
  const apply = (delta: Partial<Weights>) => {
    for (const k of Object.keys(delta) as WeightKey[]) {
      w[k] *= delta[k]!;
    }
  };
  apply(USE_CASE_BIAS[quiz.useCase]);
  apply(CITY_HWY_BIAS[quiz.cityHwy]);
  for (const p of quiz.priorities) apply(PRIORITY_BOOST[p] ?? {});

  // Normalize so weights sum to 1 for clean scoring
  const total = (Object.values(w) as number[]).reduce((a, b) => a + b, 0);
  for (const k of Object.keys(w) as WeightKey[]) {
    w[k] = w[k] / total;
  }
  return w;
}
