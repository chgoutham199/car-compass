import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, formatInr, RecommendResponse } from "../api";
import { rememberShortlist } from "../lib/savedShortlists";

export default function Results() {
  const nav = useNavigate();
  const [data, setData] = useState<RecommendResponse | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [savedId, setSavedId] = useState<string | null>(null);
  const [name, setName] = useState("My shortlist");

  useEffect(() => {
    const raw = sessionStorage.getItem("carcompass.results");
    if (!raw) {
      nav("/quiz");
      return;
    }
    setData(JSON.parse(raw));
  }, [nav]);

  if (!data) return null;

  const toggle = (variantId: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(variantId) ? next.delete(variantId) : next.add(variantId);
      return next;
    });
  };

  const goCompare = () => {
    if (!data) return;
    const items = data.recommendations
      .filter((r) => selected.has(r.variant.id))
      .map((r) => ({ carId: r.car.id, variantId: r.variant.id }));
    if (items.length < 2) return;
    sessionStorage.setItem("carcompass.compareItems", JSON.stringify(items));
    nav("/compare");
  };

  const save = async () => {
    if (!data) return;
    const items = data.recommendations.map((r, idx) => ({
      carId: r.car.id,
      variantId: r.variant.id,
      rank: idx + 1,
      reason: r.reason,
    }));
    const res = await api.saveShortlist({
      name,
      sessionId: data.sessionId,
      items,
    });
    rememberShortlist({ id: res.id, name, savedAt: new Date().toISOString() });
    setSavedId(res.id);
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Your shortlist</h1>
          <p className="text-slate-600 mt-1">
            {data.recommendations.length} cars ranked by your priorities.{" "}
            {data.relaxedRules.length > 0 && (
              <span className="text-amber-700 text-sm">
                Relaxed: {data.relaxedRules.join(", ")}
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={goCompare}
            disabled={selected.size < 2}
            className="rounded-lg border border-ink px-4 py-2 text-sm font-semibold hover:bg-slate-100 disabled:opacity-40"
          >
            Compare selected ({selected.size})
          </button>
          <Link
            to="/quiz"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100"
          >
            Retake quiz
          </Link>
        </div>
      </div>

      {data.message && (
        <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 text-sm">
          {data.message}
        </div>
      )}

      <div className="mt-6 grid gap-4">
        {data.recommendations.map((r, idx) => (
          <article
            key={r.variant.id}
            className="rounded-2xl bg-white border p-6 shadow-sm flex flex-col md:flex-row gap-6"
          >
            <div className="md:w-32 flex-shrink-0 text-center">
              <div className="h-20 w-20 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-2xl">
                {r.car.bodyType === "EV" ? "⚡" : r.car.bodyType === "SUV" ? "🚙" : r.car.bodyType === "MUV" ? "🚐" : r.car.bodyType === "SEDAN" ? "🚗" : "🚘"}
              </div>
              <p className="mt-3 text-3xl font-bold">{r.score}</p>
              <p className="text-xs uppercase tracking-wider text-slate-500">match score</p>
              <p className="mt-2 text-xs text-slate-500">Rank #{idx + 1}</p>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">{r.car.segment}</p>
                  <h2 className="text-xl font-bold">
                    {r.car.make} {r.car.model}
                  </h2>
                  <p className="text-sm text-slate-600">
                    Recommended variant: <span className="font-semibold">{r.variant.name}</span>
                  </p>
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={selected.has(r.variant.id)}
                    onChange={() => toggle(r.variant.id)}
                  />
                  Compare
                </label>
              </div>

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <Stat label="Price" value={formatInr(r.variant.priceInr)} />
                <Stat label="Mileage" value={`${r.variant.mileageKmpl} kmpl`} />
                <Stat label="Safety" value={`${r.variant.safetyRating}★`} />
                <Stat label="Seating" value={`${r.variant.seating}`} />
                <Stat label="Fuel" value={r.variant.fuelType} />
                <Stat label="Trans." value={r.variant.transmission} />
                <Stat label="EMI / mo" value={formatInr(r.emi)} />
                <Stat label="Fuel / mo" value={formatInr(r.monthlyFuel)} />
              </div>

              <div className="mt-4 rounded-lg bg-slate-50 border border-slate-200 px-4 py-3 text-sm">
                <p className="font-semibold text-slate-800">{r.reason.whyItFits}</p>
                <p className="text-slate-600 mt-1">{r.reason.tradeoff}</p>
                <p className="text-slate-500 mt-1">{r.reason.bestFor}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {data.recommendations.length > 0 && (
        <section className="mt-10 rounded-2xl bg-white border p-6 shadow-sm">
          <h3 className="font-semibold">Save this shortlist</h3>
          <p className="text-sm text-slate-600 mt-1">
            Save your shortlist and get a shareable link.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-2 items-stretch">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Name your shortlist"
            />
            <button
              onClick={save}
              className="rounded-lg bg-ink text-white px-4 py-2 text-sm font-semibold hover:bg-slate-800"
            >
              Save
            </button>
          </div>
          {savedId && (
            <p className="mt-3 text-sm text-emerald-700">
              Saved as <span className="font-semibold">"{name}"</span>. Find it
              anytime under{" "}
              <Link className="underline" to="/shortlists">
                My shortlists
              </Link>
              .
            </p>
          )}
        </section>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 px-3 py-2 bg-white">
      <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
      <p className="font-semibold text-sm">{value}</p>
    </div>
  );
}
