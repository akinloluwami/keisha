import {
  createFileRoute,
  Navigate,
  useRouterState,
} from "@tanstack/react-router";
import { DatabaseLayout } from "~/components/database";
import { useDemoStore } from "~/store/demo-store";

export const Route = createFileRoute("/__dashboard/demo")({
  component: RouteComponent,
});

function RouteComponent() {
  const { database } = useDemoStore();
  const routerState = useRouterState();

  const tabs = [
    { name: "Overview", href: `/demo/overview`, id: "overview" },
    {
      name: "Analytics",
      href: `/demo/analytics`,
      id: "analytics",
    },
    { name: "Connect", href: `/demo/connect`, id: "connect" },
    { name: "Explorer", href: `/demo/explorer`, id: "explorer" },

    {
      name: "Configuration",
      href: `/demo/configuration`,
      id: "configuration",
    },
    { name: "Danger", href: `/demo/danger`, id: "danger" },
  ];

  const currentPath = routerState.location.pathname;
  const activeTab =
    tabs.find((tab) => currentPath.includes(tab.id))?.id || "overview";

  return (
    <>
      <DatabaseLayout database={database} tabs={tabs} activeTab={activeTab} />
    </>
  );
}
