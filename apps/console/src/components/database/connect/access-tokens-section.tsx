interface Token {
  id: string;
  name: string;
  permissions: string[];
  lastUsed: string;
  created: string;
  prefix: string;
}

interface AccessTokensSectionProps {
  tokens: Token[];
}

export function AccessTokensSection({ tokens }: AccessTokensSectionProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl mb-6">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Access Tokens</h3>
            <p className="text-sm text-gray-500 mt-1">
              Manage API tokens for your database access
            </p>
          </div>
          <button className="px-4 py-2 bg-black text-white text-sm rounded-xl hover:bg-black/85 transition-colors">
            Create Token
          </button>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {tokens.map((token) => (
          <div key={token.id} className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    {token.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {token.permissions.join(", ")} • Last used {token.lastUsed}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  Edit
                </button>
                <button className="text-sm text-red-500 hover:text-red-700">
                  Revoke
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={`${token.prefix}••••••••••••••••••••••••••••••••`}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 text-sm font-mono text-gray-500"
              />
              <span className="px-3 py-2 text-xs text-gray-400 bg-gray-100 border border-gray-300 rounded-xl">
                Hidden for security
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Created on {token.created}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
