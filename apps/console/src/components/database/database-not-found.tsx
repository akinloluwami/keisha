export function DatabaseNotFound() {
  return (
    <div className="text-center py-12">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Database not found
      </h2>
      <p className="text-gray-600">
        The database you're looking for doesn't exist.
      </p>
    </div>
  );
}
