import { Router, type IRouter } from "express";
import { coachesTable } from "@workspace/db/schema";
import { GetCoachesResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/coaches", async (_req, res) => {
  if (!process.env.DATABASE_URL) {
    res.status(503).json({ message: "DATABASE_URL is not configured" });
    return;
  }

  const { db } = await import("@workspace/db");
  const coaches = await db.select().from(coachesTable).orderBy(coachesTable.id);
  const data = GetCoachesResponse.parse(
    coaches.map((c) => ({
      ...c,
      rating: Number(c.rating),
      imageUrl: c.imageUrl ?? undefined,
    }))
  );
  res.json(data);
});

export default router;
