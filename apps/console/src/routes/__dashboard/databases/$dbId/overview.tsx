import { createFileRoute } from "@tanstack/react-router";
import { useDatabaseStore } from "~/store/database-store";
import { DatabaseOverview } from "~/components/database-overview";

export const Route = createFileRoute("/__dashboard/databases/$dbId/overview")({
  component: RouteComponent,
});

function RouteComponent() {
  const { dbId } = Route.useParams();
  const { databases } = useDatabaseStore();

  const database = databases.find((db) => db.id === dbId);

  if (!database) {
    return <div>Database not found</div>;
  }

  return <DatabaseOverview database={database} />;
}
