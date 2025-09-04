interface CriticalWarningProps {
  title: string;
  description: string;
}

export function CriticalWarning({ title, description }: CriticalWarningProps) {
  return (
    <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-6">
      <div className="flex items-start space-x-3">
        <div className="w-5 h-5 text-red-600 mt-0.5">⚠️</div>
        <div>
          <h3 className="text-sm font-medium text-red-800 mb-1">{title}</h3>
          <p className="text-sm text-red-700">{description}</p>
        </div>
      </div>
    </div>
  );
}
