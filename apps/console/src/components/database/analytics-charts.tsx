import { LineChart, ChartCard } from "../charts";
import type { DatabaseAnalytics } from "~/store/database-store";

interface AnalyticsChartsProps {
  analytics: DatabaseAnalytics;
}

export function AnalyticsCharts({ analytics }: AnalyticsChartsProps) {
  return (
    <div className="space-y-8">
      <ChartCard title="Operations per Hour">
        <LineChart
          data={analytics.operationsData}
          type="area"
          dataKey="operations"
          stroke="#3B82F6"
        />
      </ChartCard>

      <ChartCard title="Bandwidth Usage">
        <LineChart
          data={analytics.bandwidthData}
          type="line"
          lines={[
            { dataKey: "inbound", stroke: "#3B82F6", name: "Inbound" },
            { dataKey: "outbound", stroke: "#10B981", name: "Outbound" },
          ]}
          showLegend={true}
        />
      </ChartCard>

      <ChartCard title="Commands Comparison">
        <LineChart
          data={analytics.commandsData}
          type="line"
          lines={[
            { dataKey: "GET", stroke: "#10b981", name: "GET" },
            { dataKey: "SET", stroke: "#3b82f6", name: "SET" },
            { dataKey: "DELETE", stroke: "#ef4444", name: "DELETE" },
          ]}
          showLegend={true}
        />
      </ChartCard>

      <ChartCard title="Data Size">
        <LineChart
          data={analytics.dataSizeData}
          type="area"
          dataKey="size"
          stroke="#8B5CF6"
          formatTooltip={(value) => [`${value} GB`, "Data Size"]}
        />
      </ChartCard>
    </div>
  );
}
