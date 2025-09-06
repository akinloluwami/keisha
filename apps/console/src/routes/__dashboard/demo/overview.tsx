import { createFileRoute } from "@tanstack/react-router";
import { DatabaseOverview } from "~/components/database";
import { useDemoStore } from "~/store/demo-store";

export const Route = createFileRoute("/__dashboard/demo/overview")({
  component: RouteComponent,
});

function RouteComponent() {
  const { database } = useDemoStore();

  return <DatabaseOverview database={database} />;
}
