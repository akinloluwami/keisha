import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet";
import { useDatabaseStore } from "~/store/database-store";
import { useState } from "react";

export const Route = createFileRoute("/__dashboard/databases/$dbId/danger")({
  component: RouteComponent,
});

function RouteComponent() {
  const { dbId } = Route.useParams();
  const { databases } = useDatabaseStore();
  const [showInvalidateConfirm, setShowInvalidateConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isInvalidating, setIsInvalidating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const database = databases.find((db) => db.id === dbId);

  if (!database) {
    return <div>Database not found</div>;
  }

  const handleInvalidateTokens = async () => {
    setIsInvalidating(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsInvalidating(false);
    setShowInvalidateConfirm(false);
    console.log("All tokens invalidated for database:", database.name);
  };

  const handleDeleteDatabase = async () => {
    setIsDeleting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsDeleting(false);
    setShowDeleteConfirm(false);
    setConfirmText("");
    console.log("Database deleted:", database.name);
    // In real app, redirect to dashboard
  };

  const canDelete = confirmText === database.name;

  return (
    <div className="">
      <Helmet>
        <title>Danger Zone - {database.name} | Keisha</title>
      </Helmet>

      <div className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-200">
        {/* Invalidate All Tokens */}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-gray-900">
                Invalidate All Tokens
              </h3>
              <p className="text-sm text-gray-500">
                Revoke access for all applications and services
              </p>
            </div>
            <button
              onClick={() => setShowInvalidateConfirm(true)}
              className="px-4 py-2 text-orange-700 border border-orange-300 text-sm font-medium rounded-xl hover:bg-orange-50 transition-colors"
            >
              Invalidate
            </button>
          </div>
        </div>

        {/* Delete Database */}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-gray-900">
                Delete Database
              </h3>
              <p className="text-sm text-gray-500">
                Permanently remove all data and configurations
              </p>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 text-red-700 border border-red-300 text-sm font-medium rounded-xl hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Warning Section */}
      <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-6">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 text-red-600 mt-0.5">⚠️</div>
          <div>
            <h3 className="text-sm font-medium text-red-800 mb-1">
              Critical Warning
            </h3>
            <p className="text-sm text-red-700">
              Deleting a database cannot be reversed. All data, configurations,
              and access tokens will be permanently lost.
            </p>
          </div>
        </div>
      </div>

      {/* Invalidate Tokens Confirmation Modal */}
      {showInvalidateConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Invalidate All Tokens
            </h3>
            <p className="text-gray-600 mb-6">
              This will immediately revoke all access tokens for{" "}
              <span className="font-medium text-gray-900">{database.name}</span>
              . Applications will need new tokens to reconnect.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowInvalidateConfirm(false)}
                disabled={isInvalidating}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleInvalidateTokens}
                disabled={isInvalidating}
                className="flex-1 px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-xl hover:bg-orange-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isInvalidating && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                <span>{isInvalidating ? "Invalidating..." : "Invalidate"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Database Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Delete Database
            </h3>
            <p className="text-gray-600 mb-4">
              This will permanently delete{" "}
              <span className="font-medium text-gray-900">{database.name}</span>{" "}
              and all its data. This action cannot be undone.
            </p>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type{" "}
                <span className="font-mono text-red-600">{database.name}</span>{" "}
                to confirm:
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={database.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setConfirmText("");
                }}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteDatabase}
                disabled={isDeleting || !canDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isDeleting && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                <span>{isDeleting ? "Deleting..." : "Delete Database"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
