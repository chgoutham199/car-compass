import { z } from "zod";

export const FuelPref = z.enum(["PETROL", "DIESEL", "HYBRID", "EV", "CNG", "ANY"]);
export const TransPref = z.enum(["MT", "AT", "ANY"]);
export const Priority = z.enum(["mileage", "comfort", "features", "safety", "performance"]);
export const UseCase = z.enum(["commute", "road_trips", "family", "first_car"]);
export const ParkingPref = z.enum(["tight", "normal", "spacious"]);
export const CityHwy = z.enum(["mostly_city", "mixed", "mostly_highway"]);
export const Feature = z.enum([
  "auto_ac",
  "sunroof",
  "adas",
  "ventilated_seats",
  "360_cam",
  "wireless_charging",
  "connected_car",
  "cruise_control",
  "touchscreen",
]);
export const Dealbreaker = z.enum([
  "low_safety",
  "manual_only",
  "no_at",
  "length_over_4m",
  "no_ev",
]);

export const QuizInput = z.object({
  budgetMinInr: z.number().int().min(0).max(50_000_000).default(0),
  budgetMaxInr: z.number().int().min(300_000).max(50_000_000),
  useCase: UseCase,
  cityHwy: CityHwy,
  seating: z.number().int().min(2).max(9),
  fuelPref: FuelPref,
  transmissionPref: TransPref,
  parking: ParkingPref,
  priorities: z.array(Priority).min(1).max(3),
  mustHaveFeatures: z.array(Feature).default([]),
  dealbreakers: z.array(Dealbreaker).default([]),
});

export type QuizInput = z.infer<typeof QuizInput>;
