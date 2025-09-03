import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet";
import { useDatabaseStore } from "~/store/database-store";
import { useState } from "react";

export const Route = createFileRoute("/__dashboard/databases/$dbId/connect")({
  component: RouteComponent,
});

function RouteComponent() {
  const { dbId } = Route.useParams();
  const { databases } = useDatabaseStore();
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Node.js");

  const database = databases.find((db) => db.id === dbId);

  if (!database) {
    return <div>Database not found</div>;
  }

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const connectionString = `keisha://${database.name}-${dbId.slice(0, 8)}.cloud.keisha.run`;
  const databaseUrl = `${database.name}-${dbId.slice(0, 8)}.cloud.keisha.run`;

  const codeExamples = [
    {
      language: "Node.js",
      icon: "/langs/nodejs.svg",
      code: `import { Keisha } from '@keisha/sdk';

const keisha = new Keisha({
  url: '${databaseUrl}',
});

// Basic usage
await keisha.set('key', 'value');
const value = await keisha.get('key');`,
    },
    {
      language: "Python",
      icon: "/langs/python.svg",
      code: `from keisha import Keisha

keisha = Keisha(
    url='${databaseUrl}'
)

# Basic usage
keisha.set('key', 'value')
value = keisha.get('key')`,
    },
    {
      language: "Go",
      icon: "/langs/golang_dark.svg",
      code: `package main

import (
    "github.com/keisha/keisha-go"
)

func main() {
    client := keisha.NewClient(&keisha.Options{
        URL: "${databaseUrl}",
    })

    // Basic usage
    err := client.Set("key", "value")
    val, err := client.Get("key")
}`,
    },
    {
      language: "Rust",
      icon: "/langs/rust_dark.svg",
      code: `use keisha::Client;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::new("${databaseUrl}").await?;

    // Basic usage
    client.set("key", "value").await?;
    let value: String = client.get("key").await?;
    
    Ok(())
}`,
    },
    {
      language: "PHP",
      icon: "/langs/php.svg",
      code: `<?php
require_once 'vendor/autoload.php';

use Keisha\\Client;

$keisha = new Client([
    'url' => '${databaseUrl}'
]);

// Basic usage
$keisha->set('key', 'value');
$value = $keisha->get('key');`,
    },
  ];

  return (
    <div className="">
      <Helmet>
        <title>{database.name} - Connect - Keisha</title>
      </Helmet>

      <div className="bg-white border border-gray-200 rounded-2xl mb-6">
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Database URL
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={connectionString}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-xl bg-gray-50 text-sm font-mono"
              />
              <button
                onClick={() => copyToClipboard(connectionString, "connection")}
                className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-xl"
              >
                {copiedText === "connection" ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </div>

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
            {codeExamples.map((example, index) => (
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
                  className="w-5 h-5"
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
    </div>
  );
}
