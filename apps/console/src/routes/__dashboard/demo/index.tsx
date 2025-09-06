import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/__dashboard/demo/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Navigate to="/demo/overview" />;
}
