import { useState } from "react";

interface KeyValuePair {
  key: string;
  value: string | number | boolean | object;
  type: "string" | "number" | "boolean" | "json";
  size: string;
  lastModified: string;
}

interface ValueViewerProps {
  selectedItem: KeyValuePair | null;
}

export function ValueViewer({ selectedItem }: ValueViewerProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

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

  return (
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
  );
}
