import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardHeader } from "../components/dashboard-header";

export const Route = createFileRoute("/__dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <DashboardHeader />
      <div className="bg-gray-50 min-h-[calc(100vh-5rem)]">
        <div className="max-w-5xl mx-auto p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
