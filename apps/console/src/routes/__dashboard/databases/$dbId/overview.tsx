import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet";
import { useDatabaseStore } from "~/store/database-store";

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
    </div>
  );
}
