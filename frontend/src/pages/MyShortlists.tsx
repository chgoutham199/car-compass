import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  forgetShortlist,
  listSaved,
  SavedRef,
  subscribe,
} from "../lib/savedShortlists";

export default function MyShortlists() {
  const [items, setItems] = useState<SavedRef[]>(() => listSaved());

  useEffect(() => {
    const refresh = () => setItems(listSaved());
    refresh();
    return subscribe(refresh);
  }, []);

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold">My shortlists</h1>
      <p className="text-slate-600 mt-1">
        Shortlists you've saved during this session. They'll stay here until you
        close the tab.
      </p>

      {items.length === 0 ? (
        <div className="mt-8 rounded-2xl bg-white border p-8 text-center">
          <p className="text-slate-700">You haven't saved any shortlists yet.</p>
          <Link
            to="/quiz"
            className="inline-block mt-4 rounded-lg bg-ink text-white px-4 py-2 text-sm font-semibold hover:bg-slate-800"
          >
            Take the quiz →
          </Link>
        </div>
      ) : (
        <ul className="mt-6 grid gap-3">
          {items.map((s) => (
            <li
              key={s.id}
              className="rounded-2xl bg-white border p-5 shadow-sm flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <Link
                  to={`/shortlist/${s.id}`}
                  className="text-lg font-semibold hover:underline truncate block"
                >
                  {s.name}
                </Link>
                <p className="text-xs text-slate-500 mt-1">
                  Saved {new Date(s.savedAt).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to={`/shortlist/${s.id}`}
                  className="rounded-lg bg-ink text-white px-3 py-2 text-xs font-semibold hover:bg-slate-800"
                >
                  Open
                </Link>
                <button
                  onClick={() => forgetShortlist(s.id)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  title="Remove from this list (the saved shortlist itself stays available)"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
