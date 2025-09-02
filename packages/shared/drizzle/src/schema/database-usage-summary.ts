import {
  pgTable,
  uuid,
  timestamp,
  bigint,
  date,
  unique,
} from "drizzle-orm/pg-core";
import { databases } from "./databases";

export const databaseUsageSummary = pgTable(
  "database_usage_summary",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    databaseId: uuid("database_id")
      .notNull()
      .references(() => databases.id, { onDelete: "cascade" }),

    // Time period
    date: date("date").notNull(), // Daily summaries

    // Daily aggregated metrics
    totalReads: bigint("total_reads", { mode: "number" }).notNull().default(0),
    totalWrites: bigint("total_writes", { mode: "number" })
      .notNull()
      .default(0),
    totalBytesRead: bigint("total_bytes_read", { mode: "number" })
      .notNull()
      .default(0),
    totalBytesWritten: bigint("total_bytes_written", { mode: "number" })
      .notNull()
      .default(0),
    currentStorageBytes: bigint("current_storage_bytes", { mode: "number" })
      .notNull()
      .default(0),

    // Performance metrics
    avgExecutionTimeMs: bigint("avg_execution_time_ms", {
      mode: "number",
    }).default(0),
    slowestQueryMs: bigint("slowest_query_ms", { mode: "number" }).default(0),

    // Timestamps
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    // Ensure one summary per database per day
    uniqueDatabaseDate: unique("unique_database_date").on(
      table.databaseId,
      table.date
    ),
  })
);

// Types
export type DatabaseUsageSummary = typeof databaseUsageSummary.$inferSelect;
export type NewDatabaseUsageSummary = typeof databaseUsageSummary.$inferInsert;
