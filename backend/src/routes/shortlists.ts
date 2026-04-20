import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../db.js";
import { emiInr, monthlyFuelInr } from "../lib/emi.js";

const ShortlistInput = z.object({
  name: z.string().min(1).max(120),
  sessionId: z.string().optional(),
  items: z
    .array(
      z.object({
        carId: z.number().int(),
        variantId: z.number().int(),
        rank: z.number().int().min(1),
        reason: z
          .object({
            whyItFits: z.string(),
            tradeoff: z.string(),
            bestFor: z.string(),
          })
          .optional(),
      })
    )
    .min(1)
    .max(10),
});

export async function shortlistRoutes(app: FastifyInstance) {
  app.post("/api/shortlists", async (req, reply) => {
    const parsed = ShortlistInput.safeParse(req.body);
    if (!parsed.success) {
      return reply
        .status(400)
        .send({ error: { code: "INVALID_INPUT", message: parsed.error.message } });
    }
    const { name, sessionId, items } = parsed.data;

    const created = await prisma.shortlist.create({
      data: {
        name,
        sessionId: sessionId ?? null,
        items: {
          create: items.map((i) => ({
            carId: i.carId,
            variantId: i.variantId,
            rank: i.rank,
            reasonJson: i.reason ?? undefined,
          })),
        },
      },
    });
    return { id: created.id };
  });

  app.get<{ Params: { id: string } }>("/api/shortlists/:id", async (req, reply) => {
    const shortlist = await prisma.shortlist.findUnique({
      where: { id: req.params.id },
      include: {
        items: {
          orderBy: { rank: "asc" },
          include: { car: true, variant: true },
        },
      },
    });
    if (!shortlist) {
      return reply.status(404).send({ error: { code: "NOT_FOUND", message: "Shortlist not found" } });
    }
    return {
      id: shortlist.id,
      name: shortlist.name,
      createdAt: shortlist.createdAt,
      items: shortlist.items.map((i) => ({
        rank: i.rank,
        reason: i.reasonJson,
        car: {
          id: i.car.id,
          make: i.car.make,
          model: i.car.model,
          bodyType: i.car.bodyType,
          segment: i.car.segment,
          lengthMm: i.car.lengthMm,
          bootLitres: i.car.bootLitres,
        },
        variant: {
          id: i.variant.id,
          name: i.variant.name,
          priceInr: i.variant.priceInr,
          fuelType: i.variant.fuelType,
          transmission: i.variant.transmission,
          mileageKmpl: i.variant.mileageKmpl,
          seating: i.variant.seating,
          safetyRating: i.variant.safetyRating,
          features: i.variant.features,
        },
        emi: emiInr(i.variant.priceInr),
        monthlyFuel: monthlyFuelInr(i.variant.fuelType, i.variant.mileageKmpl),
      })),
    };
  });
}
