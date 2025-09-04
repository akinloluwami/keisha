import { Outlet } from "@tanstack/react-router";
import { Helmet } from "react-helmet";
import type { Database } from "~/store/database-store";
import { DatabaseHeader } from "./database-header";
import { DatabaseNavigation } from "./database-navigation";

interface Tab {
  name: string;
  href: string;
  id: string;
}

interface DatabaseLayoutProps {
  database: Database;
  tabs: Tab[];
  activeTab: string;
}

export function DatabaseLayout({
  database,
  tabs,
  activeTab,
}: DatabaseLayoutProps) {
  return (
    <div className="">
      <Helmet>
        <title>{database.name} - Keisha Console</title>
        <meta
          name="description"
          content={`Manage your ${database.name} KV database`}
        />
      </Helmet>

      <DatabaseHeader database={database} />
      <DatabaseNavigation tabs={tabs} activeTab={activeTab} />

      <div className="w-full mt-10">
        <Outlet />
      </div>
    </div>
  );
}
