import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet";
import { useDatabaseStore } from "~/store/database-store";
import { useState } from "react";

export const Route = createFileRoute(
  "/__dashboard/databases/$dbId/configuration"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { dbId } = Route.useParams();
  const { databases } = useDatabaseStore();
  const [blockReads, setBlockReads] = useState(false);
  const [blockWrites, setBlockWrites] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const database = databases.find((db) => db.id === dbId);

  if (!database) {
    return <div>Database not found</div>;
  }

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    console.log("Configuration saved:", { blockReads, blockWrites });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Helmet>
        <title>Configuration - {database.name} | Keisha</title>
      </Helmet>

      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Database Configuration
        </h1>
        <p className="text-gray-600">
          Manage access controls and security settings for your database.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl">
        {/* Access Controls Section */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Access Controls
          </h2>
          <div className="space-y-6">
            {/* Block Reads Toggle */}
            <div className="flex items-center justify-between py-4">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  Block Read Operations
                </h3>
                <p className="text-sm text-gray-500">
                  Prevent all read operations on this database. Existing
                  connections will be blocked from reading data.
                </p>
              </div>
              <div className="ml-6">
                <button
                  onClick={() => setBlockReads(!blockReads)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    blockReads ? "bg-red-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      blockReads ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Block Writes Toggle */}
            <div className="flex items-center justify-between py-4">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  Block Write Operations
                </h3>
                <p className="text-sm text-gray-500">
                  Prevent all write operations on this database. This includes
                  inserts, updates, and deletions.
                </p>
              </div>
              <div className="ml-6">
                <button
                  onClick={() => setBlockWrites(!blockWrites)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    blockWrites ? "bg-red-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      blockWrites ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        {(blockReads || blockWrites) && (
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Current Restrictions
            </h3>
            <div className="space-y-2">
              {blockReads && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-red-700">
                    Read operations are blocked
                  </span>
                </div>
              )}
              {blockWrites && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-red-700">
                    Write operations are blocked
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Changes will take effect immediately and apply to all
                connections.
              </p>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSaving && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              <span>{isSaving ? "Saving..." : "Save Configuration"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Warning Section */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 text-amber-600 mt-0.5">⚠️</div>
          <div>
            <h3 className="text-sm font-medium text-amber-800 mb-1">
              Important Notice
            </h3>
            <p className="text-sm text-amber-700">
              Blocking operations will immediately affect all active connections
              to this database. Make sure to communicate any maintenance windows
              to your team before enabling these restrictions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
