import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

interface ChartProps {
  data: any[];
  title: string;
  type?: "line" | "area";
  lines?: Array<{
    dataKey: string;
    stroke: string;
    name: string;
  }>;
  dataKey?: string;
  stroke?: string;
  height?: number;
  showLegend?: boolean;
  formatTooltip?: (value: any, name: string) => [string, string];
}

export const LineChart: React.FC<ChartProps> = ({
  data,
  title,
  type = "line",
  lines,
  dataKey,
  stroke = "#3B82F6",
  height = 200,
  showLegend = false,
  formatTooltip,
}) => {
  const isMultiLine = lines && lines.length > 0;
  const isSingleLine = !isMultiLine && dataKey;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">{title}</span>
          {showLegend && isMultiLine && (
            <div className="flex space-x-4">
              {lines.map((line) => (
                <div key={line.dataKey} className="flex items-center space-x-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: line.stroke }}
                  />
                  <span className="text-xs text-gray-500">{line.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <ResponsiveContainer width="100%" height={height}>
          {type === "area" && isSingleLine ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id={`gradient-${dataKey}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={stroke} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={stroke} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={formatTooltip}
              />
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke={stroke}
                strokeWidth={2}
                fill={`url(#gradient-${dataKey})`}
              />
            </AreaChart>
          ) : (
            <RechartsLineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={formatTooltip}
              />
              {isMultiLine
                ? lines?.map((line) => (
                    <Line
                      key={line.dataKey}
                      type="monotone"
                      dataKey={line.dataKey}
                      stroke={line.stroke}
                      strokeWidth={2}
                      dot={false}
                    />
                  ))
                : isSingleLine && (
                    <Line
                      type="monotone"
                      dataKey={dataKey}
                      stroke={stroke}
                      strokeWidth={2}
                      dot={false}
                    />
                  )}
            </RechartsLineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
