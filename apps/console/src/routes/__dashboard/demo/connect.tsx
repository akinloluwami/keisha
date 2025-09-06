import { createFileRoute } from "@tanstack/react-router";
import { useDemoStore } from "~/store/demo-store";
import { DatabaseConnect } from "~/components/database";

export const Route = createFileRoute("/__dashboard/demo/connect")({
  component: RouteComponent,
});

function RouteComponent() {
  const { database } = useDemoStore();

  return <DatabaseConnect database={database} />;
}
