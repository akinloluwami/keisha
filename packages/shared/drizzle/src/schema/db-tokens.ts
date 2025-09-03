import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  text,
} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { databases } from "./databases";

export const dbTokens = pgTable("db_tokens", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  token: varchar("token").notNull().unique(),
  permissions: varchar("permissions").notNull(), // "read", "write", or "read_write"
  databaseId: uuid("database_id").references(() => databases.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at"),
  isActive: boolean("is_active").notNull().default(true),
  name: varchar("name"),
});

// Types
export type DbToken = typeof dbTokens.$inferSelect;
export type NewDbToken = typeof dbTokens.$inferInsert;
