import { useState } from "react";

interface KeyValuePair {
  key: string;
  value: string | number | boolean | object;
  type: "string" | "number" | "boolean" | "json";
  size: string;
  lastModified: string;
}

interface KeysListProps {
  kvData: KeyValuePair[];
  selectedKey: string | null;
  onSelectKey: (key: string) => void;
}

export function KeysList({ kvData, selectedKey, onSelectKey }: KeysListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredKeys = kvData.filter((item) =>
    item.key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case "string":
        return "bg-blue-100 text-blue-800";
      case "number":
        return "bg-green-100 text-green-800";
      case "boolean":
        return "bg-purple-100 text-purple-800";
      case "json":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-600">
            {filteredKeys.length} keys
          </h3>
        </div>
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search keys..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Keys List */}
      <div className="flex-1 overflow-y-auto">
        {filteredKeys.map((item) => (
          <div
            key={item.key}
            onClick={() => onSelectKey(item.key)}
            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedKey === item.key ? "bg-blue-50 border-blue-200" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-sm text-gray-900 truncate flex-1">
                {item.key}
              </span>
              <span
                className={`px-2 py-1 text-xs rounded-md font-medium ${getTypeColor(item.type)}`}
              >
                {item.type}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{item.size}</span>
            </div>
          </div>
        ))}

        {filteredKeys.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            {searchQuery ? "No keys match your search" : "No keys found"}
          </div>
        )}
      </div>
    </div>
  );
}
