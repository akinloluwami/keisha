import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet";
import { useDatabaseStore } from "~/store/database-store";
import { useState } from "react";
import { LineChart } from "~/components/charts/line-chart";

export const Route = createFileRoute("/__dashboard/databases/$dbId/analytics")({
  component: RouteComponent,
});

function RouteComponent() {
  const { dbId } = Route.useParams();
  const { databases } = useDatabaseStore();
  const [timeRange, setTimeRange] = useState("7d");

  const database = databases.find((db) => db.id === dbId);

  if (!database) {
    return <div>Database not found</div>;
  }

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

      <div className="mb-8">
        <div className="flex items-center justify-end">
          <div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <LineChart
          data={database.analytics.operationsData}
          title="Operations per Hour"
          type="area"
          dataKey="operations"
          stroke="#3B82F6"
        />

        <LineChart
          data={database.analytics.bandwidthData}
          title="Bandwidth Usage"
          type="line"
          lines={[
            { dataKey: "inbound", stroke: "#3B82F6", name: "Inbound" },
            { dataKey: "outbound", stroke: "#10B981", name: "Outbound" },
          ]}
          showLegend={true}
        />

        <LineChart
          data={database.analytics.commandsData}
          title="Commands Comparison"
          type="line"
          lines={[
            { dataKey: "GET", stroke: "#10b981", name: "GET" },
            { dataKey: "SET", stroke: "#3b82f6", name: "SET" },
            { dataKey: "DELETE", stroke: "#ef4444", name: "DELETE" },
          ]}
          showLegend={true}
        />

        <LineChart
          data={database.analytics.dataSizeData}
          title="Data Size"
          type="area"
          dataKey="size"
          stroke="#8B5CF6"
          formatTooltip={(value) => [`${value} GB`, "Data Size"]}
        />
      </div>
    </div>
  );
}
