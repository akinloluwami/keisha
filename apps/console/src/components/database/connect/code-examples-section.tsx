import { useState } from "react";

interface CodeExample {
  language: string;
  icon: string;
  code: string;
}

interface CodeExamplesSectionProps {
  codeExamples: CodeExample[];
}

export function CodeExamplesSection({
  codeExamples,
}: CodeExamplesSectionProps) {
  const [activeTab, setActiveTab] = useState(
    codeExamples[0]?.language || "Node.js"
  );
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Code Examples</h3>
        <p className="text-sm text-gray-500 mt-1">
          Connect to your database using your preferred programming language
        </p>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex px-6 relative" aria-label="Tabs">
          <div
            className="absolute bottom-0 h-0.5 bg-accent transition-all duration-300 ease-in-out"
            style={{
              width: `${100 / codeExamples.length}%`,
              left: `${(codeExamples.findIndex((ex) => ex.language === activeTab) * 100) / codeExamples.length}%`,
            }}
          />
          {codeExamples.map((example) => (
            <button
              key={example.language}
              onClick={() => setActiveTab(example.language)}
              className={`py-4 px-6 font-medium text-sm transition-colors duration-200 relative flex-1 flex items-center justify-center space-x-2 ${
                activeTab === example.language
                  ? "text-accent"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <img
                src={example.icon}
                alt={`${example.language} logo`}
                className="size-5"
              />
              <span>{example.language}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {codeExamples
          .filter((example) => example.language === activeTab)
          .map((example) => (
            <div key={example.language}>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-900">
                  {example.language}
                </h4>
                <button
                  onClick={() =>
                    copyToClipboard(example.code, example.language)
                  }
                  className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-xl"
                >
                  {copiedText === example.language ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm overflow-x-auto">
                <code className="text-gray-800">{example.code}</code>
              </pre>
            </div>
          ))}
      </div>
    </div>
  );
}
