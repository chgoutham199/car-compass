import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api, formatInr, SavedShortlist as SavedType } from "../api";
import { rememberShortlist } from "../lib/savedShortlists";

export default function SavedShortlist() {
  const { id = "" } = useParams<{ id: string }>();
  const [data, setData] = useState<SavedType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getShortlist(id)
      .then((d) => {
        setData(d);
        rememberShortlist({ id: d.id, name: d.name, savedAt: d.createdAt });
      })
      .catch((e) => setError(e.message ?? "Not found"));
  }, [id]);

  if (error) return <p className="text-rose-700">{error}</p>;
  if (!data) return <p className="text-slate-500">Loading…</p>;

  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-slate-500">
        Saved shortlist · {new Date(data.createdAt).toLocaleString()}
      </p>
      <h1 className="text-3xl font-bold mt-1">{data.name}</h1>

      <div className="mt-6 grid gap-4">
        {data.items.map((it) => (
          <article key={it.variant.id} className="rounded-2xl bg-white border p-6 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Rank #{it.rank} · {it.car.segment}
            </p>
            <h2 className="text-xl font-bold mt-1">
              {it.car.make} {it.car.model}{" "}
              <span className="text-slate-500 font-normal text-base">— {it.variant.name}</span>
            </h2>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <Stat label="Price" value={formatInr(it.variant.priceInr)} />
              <Stat label="Mileage" value={`${it.variant.mileageKmpl} kmpl`} />
              <Stat label="Safety" value={`${it.variant.safetyRating}★`} />
              <Stat label="Seating" value={`${it.variant.seating}`} />
              <Stat label="EMI / mo" value={formatInr(it.emi)} />
              <Stat label="Fuel / mo" value={formatInr(it.monthlyFuel)} />
            </div>
            {it.reason && (
              <div className="mt-4 rounded-lg bg-slate-50 border border-slate-200 px-4 py-3 text-sm">
                <p className="font-semibold text-slate-800">{it.reason.whyItFits}</p>
                <p className="text-slate-600 mt-1">{it.reason.tradeoff}</p>
                <p className="text-slate-500 mt-1">{it.reason.bestFor}</p>
              </div>
            )}
          </article>
        ))}
      </div>
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
