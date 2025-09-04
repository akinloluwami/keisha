import { useState } from "react";
import { DangerAction } from "./danger-action";
import { CriticalWarning } from "./critical-warning";
import { ConfirmationModal } from "./confirmation-modal";

interface Database {
  id: string;
  name: string;
}

interface DatabaseDangerProps {
  database: Database;
}

export function DatabaseDanger({ database }: DatabaseDangerProps) {
  const [showInvalidateConfirm, setShowInvalidateConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isInvalidating, setIsInvalidating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
    <>
      <div className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-200">
        <DangerAction
          title="Invalidate All Tokens"
          description="Revoke access for all applications and services"
          buttonText="Invalidate"
          buttonColor="orange"
          onAction={() => setShowInvalidateConfirm(true)}
        />

        <DangerAction
          title="Delete Database"
          description="Permanently remove all data and configurations"
          buttonText="Delete"
          buttonColor="red"
          onAction={() => setShowDeleteConfirm(true)}
        />
      </div>

      <CriticalWarning
        title="Critical Warning"
        description="Deleting a database cannot be reversed. All data, configurations, and access tokens will be permanently lost."
      />

      {/* Invalidate Tokens Confirmation Modal */}
      <ConfirmationModal
        isOpen={showInvalidateConfirm}
        onClose={() => setShowInvalidateConfirm(false)}
        onConfirm={handleInvalidateTokens}
        title="Invalidate All Tokens"
        confirmText="Invalidate"
        confirmButtonText="Invalidate"
        confirmButtonColor="orange"
        isLoading={isInvalidating}
        loadingText="Invalidating..."
      >
        <p className="text-gray-600">
          This will immediately revoke all access tokens for{" "}
          <span className="font-medium text-gray-900">{database.name}</span>.
          Applications will need new tokens to reconnect.
        </p>
      </ConfirmationModal>

      {/* Delete Database Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setConfirmText("");
        }}
        onConfirm={handleDeleteDatabase}
        title="Delete Database"
        confirmText="Delete Database"
        confirmButtonText="Delete Database"
        confirmButtonColor="red"
        isLoading={isDeleting}
        loadingText="Deleting..."
        isDisabled={!canDelete}
      >
        <div>
          <p className="text-gray-600 mb-4">
            This will permanently delete{" "}
            <span className="font-medium text-gray-900">{database.name}</span>{" "}
            and all its data. This action cannot be undone.
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type{" "}
              <span className="font-mono text-red-600">{database.name}</span> to
              confirm:
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={database.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>
      </ConfirmationModal>
    </>
  );
}
