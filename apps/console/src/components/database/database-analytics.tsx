import { Helmet } from "react-helmet";
import { AnalyticsHeader } from "./analytics-header";
import { AnalyticsCharts } from "./analytics-charts";
import type { Database } from "~/store/database-store";
import { useState } from "react";

interface DatabaseAnalyticsProps {
  database: Database;
}

export function DatabaseAnalytics({ database }: DatabaseAnalyticsProps) {
  const [timeRange, setTimeRange] = useState("7d");

  const timeRanges = [
    { value: "1h", label: "Last Hour" },
    { value: "24h", label: "Last 24 Hours" },
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
  ];

  return (
    <div className="">
      <Helmet>
        <title>Analytics - {database?.name || "Database"} | Keisha</title>
      </Helmet>
      <AnalyticsHeader
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        timeRanges={timeRanges}
      />
      <AnalyticsCharts analytics={database.analytics} />
    </div>
  );
}
