import {
  createFileRoute,
  useParams,
  useRouterState,
} from "@tanstack/react-router";
import { useDatabaseStore } from "~/store/database-store";
import { DatabaseNotFound } from "~/components/database/database-not-found";
import { DatabaseLayout } from "~/components/database/database-layout";

export const Route = createFileRoute("/__dashboard/databases/$dbId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { dbId } = useParams({ from: "/__dashboard/databases/$dbId" });
  const { databases } = useDatabaseStore();
  const routerState = useRouterState();

  const database = databases.find((db) => db.id === dbId);

  if (!database) {
    return <DatabaseNotFound />;
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
    <DatabaseLayout database={database} tabs={tabs} activeTab={activeTab} />
  );
}
