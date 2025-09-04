import { Helmet } from "react-helmet";
import { useState } from "react";
import type { Database } from "~/store/database-store";
import { ConfigurationOptions } from "./configuration-options";
import { WarningNotice } from "./warning-notice";

interface DatabaseConfigurationProps {
  database: Database;
}

export function DatabaseConfiguration({
  database,
}: DatabaseConfigurationProps) {
  const [blockReads, setBlockReads] = useState(false);
  const [blockWrites, setBlockWrites] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    console.log("Configuration saved:", { blockReads, blockWrites });
  };

  return (
    <div className="">
      <Helmet>
        <title>Configuration - {database.name} | Keisha</title>
      </Helmet>

      <ConfigurationOptions
        blockReads={blockReads}
        blockWrites={blockWrites}
        onBlockReadsChange={setBlockReads}
        onBlockWritesChange={setBlockWrites}
      />

      <WarningNotice />
    </div>
  );
}
