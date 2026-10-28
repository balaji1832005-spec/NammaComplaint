import { pgTable, serial, text, timestamp, index } from "drizzle-orm/pg-core";

export const complaints = pgTable(
  "complaints",
  {
    id: serial().primaryKey(),
    trackingId: text("tracking_id").notNull().unique(),
    name: text().notNull(),
    phone: text().notNull(),
    category: text().notNull(),
    area: text().notNull(),
    description: text().notNull(),
    status: text().notNull().default("submitted"),
    adminNote: text("admin_note").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("complaints_status_idx").on(t.status), index("complaints_created_at_idx").on(t.createdAt)],
);
