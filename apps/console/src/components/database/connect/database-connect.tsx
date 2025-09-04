import { Helmet } from "react-helmet";
import type { Database } from "~/store/database-store";
import { DatabaseUrlSection } from "./database-url-section";
import { AccessTokensSection } from "./access-tokens-section";
import { CodeExamplesSection } from "./code-examples-section";

interface DatabaseConnectProps {
  database: Database;
}

export function DatabaseConnect({ database }: DatabaseConnectProps) {
  const dbId = database.id;
  const connectionString = `keisha://${database.name}-${dbId.slice(0, 8)}.cloud.keisha.run`;
  const databaseUrl = `${database.name}-${dbId.slice(0, 8)}.cloud.keisha.run`;

  const tokens = [
    {
      id: "tkn_001",
      name: "Production Token",
      permissions: ["read", "write"],
      lastUsed: "2 hours ago",
      created: "Aug 15, 2025",
      prefix: "ksh_prod_",
    },
    {
      id: "tkn_002",
      name: "Development Token",
      permissions: ["read", "write"],
      lastUsed: "1 day ago",
      created: "Aug 10, 2025",
      prefix: "ksh_dev_",
    },
    {
      id: "tkn_003",
      name: "Read-only Token",
      permissions: ["read"],
      lastUsed: "3 days ago",
      created: "Aug 5, 2025",
      prefix: "ksh_readonly_",
    },
  ];

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

      <DatabaseUrlSection connectionString={connectionString} />
      <AccessTokensSection tokens={tokens} />
      <CodeExamplesSection codeExamples={codeExamples} />
    </div>
  );
}
