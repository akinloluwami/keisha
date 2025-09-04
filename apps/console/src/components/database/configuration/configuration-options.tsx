import { ToggleSwitch } from "./toggle-switch";

interface ConfigurationOptionsProps {
  blockReads: boolean;
  blockWrites: boolean;
  onBlockReadsChange: (enabled: boolean) => void;
  onBlockWritesChange: (enabled: boolean) => void;
}

export function ConfigurationOptions({
  blockReads,
  blockWrites,
  onBlockReadsChange,
  onBlockWritesChange,
}: ConfigurationOptionsProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl">
      <div className="space-y-6 p-6">
        <ToggleSwitch
          enabled={blockReads}
          onChange={onBlockReadsChange}
          title="Block Read Operations"
          description="Prevent all read operations on this database. Existing connections will be blocked from reading data."
          color="red"
        />

        <ToggleSwitch
          enabled={blockWrites}
          onChange={onBlockWritesChange}
          title="Block Write Operations"
          description="Prevent all write operations on this database. This includes inserts, updates, and deletions."
          color="red"
        />
      </div>

      {/* Status Indicators */}
      {(blockReads || blockWrites) && (
        <div className="p-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Current Restrictions
          </h3>
          <div className="space-y-2">
            {blockReads && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm text-red-700">
                  Read operations are blocked
                </span>
              </div>
            )}
            {blockWrites && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm text-red-700">
                  Write operations are blocked
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
