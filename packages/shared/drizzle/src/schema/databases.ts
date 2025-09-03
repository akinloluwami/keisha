import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  bigint,
  boolean,
  text,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

export const databases = pgTable("databases", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: varchar("name").notNull(),
  filePath: varchar("file_path").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  version: bigint("version", { mode: "number" }).default(0),
  // Blocking flags
  blockReads: boolean("block_reads").notNull().default(false),
  blockWrites: boolean("block_writes").notNull().default(false),
});

// Types
export type Database = typeof databases.$inferSelect;
export type NewDatabase = typeof databases.$inferInsert;
