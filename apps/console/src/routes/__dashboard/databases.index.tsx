import { createFileRoute, Link } from "@tanstack/react-router";
import { Helmet } from "react-helmet";
import { useDatabaseStore, type Database } from "~/store/database-store";

export const Route = createFileRoute("/__dashboard/databases/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { databases } = useDatabaseStore();

  const stats = [
    {
      label: "Databases",
      value: databases.length.toString(),
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
  const Sparkline = ({ data }: { data: number[] }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    const pathPoints = data
      .map((point, index) => {
        const x = (index / (data.length - 1)) * 60;
        const y = 20 - ((point - min) / range) * 20;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <svg width="60" height="20" className="text-blue-500">
        <defs>
          <linearGradient
            id="sparklineGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.8" />
            <stop
              offset="100%"
              stopColor="rgb(59, 130, 246)"
              stopOpacity="0.1"
            />
          </linearGradient>
        </defs>
        <polygon
          fill="url(#sparklineGradient)"
          points={`0,20 ${pathPoints} 60,20`}
        />
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          points={pathPoints}
        />
      </svg>
    );
  };

  return (
    <div className="">
      <Helmet>
        <title>Databases - Keisha</title>
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
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl">
        <div className="p-6 border-b border-gray-200">
          <h3 className=" text-gray-900">Databases</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {databases.map((database: Database) => (
            <Link
              to="/databases/$dbId/overview"
              params={{
                dbId: database.id,
              }}
              key={database.id}
              className="p-6 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={`https://api.dicebear.com/9.x/glass/svg?seed=${database.name}`}
                  alt="database avatar"
                  className="w-10 h-10 rounded-lg"
                />
                <div>
                  <h4 className="text-sm text-gray-900">{database.name}</h4>
                  <p className="text-sm text-gray-500">{database.size}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <Sparkline data={database.sparkline} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
