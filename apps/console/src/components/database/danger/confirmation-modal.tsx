import { ReactNode } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: ReactNode;
  confirmText: string;
  confirmButtonText: string;
  confirmButtonColor?: "red" | "orange";
  isLoading?: boolean;
  loadingText?: string;
  isDisabled?: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmText,
  confirmButtonText,
  confirmButtonColor = "red",
  isLoading = false,
  loadingText,
  isDisabled = false,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const buttonColorClasses = {
    red: "bg-red-600 hover:bg-red-700",
    orange: "bg-orange-600 hover:bg-orange-700",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
        <div className="mb-6">{children}</div>
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading || isDisabled}
            className={`flex-1 px-4 py-2 ${buttonColorClasses[confirmButtonColor]} text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center space-x-2`}
          >
            {isLoading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            <span>{isLoading && loadingText ? loadingText : confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
