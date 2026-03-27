import { pgTable, serial, text, integer, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const coachesTable = pgTable("coaches", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio").notNull(),
  specialties: text("specialties").array().notNull(),
  experience: text("experience").notNull(),
  achievements: text("achievements").array().notNull(),
  imageUrl: text("image_url"),
  rating: numeric("rating", { precision: 3, scale: 1 }).notNull(),
  studentsCount: integer("students_count").notNull(),
});

export const insertCoachSchema = createInsertSchema(coachesTable).omit({ id: true });
export type InsertCoach = z.infer<typeof insertCoachSchema>;
export type Coach = typeof coachesTable.$inferSelect;
