import { createFileRoute } from "@tanstack/react-router";
import { useDemoStore } from "~/store/demo-store";
import { DatabaseAnalytics } from "~/components/database";

export const Route = createFileRoute("/__dashboard/demo/analytics")({
  component: RouteComponent,
});

function RouteComponent() {
  const { database } = useDemoStore();

  return <DatabaseAnalytics database={database} />;
}
