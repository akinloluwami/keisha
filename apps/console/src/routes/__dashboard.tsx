import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "motion/react";

const links = [
  {
    to: "/databases",
    label: "Databases",
  },
  {
    to: "/analytics",
    label: "Analytics",
  },
  {
    to: "/logs",
    label: "Logs",
  },
  {
    to: "/settings",
    label: "Settings",
  },
];
export const Route = createFileRoute("/__dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const location = useLocation();

  return (
    <div>
      <div className="flex items-center justify-between bg-black">
        <div className="max-w-5xl mx-auto flex w-full items-center justify-between p-4 text-white">
          <h2 className="text-4xl">💃</h2>
          <div className="relative flex items-center gap-x-4 border border-white/15 rounded-2xl p-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative font-light text-sm rounded-md px-3 py-2 hover:bg-white/10 transition-colors z-10"
              >
                {location.pathname === link.to && (
                  <motion.div
                    layoutId="highlight"
                    className="absolute inset-0 bg-white rounded-xl"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
                <span
                  className={`relative ${location.pathname === link.to ? "text-black font-medium" : "text-white"}`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
          <button className="bg-accent text-white rounded-xl px-4 py-3 text-sm hover:bg-accent/90 transition-colors">
            Create database
          </button>
        </div>
      </div>
      <div className="bg-gray-50 min-h-[calc(100vh-5rem)]">
        <div className="max-w-5xl mx-auto p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
