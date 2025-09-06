import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet";
import { useDatabaseStore } from "~/store/database-store";
import { DatabaseDanger } from "~/components/database";

export const Route = createFileRoute("/__dashboard/__authenticated/databases/$dbId/danger")({
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
        <title>Danger Zone - {database.name} | Keisha</title>
      </Helmet>
      <DatabaseDanger database={database} />
    </div>
  );
}
