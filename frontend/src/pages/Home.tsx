import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="grid gap-12 lg:grid-cols-2 items-center">
      <div>
        <h1 className="text-5xl font-bold tracking-tight">
          Don't know what car to buy?
        </h1>
        <p className="mt-6 text-lg text-slate-600 max-w-xl">
          Too many cars to choose from? Answer 10 quick questions about your
          budget, family size, and how you'll use the car. We'll show you a
          short list of the best cars for you — with simple reasons why each
          one fits, what to watch out for, and which version to pick.
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            to="/quiz"
            className="inline-flex items-center rounded-lg bg-ink text-white px-5 py-3 text-sm font-semibold hover:bg-slate-800"
          >
            Start the quiz →
          </Link>
        </div>
      </div>
      <div className="rounded-2xl bg-white border p-6 shadow-sm">
        <p className="text-xs uppercase tracking-wider text-slate-500">
          Sample shortlist
        </p>
        <ul className="mt-4 divide-y">
          {[
            { name: "Maruti Baleno Alpha", note: "Frugal, easy to park, full features" },
            { name: "Tata Nexon Creative+", note: "5-star safety with bold styling" },
            { name: "Hyundai Verna SX(O)", note: "Highway comfort with ADAS" },
          ].map((c) => (
            <li key={c.name} className="py-3 flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-accent" />
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-slate-500">{c.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <section id="how" className="lg:col-span-2 mt-8 grid sm:grid-cols-3 gap-4">
        {[
          { title: "1. Tell us about you", body: "Answer 10 quick questions about your budget, family, and how you'll use the car." },
          { title: "2. We pick the best matches", body: "We check every car against your needs and rank the ones that fit you best." },
          { title: "3. Decide with confidence", body: "Compare your top picks side by side and save your list to come back to later." },
        ].map((s) => (
          <div key={s.title} className="rounded-xl bg-white border p-5">
            <h3 className="font-semibold">{s.title}</h3>
            <p className="text-sm text-slate-600 mt-2">{s.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
