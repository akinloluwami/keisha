interface StatsCardProps {
  label: string;
  value: string;
  quota: string;
}

export function StatsCard({ label, value, quota }: StatsCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
        {label}
      </div>
      <div className="text-2xl">{value}</div>
      <div className="text-xs text-gray-400 mt-1 uppercase">{quota}</div>
    </div>
  );
}
