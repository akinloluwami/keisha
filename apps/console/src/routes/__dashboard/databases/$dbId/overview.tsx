import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet";
import { useDatabaseStore } from "~/store/database-store";
import { BarChart } from "~/components/bar-chart";

export const Route = createFileRoute("/__dashboard/databases/$dbId/overview")({
  component: RouteComponent,
});

function RouteComponent() {
  const { dbId } = Route.useParams();
  const { databases } = useDatabaseStore();

  const database = databases.find((db) => db.id === dbId);

  if (!database) {
    return <div>Database not found</div>;
  }

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-gray-200 rounded-xl p-4"
          >
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              {stat.label}
            </div>
            <div className="text-2xl">{stat.value}</div>
            <div className="text-xs text-gray-400 mt-1 uppercase">
              {stat.quota}
            </div>
          </div>
        ))}
      </div>

      {/* 30-Day Overview Charts */}
      <div className="mt-8 space-y-6">
        <h2 className="uppercase text-sm text-gray-900">Last 30 Days</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Operations Chart */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">
              Operations
            </h3>
            <BarChart
              data={database.analytics.overviewData}
              xKey="day"
              bars={[
                { key: "operations", color: "#3b82f6", name: "Operations" },
              ]}
              height={200}
              formatTooltip={(value, name) => [
                `${value.toLocaleString()}`,
                name,
              ]}
            />
          </div>

          {/* Bandwidth Chart */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">
              Bandwidth (MB)
            </h3>
            <BarChart
              data={database.analytics.overviewData}
              xKey="day"
              bars={[{ key: "bandwidth", color: "#10b981", name: "Bandwidth" }]}
              height={200}
              formatTooltip={(value, name) => [`${value} MB`, name]}
            />
          </div>

          {/* Storage Chart */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">
              Storage (MB)
            </h3>
            <BarChart
              data={database.analytics.overviewData}
              xKey="day"
              bars={[{ key: "storage", color: "#f59e0b", name: "Storage" }]}
              height={200}
              formatTooltip={(value, name) => [`${value} MB`, name]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
