import { Link } from "@tanstack/react-router";
import type { Database } from "~/store/database-store";

interface DatabaseHeaderProps {
  database: Database;
}

export function DatabaseHeader({ database }: DatabaseHeaderProps) {
  return (
    <div className="mb-8">
      <Link to="/databases" className="text-sm text-gray-500 hover:underline">
        &larr; Back to Databases
      </Link>
      <div className="flex items-center space-x-4 mb-6 mt-2">
        <img
          src={`https://api.dicebear.com/9.x/glass/svg?seed=${database.name}`}
          alt="database avatar"
          className="w-12 h-12 rounded-lg"
        />
        <div>
          <h1 className="text-2xl text-gray-900">{database.name}</h1>
          <p className="text-gray-600 text-sm">{database.size}</p>
        </div>
      </div>
    </div>
  );
}
