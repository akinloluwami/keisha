export function WarningNotice() {
  return (
    <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-6">
      <div className="flex items-start space-x-3">
        <div className="w-5 h-5 text-amber-600 mt-0.5">⚠️</div>
        <div>
          <h3 className="text-sm font-medium text-amber-800 mb-1">
            Important Notice
          </h3>
          <p className="text-sm text-amber-700">
            Blocking operations will immediately affect all active connections
            to this database.
          </p>
        </div>
      </div>
    </div>
  );
}
