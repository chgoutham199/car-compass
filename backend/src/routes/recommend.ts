import type { FastifyInstance } from "fastify";
import { prisma } from "../db.js";
import { QuizInput } from "../schemas/quiz.js";
import { relaxedFilter } from "../recommender/filters.js";
import { pickBestVariant } from "../recommender/variants.js";
import { deriveWeights } from "../recommender/weights.js";
import { scoreComponents, weightedScore } from "../recommender/score.js";
import { buildReason } from "../recommender/explain.js";
import { emiInr, monthlyFuelInr } from "../lib/emi.js";

export async function recommendRoutes(app: FastifyInstance) {
  app.post("/api/recommend", async (req, reply) => {
    const parsed = QuizInput.safeParse(req.body);
    if (!parsed.success) {
      return reply.status(400).send({
        error: { code: "INVALID_INPUT", message: parsed.error.message },
      });
    }
    const quiz = parsed.data;

    const allCars = await prisma.car.findMany({ include: { variants: true } });
    const { result: filtered, relaxed } = relaxedFilter(allCars, quiz);

    if (filtered.length === 0) {
      const session = await prisma.userSession.create({
        data: { quizAnswers: quiz as any },
      });
      return {
        sessionId: session.id,
        recommendations: [],
        relaxedRules: relaxed,
        message:
          "We couldn't find a car that matches every constraint. Try widening your budget or fuel preference.",
      };
    }

    // Pre-compute pool stats for normalization
    const allVariants = filtered.flatMap((c) => c.variants);
    const prices = allVariants.map((v) => v.priceInr);
    const mileages = allVariants.map((v) => v.mileageKmpl);
    const pool = {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
      minMileage: Math.min(...mileages),
      maxMileage: Math.max(...mileages),
    };

    const weights = deriveWeights(quiz);

    const scored = filtered.map((car) => {
      const variant = pickBestVariant(car.variants, quiz);
      const components = scoreComponents(car, variant, quiz, pool);
      const score = weightedScore(components, weights);
      const reason = buildReason(car, variant, components, quiz);
      return {
        car: {
          id: car.id,
          make: car.make,
          model: car.model,
          bodyType: car.bodyType,
          segment: car.segment,
          lengthMm: car.lengthMm,
          bootLitres: car.bootLitres,
        },
        variant: {
          id: variant.id,
          name: variant.name,
          priceInr: variant.priceInr,
          fuelType: variant.fuelType,
          transmission: variant.transmission,
          mileageKmpl: variant.mileageKmpl,
          seating: variant.seating,
          safetyRating: variant.safetyRating,
          features: variant.features,
        },
        score,
        components,
        reason,
        emi: emiInr(variant.priceInr),
        monthlyFuel: monthlyFuelInr(variant.fuelType, variant.mileageKmpl),
      };
    });

    scored.sort((a, b) => b.score - a.score);
    const top = scored.slice(0, 5);

    const session = await prisma.userSession.create({
      data: { quizAnswers: quiz as any },
    });

    return {
      sessionId: session.id,
      recommendations: top,
      relaxedRules: relaxed,
    };
  });
}
