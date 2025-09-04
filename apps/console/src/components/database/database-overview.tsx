import { Helmet } from "react-helmet";
import { StatsGrid } from "../stats";
import { OverviewCharts } from "./overview-charts";
import type { Database } from "~/store/database-store";

interface DatabaseOverviewProps {
  database: Database;
}

export function DatabaseOverview({ database }: DatabaseOverviewProps) {
  const stats = [
    {
      label: "Operations",
      value: "1,247",
      quota: "of 10,000 this month",
    },
    {
      label: "Bandwidth",
      value: "45.2 MB",
      quota: "of 1 GB this month",
    },
    {
      label: "Storage",
      value: database.size,
      quota: "of 5 GB available",
    },
  ];

  return (
    <div className="">
      <Helmet>
        <title>{database.name} - Overview - Keisha</title>
      </Helmet>

      <StatsGrid stats={stats} />
      <OverviewCharts analytics={database.analytics} />
    </div>
  );
}
