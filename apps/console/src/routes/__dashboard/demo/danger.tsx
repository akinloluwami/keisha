import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet";
import { useDemoStore } from "~/store/demo-store";
import { DatabaseDanger } from "~/components/database";

export const Route = createFileRoute("/__dashboard/demo/danger")({
  component: RouteComponent,
});

function RouteComponent() {
  const { database } = useDemoStore();

  return (
    <div className="">
      <Helmet>
        <title>Danger Zone - {database.name} | Keisha</title>
      </Helmet>
      <DatabaseDanger database={database} />
    </div>
  );
}
