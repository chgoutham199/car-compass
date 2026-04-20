import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import Compare from "./pages/Compare";
import SavedShortlist from "./pages/SavedShortlist";
import MyShortlists from "./pages/MyShortlists";
import { listSaved, subscribe } from "./lib/savedShortlists";

export default function App() {
  const [savedCount, setSavedCount] = useState(() => listSaved().length);

  useEffect(() => {
    const refresh = () => setSavedCount(listSaved().length);
    refresh();
    return subscribe(refresh);
  }, []);

  return (
    <div className="min-h-full">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight">
            🧭 Car Compass
          </Link>
          <nav className="flex items-center gap-5 text-sm">
            <Link
              to="/shortlists"
              className="text-slate-600 hover:text-ink font-medium"
            >
              My shortlists
              {savedCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center rounded-full bg-ink text-white text-[10px] font-semibold px-2 py-[2px]">
                  {savedCount}
                </span>
              )}
            </Link>
            <Link
              to="/quiz"
              className="text-accent font-medium hover:underline"
            >
              Take the quiz
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/shortlists" element={<MyShortlists />} />
          <Route path="/shortlist/:id" element={<SavedShortlist />} />
        </Routes>
      </main>
    </div>
  );
}
