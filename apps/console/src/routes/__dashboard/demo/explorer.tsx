import { createFileRoute } from "@tanstack/react-router";
import { useDemoStore } from "~/store/demo-store";
import { DatabaseExplorer } from "~/components/database";

export const Route = createFileRoute("/__dashboard/demo/explorer")({
  component: RouteComponent,
});

function RouteComponent() {
  const { database } = useDemoStore();

  return <DatabaseExplorer database={database} />;
}
