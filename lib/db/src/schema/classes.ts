import { pgTable, serial, text, integer, numeric, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const levelEnum = pgEnum("level", ["Beginner", "Intermediate", "Advanced", "Elite"]);

export const classesTable = pgTable("classes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  level: levelEnum("level").notNull(),
  description: text("description").notNull(),
  schedule: text("schedule").notNull(),
  duration: text("duration").notNull(),
  maxStudents: integer("max_students").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  coachName: text("coach_name").notNull(),
  imageUrl: text("image_url"),
});

export const insertClassSchema = createInsertSchema(classesTable).omit({ id: true });
export type InsertClass = z.infer<typeof insertClassSchema>;
export type BadmintonClass = typeof classesTable.$inferSelect;
