import Fastify from "fastify";
import cors from "@fastify/cors";
import { healthRoutes } from "./routes/health.js";
import { recommendRoutes } from "./routes/recommend.js";
import { compareRoutes } from "./routes/compare.js";
import { shortlistRoutes } from "./routes/shortlists.js";

async function main() {
  const app = Fastify({ logger: true });

  await app.register(cors, { origin: true });

  await app.register(healthRoutes);
  await app.register(recommendRoutes);
  await app.register(compareRoutes);
  await app.register(shortlistRoutes);

  const port = Number(process.env.PORT ?? 3000);
  const host = process.env.HOST ?? "0.0.0.0";

  await app.listen({ port, host });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
