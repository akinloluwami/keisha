interface DangerActionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonColor?: "red" | "orange";
  onAction: () => void;
}

export function DangerAction({
  title,
  description,
  buttonText,
  buttonColor = "red",
  onAction,
}: DangerActionProps) {
  const buttonColorClasses = {
    red: "text-red-700 border-red-300 hover:bg-red-50",
    orange: "text-orange-700 border-orange-300 hover:bg-orange-50",
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <button
          onClick={onAction}
          className={`px-4 py-2 ${buttonColorClasses[buttonColor]} text-sm font-medium rounded-xl transition-colors`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
