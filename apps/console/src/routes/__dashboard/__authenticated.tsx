import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { useSession } from "~/auth-client";

export const Route = createFileRoute("/__dashboard/__authenticated")({
  component: RouteComponent,
});

function RouteComponent() {
  const session = useSession();

  if (!session.data) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {JSON.stringify(session.data)}
      <Outlet />
    </>
  );
}
