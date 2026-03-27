import { Router, type IRouter } from "express";
import { classesTable } from "@workspace/db/schema";
import { GetClassesResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/classes", async (_req, res) => {
  if (!process.env.DATABASE_URL) {
    res.status(503).json({ message: "DATABASE_URL is not configured" });
    return;
  }

  const { db } = await import("@workspace/db");
  const classes = await db.select().from(classesTable).orderBy(classesTable.id);
  const data = GetClassesResponse.parse(
    classes.map((c) => ({
      ...c,
      price: Number(c.price),
      imageUrl: c.imageUrl ?? undefined,
    }))
  );
  res.json(data);
});

export default router;
