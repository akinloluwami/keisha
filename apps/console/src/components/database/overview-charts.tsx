import { BarChart, ChartCard } from "../charts";
import type { DatabaseAnalytics } from "~/store/database-store";

interface OverviewChartsProps {
  analytics: DatabaseAnalytics;
}

export function OverviewCharts({ analytics }: OverviewChartsProps) {
  return (
    <div className="mt-8 space-y-6">
      <h2 className="uppercase text-sm text-gray-900">Last 30 Days</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Operations Chart */}
        <ChartCard title="Operations">
          <BarChart
            data={analytics.overviewData}
            xKey="day"
            bars={[{ key: "operations", color: "#3b82f6", name: "Operations" }]}
            height={200}
            formatTooltip={(value, name) => [`${value.toLocaleString()}`, name]}
          />
        </ChartCard>

        {/* Bandwidth Chart */}
        <ChartCard title="Bandwidth (MB)">
          <BarChart
            data={analytics.overviewData}
            xKey="day"
            bars={[{ key: "bandwidth", color: "#10b981", name: "Bandwidth" }]}
            height={200}
            formatTooltip={(value, name) => [`${value} MB`, name]}
          />
        </ChartCard>

        {/* Storage Chart */}
        <ChartCard title="Storage (MB)">
          <BarChart
            data={analytics.overviewData}
            xKey="day"
            bars={[{ key: "storage", color: "#f59e0b", name: "Storage" }]}
            height={200}
            formatTooltip={(value, name) => [`${value} MB`, name]}
          />
        </ChartCard>
      </div>
    </div>
  );
}
