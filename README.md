# Car Compass

## What did you build and why? What did you deliberately cut?

I built **Car Compass** — a car recommendation engine for the Indian market. You answer a short quiz (budget, use case, fuel preference, must-have features, family size, etc.) and get a ranked shortlist of up to five cars with scores, EMI estimates, monthly fuel cost, and a plain-English reason for each recommendation. You can compare cars side-by-side and save shortlists via a shareable link.

**Deliberately cut:**
- User authentication — shortlists are saved by session ID and shared via URL instead. Auth would have added significant complexity for zero UX gain in a prototype.
- Real-time pricing / dealer API integration — prices are seeded into the database and treated as static. Live scraping was out of scope.
- Mobile-native app — browser-first only.
- ML model — the recommender is a hand-tuned weighted scoring function, not a trained model. Faster to reason about, easier to debug, and sufficient for the dataset size.

---

## What's your tech stack and why did you pick it?

| Layer | Choice | Reason |
|---|---|---|
| Frontend | React + Vite + TypeScript | Fast dev loop, strong typing, familiar ecosystem |
| Styling | Tailwind CSS | Utility-first keeps component files lean; no context switching to CSS files |
| Backend | Fastify + TypeScript | Lightweight, schema-first, noticeably faster than Express for JSON APIs |
| ORM | Prisma | Type-safe queries, painless migrations, great DX |
| Database | PostgreSQL (Neon) | Relational model fits cars/variants/features naturally; Neon gives serverless-friendly connection pooling |
| Deployment | Vercel (frontend + serverless backend) + Neon | Zero-infra, automatic deploys from GitHub |
| Containerised dev | Docker Compose | Single `docker compose up` spins up Postgres + backend + frontend locally without any global installs |

---

## What did you delegate to AI tools vs. do manually? Where did the tools help most?

**Delegated to AI:**
- Boilerplate scaffolding — Prisma schema, Fastify route structure, React page shells, and `docker-compose.yml` were generated and then edited rather than written from scratch.
- The seed dataset — generating realistic Indian car specs (engine cc, power, mileage, features, segment) for ~30 cars across all body types and fuel types would have taken hours manually.


**Where tools helped most:**
- Seed data generation. Getting plausible, internally consistent specs for 30+ cars in one pass saved the most time.
- Boilerplate elimination. Starting with a working skeleton meant I could spend time on the scoring logic rather than wiring up CORS and JSON serialisation.

---

## Where did they get in the way?

- **Hallucinated configs.** The initial Vercel `experimentalServices` config in `vercel.json` was suggested with slightly wrong field names, which caused silent build failures that took time to trace.
- **Over-engineered first drafts.** Generated route handlers sometimes included unnecessary abstraction layers (generic repository classes, over-typed generics) that I had to strip back to keep the codebase readable.
- **Database connection advice was wrong on the first attempt.** The suggested `DATABASE_URL` for Neon didn't include `pgbouncer=true`, which causes Prisma to fail in pooled serverless environments. Had to diagnose and correct it manually.

---

## If you had another 4 hours, what would you add?

1. **Seed the production database and deploy end-to-end** — the Neon database is currently empty. The next concrete step is running `prisma db push` and `prisma db seed` against production so the live URL actually works.
2. **Image support** — car images are modelled (`imageUrl`) but not populated. Sourcing and displaying real photos would dramatically improve the results page.
3. **Quiz polish** — add a progress bar, animate between steps, and persist answers to `localStorage` so a back-navigation doesn't wipe the form.
4. **Richer comparison table** — highlight the winning cell per row with colour, add a radar/spider chart for visual score breakdown, and allow swapping a car in or out without returning to results.
5. **Test coverage** — the scoring and filter logic (`score.ts`, `filters.ts`, `weights.ts`) are pure functions that are easy to unit test. Adding even a small Jest suite would catch regressions immediately.
