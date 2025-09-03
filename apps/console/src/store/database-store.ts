import { create } from "zustand";

export interface Database {
  id: string;
  name: string;
  seed: string;
  size: string;
  sparkline: number[];
}

interface DatabaseStore {
  databases: Database[];
  addDatabase: (database: Omit<Database, "id">) => void;
  removeDatabase: (id: string) => void;
  updateDatabase: (id: string, updates: Partial<Omit<Database, "id">>) => void;
}

export const useDatabaseStore = create<DatabaseStore>((set) => ({
  databases: [
    {
      id: "550e8400-e29b-41d4-a716-446655440001",
      name: "user-analytics",
      seed: "UserAnalytics",
      size: "324 MB",
      sparkline: [12, 19, 3, 5, 2, 3, 20, 14, 7, 18, 9, 15],
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440002",
      name: "product-catalog",
      seed: "ProductCatalog",
      size: "156 MB",
      sparkline: [8, 15, 12, 25, 18, 22, 19, 24, 16, 20, 13, 27],
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440003",
      name: "order-history",
      seed: "OrderHistory",
      size: "892 MB",
      sparkline: [5, 8, 15, 12, 25, 18, 22, 19, 14, 16, 10, 8],
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440004",
      name: "customer-support",
      seed: "CustomerSupport",
      size: "67 MB",
      sparkline: [3, 7, 4, 9, 6, 11, 8, 12, 5, 14, 7, 10],
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440005",
      name: "inventory-management",
      seed: "InventoryManagement",
      size: "234 MB",
      sparkline: [15, 18, 22, 19, 24, 16, 20, 13, 27, 21, 25, 18],
    },
  ],
  addDatabase: (database) =>
    set((state) => ({
      databases: [
        ...state.databases,
        {
          ...database,
          id: crypto.randomUUID(),
        },
      ],
    })),
  removeDatabase: (id) =>
    set((state) => ({
      databases: state.databases.filter((db) => db.id !== id),
    })),
  updateDatabase: (id, updates) =>
    set((state) => ({
      databases: state.databases.map((db) =>
        db.id === id ? { ...db, ...updates } : db
      ),
    })),
}));
