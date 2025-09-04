import { StatsCard } from "./stats-card";

interface Stat {
  label: string;
  value: string;
  quota: string;
}

interface StatsGridProps {
  stats: Stat[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {stats.map((stat) => (
        <StatsCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          quota={stat.quota}
        />
      ))}
    </div>
  );
}
