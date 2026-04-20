import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

type Quiz = {
  budgetMinInr: number;
  budgetMaxInr: number;
  useCase: "commute" | "road_trips" | "family" | "first_car";
  cityHwy: "mostly_city" | "mixed" | "mostly_highway";
  seating: number;
  fuelPref: "PETROL" | "DIESEL" | "HYBRID" | "EV" | "CNG" | "ANY";
  transmissionPref: "MT" | "AT" | "ANY";
  parking: "tight" | "normal" | "spacious";
  priorities: string[];
  mustHaveFeatures: string[];
  dealbreakers: string[];
};

const DEFAULT_QUIZ: Quiz = {
  budgetMinInr: 1200000,
  budgetMaxInr: 1800000,
  useCase: "commute",
  cityHwy: "mostly_city",
  seating: 5,
  fuelPref: "ANY",
  transmissionPref: "ANY",
  parking: "normal",
  priorities: ["mileage", "safety"],
  mustHaveFeatures: [],
  dealbreakers: [],
};

const STORAGE_KEY = "carcompass.quiz.v2";

const STEPS = [
  "Budget",
  "Primary use",
  "City vs highway",
  "Seating",
  "Fuel",
  "Transmission",
  "Parking",
  "Priorities",
  "Must-haves",
  "Dealbreakers",
] as const;

const BUDGETS = [
  { label: "Under ₹8 L", min: 0, max: 800000 },
  { label: "₹8 – 12 L", min: 800000, max: 1200000 },
  { label: "₹12 – 18 L", min: 1200000, max: 1800000 },
  { label: "₹18 – 28 L", min: 1800000, max: 2800000 },
  { label: "Above ₹28 L", min: 2800000, max: 50000000 },
];

const FEATURES = [
  ["sunroof", "Sunroof"],
  ["adas", "ADAS"],
  ["ventilated_seats", "Ventilated seats"],
  ["360_cam", "360° camera"],
  ["wireless_charging", "Wireless charging"],
  ["auto_ac", "Auto AC"],
  ["connected_car", "Connected car"],
  ["cruise_control", "Cruise control"],
] as const;

const PRIORITIES = ["mileage", "comfort", "features", "safety", "performance"] as const;

const DEALBREAKERS = [
  ["low_safety", "Anything under 4-star safety"],
  ["manual_only", "Only manual transmission"],
  ["no_at", "Avoid automatic"],
  ["length_over_4m", "Length over 4 metres"],
  ["no_ev", "No EVs"],
] as const;

export default function QuizPage() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [quiz, setQuiz] = useState<Quiz>(() => {
    const cached = sessionStorage.getItem(STORAGE_KEY);
    return cached ? JSON.parse(cached) : DEFAULT_QUIZ;
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(quiz));
  }, [quiz]);

  const update = <K extends keyof Quiz>(k: K, v: Quiz[K]) =>
    setQuiz((q) => ({ ...q, [k]: v }));

  const togglePriority = (p: string) => {
    setQuiz((q) => {
      if (q.priorities.includes(p)) {
        return { ...q, priorities: q.priorities.filter((x) => x !== p) };
      }
      if (q.priorities.length >= 2) {
        return { ...q, priorities: [q.priorities[1], p] };
      }
      return { ...q, priorities: [...q.priorities, p] };
    });
  };

  const toggleArrayMember = (key: "mustHaveFeatures" | "dealbreakers", v: string) => {
    setQuiz((q) => ({
      ...q,
      [key]: q[key].includes(v) ? q[key].filter((x) => x !== v) : [...q[key], v],
    }));
  };

  const isLast = step === STEPS.length - 1;
  const progress = useMemo(() => ((step + 1) / STEPS.length) * 100, [step]);

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await api.recommend(quiz);
      sessionStorage.setItem("carcompass.results", JSON.stringify(res));
      sessionStorage.setItem("carcompass.quizSubmitted", JSON.stringify(quiz));
      nav("/results");
    } catch (e: any) {
      setError(e.message ?? "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wider text-slate-500">
          Step {step + 1} of {STEPS.length} · {STEPS[step]}
        </p>
        <div className="h-1 mt-2 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-accent transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="rounded-2xl bg-white border p-6 shadow-sm min-h-[280px]">
        {step === 0 && (
          <Step title="What's your budget range?" hint="Ex-showroom price.">
            <div className="grid grid-cols-2 gap-2">
              {BUDGETS.map((b) => (
                <Pill
                  key={b.label}
                  selected={quiz.budgetMinInr === b.min && quiz.budgetMaxInr === b.max}
                  onClick={() =>
                    setQuiz((q) => ({ ...q, budgetMinInr: b.min, budgetMaxInr: b.max }))
                  }
                >
                  {b.label}
                </Pill>
              ))}
            </div>
          </Step>
        )}

        {step === 1 && (
          <Step title="What will you mostly use it for?">
            <div className="grid grid-cols-2 gap-2">
              {[
                ["commute", "Daily commute"],
                ["road_trips", "Weekend road trips"],
                ["family", "Family hauler"],
                ["first_car", "First car"],
              ].map(([v, label]) => (
                <Pill key={v} selected={quiz.useCase === v} onClick={() => update("useCase", v as Quiz["useCase"])}>
                  {label}
                </Pill>
              ))}
            </div>
          </Step>
        )}

        {step === 2 && (
          <Step title="City or highway?">
            <div className="grid grid-cols-3 gap-2">
              {[
                ["mostly_city", "Mostly city"],
                ["mixed", "Mixed"],
                ["mostly_highway", "Mostly highway"],
              ].map(([v, label]) => (
                <Pill key={v} selected={quiz.cityHwy === v} onClick={() => update("cityHwy", v as Quiz["cityHwy"])}>
                  {label}
                </Pill>
              ))}
            </div>
          </Step>
        )}

        {step === 3 && (
          <Step title="How many seats do you need?">
            <div className="grid grid-cols-4 gap-2">
              {[2, 5, 6, 7].map((n) => (
                <Pill key={n} selected={quiz.seating === n} onClick={() => update("seating", n)}>
                  {n === 2 ? "2 (couple)" : n === 5 ? "5 (standard)" : n === 6 ? "6" : "7+"}
                </Pill>
              ))}
            </div>
          </Step>
        )}

        {step === 4 && (
          <Step title="Fuel preference">
            <div className="grid grid-cols-3 gap-2">
              {[
                ["ANY", "No preference"],
                ["PETROL", "Petrol"],
                ["DIESEL", "Diesel"],
                ["HYBRID", "Hybrid"],
                ["EV", "Electric"],
                ["CNG", "CNG"],
              ].map(([v, label]) => (
                <Pill key={v} selected={quiz.fuelPref === v} onClick={() => update("fuelPref", v as Quiz["fuelPref"])}>
                  {label}
                </Pill>
              ))}
            </div>
          </Step>
        )}

        {step === 5 && (
          <Step title="Transmission">
            <div className="grid grid-cols-3 gap-2">
              {[
                ["ANY", "No preference"],
                ["MT", "Manual"],
                ["AT", "Automatic"],
              ].map(([v, label]) => (
                <Pill
                  key={v}
                  selected={quiz.transmissionPref === v}
                  onClick={() => update("transmissionPref", v as Quiz["transmissionPref"])}
                >
                  {label}
                </Pill>
              ))}
            </div>
          </Step>
        )}

        {step === 6 && (
          <Step title="Parking constraint" hint="Caps the maximum length we'll consider.">
            <div className="grid grid-cols-3 gap-2">
              {[
                ["tight", "Tight (≤ 4 m)"],
                ["normal", "Normal (≤ 4.5 m)"],
                ["spacious", "Spacious"],
              ].map(([v, label]) => (
                <Pill key={v} selected={quiz.parking === v} onClick={() => update("parking", v as Quiz["parking"])}>
                  {label}
                </Pill>
              ))}
            </div>
          </Step>
        )}

        {step === 7 && (
          <Step title="Pick your top 1-2 priorities" hint="We weight scoring around these.">
            <div className="grid grid-cols-3 gap-2">
              {PRIORITIES.map((p) => (
                <Pill key={p} selected={quiz.priorities.includes(p)} onClick={() => togglePriority(p)}>
                  {p}
                </Pill>
              ))}
            </div>
            {quiz.priorities.length === 0 && (
              <p className="text-xs text-amber-600 mt-3">Pick at least one.</p>
            )}
          </Step>
        )}

        {step === 8 && (
          <Step title="Any must-have features?" hint="Optional.">
            <div className="grid grid-cols-2 gap-2">
              {FEATURES.map(([v, label]) => (
                <Pill
                  key={v}
                  selected={quiz.mustHaveFeatures.includes(v)}
                  onClick={() => toggleArrayMember("mustHaveFeatures", v)}
                >
                  {label}
                </Pill>
              ))}
            </div>
          </Step>
        )}

        {step === 9 && (
          <Step title="Any dealbreakers?" hint="Optional.">
            <div className="grid grid-cols-1 gap-2">
              {DEALBREAKERS.map(([v, label]) => (
                <Pill
                  key={v}
                  selected={quiz.dealbreakers.includes(v)}
                  onClick={() => toggleArrayMember("dealbreakers", v)}
                >
                  {label}
                </Pill>
              ))}
            </div>
          </Step>
        )}
      </div>

      {error && (
        <div className="mt-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <button
          className="text-sm text-slate-500 hover:text-slate-800 disabled:opacity-40"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
        >
          ← Back
        </button>
        {!isLast ? (
          <button
            onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
            className="rounded-lg bg-ink text-white px-5 py-2 text-sm font-semibold hover:bg-slate-800 disabled:opacity-50"
            disabled={step === 7 && quiz.priorities.length === 0}
          >
            Next →
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={submitting}
            className="rounded-lg bg-accent text-white px-5 py-2 text-sm font-semibold hover:bg-sky-600 disabled:opacity-50"
          >
            {submitting ? "Finding cars…" : "See my shortlist"}
          </button>
        )}
      </div>
    </div>
  );
}

function Step(props: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold">{props.title}</h2>
      {props.hint && <p className="mt-1 text-sm text-slate-500">{props.hint}</p>}
      <div className="mt-5">{props.children}</div>
    </div>
  );
}

function Pill({
  children,
  selected,
  onClick,
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left px-4 py-3 rounded-lg border transition text-sm ${
        selected
          ? "bg-ink text-white border-ink"
          : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
      }`}
    >
      {children}
    </button>
  );
}
