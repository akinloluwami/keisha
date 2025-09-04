interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  title: string;
  description: string;
  color?: "red" | "blue" | "green";
}

export function ToggleSwitch({
  enabled,
  onChange,
  title,
  description,
  color = "blue",
}: ToggleSwitchProps) {
  const getColorClasses = () => {
    switch (color) {
      case "red":
        return enabled ? "bg-red-600" : "bg-gray-200";
      case "green":
        return enabled ? "bg-green-600" : "bg-gray-200";
      case "blue":
      default:
        return enabled ? "bg-blue-600" : "bg-gray-200";
    }
  };

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="ml-6">
        <button
          onClick={() => onChange(!enabled)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${getColorClasses()}`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              enabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
