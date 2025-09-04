import { useState } from "react";

interface DatabaseUrlSectionProps {
  connectionString: string;
}

export function DatabaseUrlSection({
  connectionString,
}: DatabaseUrlSectionProps) {
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

  return (
    <div className="bg-white border border-gray-200 rounded-2xl mb-6">
      <div className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Database URL
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={connectionString}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 text-sm font-mono"
            />
            <button
              onClick={() => copyToClipboard(connectionString, "connection")}
              className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-xl"
            >
              {copiedText === "connection" ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
