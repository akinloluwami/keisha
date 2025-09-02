import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  bigint,
  index,
} from "drizzle-orm/pg-core";
import { databases } from "./databases";
import { dbTokens } from "./db-tokens";

export const analytics = pgTable(
  "analytics",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    databaseId: uuid("database_id")
      .notNull()
      .references(() => databases.id, { onDelete: "cascade" }),

    // Event details
    eventType: varchar("event_type").notNull(), // "read", "write", "storage_check"
    timestamp: timestamp("timestamp").notNull().defaultNow(),

    // Metrics
    bytesRead: bigint("bytes_read", { mode: "number" }).default(0),
    bytesWritten: bigint("bytes_written", { mode: "number" }).default(0),
    storageUsed: bigint("storage_used", { mode: "number" }).default(0), // in bytes

    // Optional metadata
    operation: varchar("operation"), // "SELECT", "INSERT", "UPDATE", "DELETE", etc.
    executionTimeMs: bigint("execution_time_ms", { mode: "number" }), // query execution time

    // API context
    dbTokenId: uuid("db_token_id").references(() => dbTokens.id, {
      onDelete: "set null",
    }), // if accessed via API token
    ipAddress: varchar("ip_address"),
    userAgent: varchar("user_agent"),
  },
  (table) => ({
    // Indexes for efficient querying
    databaseIdIdx: index("analytics_database_id_idx").on(table.databaseId),
    timestampIdx: index("analytics_timestamp_idx").on(table.timestamp),
    eventTypeIdx: index("analytics_event_type_idx").on(table.eventType),
  })
);

// Types
export type Analytics = typeof analytics.$inferSelect;
export type NewAnalytics = typeof analytics.$inferInsert;
