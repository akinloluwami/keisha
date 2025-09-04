import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet";
import { useDatabaseStore } from "~/store/database-store";
import { useState } from "react";
import { Add } from "iconsax-reactjs";

export const Route = createFileRoute("/__dashboard/databases/$dbId/explorer")({
  component: RouteComponent,
});

interface KeyValuePair {
  key: string;
  value: string | number | boolean | object;
  type: "string" | "number" | "boolean" | "json";
  size: string;
  lastModified: string;
}

function RouteComponent() {
  const { dbId } = Route.useParams();
  const { databases } = useDatabaseStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [isAddingKey, setIsAddingKey] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newType, setNewType] = useState<
    "string" | "number" | "boolean" | "json"
  >("string");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const database = databases.find((db) => db.id === dbId);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (!database) {
    return <div>Database not found</div>;
  }

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

  const filteredKeys = kvData.filter((item) =>
    item.key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedItem = selectedKey
    ? kvData.find((item) => item.key === selectedKey)
    : null;

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

  const formatValue = (value: any, type: string) => {
    if (type === "json") {
      try {
        return JSON.stringify(JSON.parse(value.toString()), null, 2);
      } catch {
        return value.toString();
      }
    }
    return value.toString();
  };

  const handleAddKey = () => {
    // In a real app, this would make an API call
    console.log("Adding key:", { key: newKey, value: newValue, type: newType });
    setIsAddingKey(false);
    setNewKey("");
    setNewValue("");
    setNewType("string");
  };

  return (
    <div className="">
      <Helmet>
        <title>{database.name} - Explorer - Keisha</title>
      </Helmet>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
        {/* Keys List */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-2xl h-full flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">
                  {filteredKeys.length} keys
                </h3>
                <button
                  onClick={() => setIsAddingKey(true)}
                  className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Add size={16} />
                </button>
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
                  onClick={() => setSelectedKey(item.key)}
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
        </div>

        {/* Value Viewer */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-2xl h-full flex flex-col">
            {selectedItem ? (
              <>
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-md font-medium ${getTypeColor(selectedItem.type)}`}
                      >
                        {selectedItem.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-xl hover:bg-gray-50">
                        Edit
                      </button>
                      <button className="px-3 py-2 text-sm text-red-600 hover:text-red-800 border border-red-300 rounded-xl hover:bg-red-50">
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Key Info */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded-md">
                        {selectedItem.key}
                      </span>
                      <button
                        onClick={() => copyToClipboard(selectedItem.key, "key")}
                        className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                        title="Copy key"
                      >
                        {copiedText === "key" ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Size: {selectedItem.size}</span>
                      <span>•</span>
                      <span>Modified: {selectedItem.lastModified}</span>
                    </div>
                  </div>
                </div>

                {/* Value Content */}
                <div className="flex-1 p-6 min-h-0">
                  <div className="h-full flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Value
                    </label>
                    <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-4 overflow-auto min-h-[400px]">
                      <pre className="text-sm text-gray-900 whitespace-pre-wrap font-mono">
                        {formatValue(selectedItem.value, selectedItem.type)}
                      </pre>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-lg font-medium mb-2">
                    Select a key to view its value
                  </h3>
                  <p className="text-sm">
                    Choose a key from the list to see its details and value
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Key Modal */}
      {isAddingKey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Add New Key
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key
                </label>
                <input
                  type="text"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter key name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="string">String</option>
                  <option value="number">Number</option>
                  <option value="boolean">Boolean</option>
                  <option value="json">JSON</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Value
                </label>
                <textarea
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter value..."
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsAddingKey(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddKey}
                disabled={!newKey || !newValue}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Add Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
