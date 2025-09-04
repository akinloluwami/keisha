import { Helmet } from "react-helmet";
import { useState } from "react";
import type { Database } from "~/store/database-store";
import { KeysList } from "./keys-list";
import { ValueViewer } from "./value-viewer";

interface KeyValuePair {
  key: string;
  value: string | number | boolean | object;
  type: "string" | "number" | "boolean" | "json";
  size: string;
  lastModified: string;
}

interface DatabaseExplorerProps {
  database: Database;
}

export function DatabaseExplorer({ database }: DatabaseExplorerProps) {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  // Mock KV data
  const kvData: KeyValuePair[] = [
    {
      key: "user:123",
      value: '{"name": "John Doe", "email": "john@example.com", "age": 30}',
      type: "json",
      size: "68 B",
      lastModified: "2 minutes ago",
    },
    {
      key: "session:abc123",
      value: "active",
      type: "string",
      size: "6 B",
      lastModified: "5 minutes ago",
    },
    {
      key: "counter:page_views",
      value: 42567,
      type: "number",
      size: "8 B",
      lastModified: "1 minute ago",
    },
    {
      key: "feature:dark_mode",
      value: true,
      type: "boolean",
      size: "1 B",
      lastModified: "1 hour ago",
    },
    {
      key: "cache:api_response:users",
      value: '[{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]',
      type: "json",
      size: "156 B",
      lastModified: "30 seconds ago",
    },
    {
      key: "config:app_version",
      value: "1.2.3",
      type: "string",
      size: "5 B",
      lastModified: "2 hours ago",
    },
  ];

  const selectedItem = selectedKey
    ? kvData.find((item) => item.key === selectedKey) || null
    : null;

  return (
    <div className="">
      <Helmet>
        <title>{database.name} - Explorer - Keisha</title>
      </Helmet>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
        {/* Keys List */}
        <div className="lg:col-span-1">
          <KeysList
            kvData={kvData}
            selectedKey={selectedKey}
            onSelectKey={setSelectedKey}
          />
        </div>

        {/* Value Viewer */}
        <div className="lg:col-span-2">
          <ValueViewer selectedItem={selectedItem} />
        </div>
      </div>
    </div>
  );
}
