import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, CompareResponse, formatInr } from "../api";

export default function Compare() {
  const nav = useNavigate();
  const [data, setData] = useState<CompareResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("carcompass.compareItems");
    if (!raw) {
      nav("/results");
      return;
    }
    api
      .compare(JSON.parse(raw))
      .then(setData)
      .catch((e) => setError(e.message ?? "Failed to load comparison"));
  }, [nav]);

  if (error) {
    return <p className="text-rose-700">{error}</p>;
  }
  if (!data) return <p className="text-slate-500">Loading comparison…</p>;

  const formatCell = (label: string, value: number) => {
    if (label.includes("price") || label.includes("EMI") || label.includes("fuel"))
      return formatInr(value);
    return value.toLocaleString("en-IN");
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Side-by-side</h1>
        <Link
          to="/results"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100"
        >
          ← Back to shortlist
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white border shadow-sm">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="text-left px-4 py-3 bg-slate-50 sticky left-0 z-10 font-medium text-slate-500">
                Spec
              </th>
              {data.columns.map((c) => (
                <th key={c.variantId} className="text-left px-4 py-3 bg-slate-50">
                  <p className="font-bold">{c.title}</p>
                  <p className="text-xs text-slate-500">{c.subtitle}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr key={row.label} className="border-t">
                <td className="px-4 py-3 sticky left-0 bg-white font-medium text-slate-700">
                  {row.label}
                </td>
                {row.cells.map((cell, i) => (
                  <td
                    key={i}
                    className={`px-4 py-3 ${
                      cell.best ? "bg-emerald-50 text-emerald-900 font-semibold" : ""
                    }`}
                  >
                    {formatCell(row.label, cell.value)}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t">
              <td className="px-4 py-3 sticky left-0 bg-white font-medium text-slate-700">
                Top features
              </td>
              {data.columns.map((c) => (
                <td key={c.variantId} className="px-4 py-3">
                  <ul className="text-xs text-slate-600 space-y-0.5">
                    {c.features.slice(0, 6).map((f) => (
                      <li key={f}>· {f.replace(/_/g, " ")}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Best value in each row is highlighted.
      </p>
    </div>
  );
}
