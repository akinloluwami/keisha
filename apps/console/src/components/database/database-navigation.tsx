import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

interface Tab {
  name: string;
  href: string;
  id: string;
}

interface DatabaseNavigationProps {
  tabs: Tab[];
  activeTab: string;
}

export function DatabaseNavigation({
  tabs,
  activeTab,
}: DatabaseNavigationProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8 relative">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            to={tab.href}
            className={`py-2 px-1 text-sm relative z-10 ${
              activeTab === tab.id
                ? "text-accent"
                : "text-gray-500 hover:text-accent/80"
            } transition-colors duration-200`}
          >
            {tab.name}
            {activeTab === tab.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                layoutId="activeTabIndicator"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
}
