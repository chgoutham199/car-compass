import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../db.js";
import { emiInr, monthlyFuelInr } from "../lib/emi.js";

const CompareInput = z.object({
  items: z
    .array(z.object({ carId: z.number().int(), variantId: z.number().int() }))
    .min(2)
    .max(5),
});

export async function compareRoutes(app: FastifyInstance) {
  app.post("/api/compare", async (req, reply) => {
    const parsed = CompareInput.safeParse(req.body);
    if (!parsed.success) {
      return reply
        .status(400)
        .send({ error: { code: "INVALID_INPUT", message: parsed.error.message } });
    }
    const { items } = parsed.data;

    const variantIds = items.map((i) => i.variantId);
    const variants = await prisma.variant.findMany({
      where: { id: { in: variantIds } },
      include: { car: true },
    });

    const orderedVariants = variantIds
      .map((id) => variants.find((v) => v.id === id))
      .filter((v): v is NonNullable<typeof v> => Boolean(v));

    const columns = orderedVariants.map((v) => ({
      carId: v.carId,
      variantId: v.id,
      title: `${v.car.make} ${v.car.model}`,
      subtitle: v.name,
      bodyType: v.car.bodyType,
      priceInr: v.priceInr,
      fuelType: v.fuelType,
      transmission: v.transmission,
      mileageKmpl: v.mileageKmpl,
      seating: v.seating,
      safetyRating: v.safetyRating,
      lengthMm: v.car.lengthMm,
      bootLitres: v.car.bootLitres,
      engineCc: v.engineCc,
      powerBhp: v.powerBhp,
      features: v.features,
      emi: emiInr(v.priceInr),
      monthlyFuel: monthlyFuelInr(v.fuelType, v.mileageKmpl),
    }));

    const numericRows: { key: keyof (typeof columns)[number]; label: string; bestIs: "high" | "low" }[] = [
      { key: "priceInr", label: "Ex-showroom price", bestIs: "low" },
      { key: "emi", label: "EMI / month (60 mo)", bestIs: "low" },
      { key: "monthlyFuel", label: "Estimated fuel / month", bestIs: "low" },
      { key: "mileageKmpl", label: "Mileage (kmpl)", bestIs: "high" },
      { key: "safetyRating", label: "Safety rating", bestIs: "high" },
      { key: "seating", label: "Seating", bestIs: "high" },
      { key: "bootLitres", label: "Boot (L)", bestIs: "high" },
      { key: "powerBhp", label: "Power (bhp)", bestIs: "high" },
      { key: "engineCc", label: "Engine (cc)", bestIs: "high" },
      { key: "lengthMm", label: "Length (mm)", bestIs: "low" },
    ];

    const rows = numericRows.map((row) => {
      const values = columns.map((c) => Number(c[row.key]));
      const best = row.bestIs === "high" ? Math.max(...values) : Math.min(...values);
      return {
        label: row.label,
        bestIs: row.bestIs,
        cells: values.map((v) => ({ value: v, best: v === best })),
      };
    });

    return { columns, rows };
  });
}
