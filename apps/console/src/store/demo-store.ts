import { create } from "zustand";
import { faker } from "@faker-js/faker";

// Generate chart data for a database
const generateChartData = () => {
  const timePoints = [
    "00:00",
    "04:00",
    "08:00",
    "12:00",
    "16:00",
    "20:00",
    "24:00",
  ];

  // Generate 30 days of data for bar charts
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });

  return {
    operationsData: timePoints.map((time) => ({
      time,
      operations: faker.number.int({ min: 100, max: 1500 }),
    })),
    bandwidthData: timePoints.map((time) => ({
      time,
      inbound: faker.number.float({ min: 1.5, max: 25.0, fractionDigits: 1 }),
      outbound: faker.number.float({ min: 2.0, max: 30.0, fractionDigits: 1 }),
    })),
    commandsData: timePoints.map((time) => ({
      time,
      GET: faker.number.int({ min: 100, max: 1500 }),
      SET: faker.number.int({ min: 50, max: 400 }),
      DELETE: faker.number.int({ min: 10, max: 100 }),
      EXISTS: faker.number.int({ min: 5, max: 80 }),
    })),
    dataSizeData: timePoints.map((time) => ({
      time,
      size: faker.number.float({ min: 0.5, max: 2.5, fractionDigits: 2 }),
    })),
    // 30-day overview data for bar charts
    overviewData: last30Days.map((day) => ({
      day,
      operations: faker.number.int({ min: 500, max: 3000 }),
      bandwidth: faker.number.float({ min: 50, max: 200, fractionDigits: 1 }),
      storage: faker.number.float({ min: 100, max: 800, fractionDigits: 0 }),
    })),
  };
};

export interface DatabaseAnalytics {
  operationsData: Array<{ time: string; operations: number }>;
  bandwidthData: Array<{ time: string; inbound: number; outbound: number }>;
  commandsData: Array<{
    time: string;
    GET: number;
    SET: number;
    DELETE: number;
    EXISTS: number;
  }>;
  dataSizeData: Array<{ time: string; size: number }>;
  overviewData: Array<{
    day: string;
    operations: number;
    bandwidth: number;
    storage: number;
  }>;
}

export interface Database {
  id: string;
  name: string;
  seed: string;
  size: string;
  sparkline: number[];
  analytics: DatabaseAnalytics;
}

interface DatabaseStore {
  database: Database;
  updateDatabase: (updates: Partial<Omit<Database, "id">>) => void;
}

export const useDemoStore = create<DatabaseStore>((set) => ({
  database: {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "demo-database",
    seed: "DemoDatabase",
    size: "324 MB",
    sparkline: [12, 19, 3, 5, 2, 3, 20, 14, 7, 18, 9, 15],
    analytics: generateChartData(),
  },
  updateDatabase: (updates) =>
    set((state) => ({
      database: { ...state.database, ...updates },
    })),
}));
