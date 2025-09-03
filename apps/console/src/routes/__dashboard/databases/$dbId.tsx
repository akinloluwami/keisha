import {
  createFileRoute,
  Link,
  Outlet,
  useParams,
  useRouterState,
} from "@tanstack/react-router";
import { motion } from "motion/react";
import { Helmet } from "react-helmet";
import { useDatabaseStore } from "~/store/database-store";

export const Route = createFileRoute("/__dashboard/databases/$dbId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { dbId } = useParams({ from: "/__dashboard/databases/$dbId" });
  const { databases } = useDatabaseStore();
  const routerState = useRouterState();

  const database = databases.find((db) => db.id === dbId);

  if (!database) {
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

  const tabs = [
    { name: "Overview", href: `/databases/${dbId}/overview`, id: "overview" },
    {
      name: "Analytics",
      href: `/databases/${dbId}/analytics`,
      id: "analytics",
    },
    { name: "Connect", href: `/databases/${dbId}/connect`, id: "connect" },
    { name: "Explorer", href: `/databases/${dbId}/explorer`, id: "explorer" },

    {
      name: "Configuration",
      href: `/databases/${dbId}/configuration`,
      id: "configuration",
    },
    { name: "Danger", href: `/databases/${dbId}/danger`, id: "danger" },
  ];

  const currentPath = routerState.location.pathname;
  const activeTab =
    tabs.find((tab) => currentPath.includes(tab.id))?.id || "overview";

  return (
    <div className="">
      <Helmet>
        <title>{database.name} - Keisha Console</title>
        <meta
          name="description"
          content={`Manage your ${database.name} KV database`}
        />
      </Helmet>

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

        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 relative">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.href}
                className={`py-2 px-1 text-sm relative z-10 ${
                  activeTab === tab.id
                    ? "text-accent"
                    : "text-gray-500 hover:text-accent/80"
                } transition-colors duration-200`}
              >
                {tab.name}
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    layoutId="activeTabIndicator"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
