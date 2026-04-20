const BASE = (import.meta.env.VITE_API_BASE as string | undefined) ?? "http://localhost:3000";

export type Recommendation = {
  car: {
    id: number;
    make: string;
    model: string;
    bodyType: string;
    segment: string;
    lengthMm: number;
    bootLitres: number;
  };
  variant: {
    id: number;
    name: string;
    priceInr: number;
    fuelType: string;
    transmission: string;
    mileageKmpl: number;
    seating: number;
    safetyRating: number;
    features: string[];
  };
  score: number;
  components: Record<string, number>;
  reason: { whyItFits: string; tradeoff: string; bestFor: string };
  emi: number;
  monthlyFuel: number;
};

export type RecommendResponse = {
  sessionId: string;
  recommendations: Recommendation[];
  relaxedRules: string[];
  message?: string;
};

export type CompareCol = {
  carId: number;
  variantId: number;
  title: string;
  subtitle: string;
  bodyType: string;
  priceInr: number;
  fuelType: string;
  transmission: string;
  mileageKmpl: number;
  seating: number;
  safetyRating: number;
  lengthMm: number;
  bootLitres: number;
  engineCc: number;
  powerBhp: number;
  features: string[];
  emi: number;
  monthlyFuel: number;
};

export type CompareResponse = {
  columns: CompareCol[];
  rows: { label: string; bestIs: "high" | "low"; cells: { value: number; best: boolean }[] }[];
};

export type SavedShortlist = {
  id: string;
  name: string;
  createdAt: string;
  items: Array<{
    rank: number;
    reason: { whyItFits: string; tradeoff: string; bestFor: string } | null;
    car: Recommendation["car"];
    variant: Recommendation["variant"];
    emi: number;
    monthlyFuel: number;
  }>;
};

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error((await res.json()).error?.message ?? `HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error((await res.json()).error?.message ?? `HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

export const api = {
  recommend: (quiz: any) => post<RecommendResponse>("/api/recommend", quiz),
  compare: (items: { carId: number; variantId: number }[]) =>
    post<CompareResponse>("/api/compare", { items }),
  saveShortlist: (payload: any) => post<{ id: string }>("/api/shortlists", payload),
  getShortlist: (id: string) => get<SavedShortlist>(`/api/shortlists/${id}`),
};

export function formatInr(amount: number): string {
  if (amount >= 10_000_000) return `₹${(amount / 10_000_000).toFixed(2)} Cr`;
  if (amount >= 100_000) return `₹${(amount / 100_000).toFixed(2)} L`;
  return `₹${amount.toLocaleString("en-IN")}`;
}
