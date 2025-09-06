import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet";
import { useDemoStore } from "~/store/demo-store";
import { DatabaseConfiguration } from "~/components/database";

export const Route = createFileRoute("/__dashboard/demo/configuration")({
  component: RouteComponent,
});

function RouteComponent() {
  const { database } = useDemoStore();

  return (
    <div className="">
      <Helmet>
        <title>Configuration - {database.name} | Keisha</title>
      </Helmet>
      <DatabaseConfiguration database={database} />
    </div>
  );
}
