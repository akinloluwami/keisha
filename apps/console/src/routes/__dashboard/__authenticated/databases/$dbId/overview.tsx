import { createFileRoute } from "@tanstack/react-router";
import { useDatabaseStore } from "~/store/database-store";
import { DatabaseOverview } from "~/components/database";

export const Route = createFileRoute("/__dashboard/__authenticated/databases/$dbId/overview")({
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
