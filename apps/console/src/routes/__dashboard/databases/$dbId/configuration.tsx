import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet";
import { useDatabaseStore } from "~/store/database-store";
import { DatabaseConfiguration } from "~/components/database";

export const Route = createFileRoute(
  "/__dashboard/databases/$dbId/configuration"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { dbId } = Route.useParams();
  const { databases } = useDatabaseStore();

  const database = databases.find((db) => db.id === dbId);

  if (!database) {
    return <div>Database not found</div>;
  }

  return (
    <div className="">
      <Helmet>
        <title>Configuration - {database.name} | Keisha</title>
      </Helmet>
      <DatabaseConfiguration database={database} />
    </div>
  );
}
