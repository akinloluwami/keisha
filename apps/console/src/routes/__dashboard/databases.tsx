import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__dashboard/databases")({
  component: RouteComponent,
});

function RouteComponent() {
  const stats = [
    {
      label: "Databases",
      value: "12",
    },
    {
      label: "Operations",
      value: "1,247",
    },
    {
      label: "Storage",
      value: "2.4 GB",
    },
  ];

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-gray-200 rounded-xl p-4"
          >
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              {stat.label}
            </div>
            <div className="text-2xl">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
