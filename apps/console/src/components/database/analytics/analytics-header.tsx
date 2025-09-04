import { ChangeEvent } from "react";

interface AnalyticsHeaderProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
  timeRanges: { value: string; label: string }[];
}

export function AnalyticsHeader({ timeRange, setTimeRange, timeRanges }: AnalyticsHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-end">
        <div>
          <select
            value={timeRange}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setTimeRange(e.target.value)}
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
  );
}
