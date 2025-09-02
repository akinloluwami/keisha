import { Hono } from "hono";
import { KeishaEngine } from "@keishadb/engine";
import { Mutex } from "async-mutex";

/**
 * Keisha Cloud Backend - HTTP API for the Keisha KV engine
 *
 * Endpoints:
 *   GET /get?key=KEY → returns { value: string/base64, encoding } or 404
 *   POST /set → { key: string, value: string, encoding?: 'utf-8'|'base64' } → 200 or error
 *   DELETE /delete → { key: string } → 200 or error
 */

const app = new Hono();
const engine = new KeishaEngine({ path: "./cloud.kei" });
const writeMutex = new Mutex();

// Initialize engine storage
let isInitialized = false;
async function ensureInitialized() {
  if (!isInitialized) {
    await (engine as any)["storage"].init();
    isInitialized = true;
  }
}

// GET /get?key=KEY
app.get("/get", async (c) => {
  try {
    await ensureInitialized();
    const key = c.req.query("key");

    if (!key) {
      return c.json({ error: "Missing key parameter" }, 400);
    }

    const value = await engine.get(key);

    if (value === null) {
      return c.json({ error: "Key not found" }, 404);
    }

    // Return exactly what was stored as plain text
    return c.text(value.toString());
  } catch (error) {
    console.error("Error in GET /get:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// POST /set
app.post("/set", async (c) => {
  try {
    await ensureInitialized();
    const body = await c.req.json();

    if (!body.key || typeof body.key !== "string") {
      return c.json({ error: "Missing or invalid key" }, 400);
    }

    if (body.value === undefined) {
      return c.json({ error: "Missing value" }, 400);
    }

    // Store any JSON value by converting to string
    const valueToStore =
      typeof body.value === "string" ? body.value : JSON.stringify(body.value);

    // Use basic set method
    await writeMutex.runExclusive(async () => {
      await engine.set(body.key, valueToStore);
    });

    return c.json({ success: true });
  } catch (error) {
    console.error("Error in POST /set:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// DELETE /delete
app.delete("/delete", async (c) => {
  try {
    await ensureInitialized();
    const body = await c.req.json();

    if (!body.key || typeof body.key !== "string") {
      return c.json({ error: "Missing or invalid key" }, 400);
    }

    // Use mutex to prevent concurrent writes
    await writeMutex.runExclusive(async () => {
      await engine.delete(body.key);
    });

    return c.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /delete:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Health check endpoint
app.get("/health", (c) => {
  return c.json({ status: "ok", service: "keisha-cloud" });
});

// Start server
const port = parseInt(process.env.PORT || "2000");

export default {
  port,
  fetch: app.fetch,
};

// If this file is run directly, start the server
if (require.main === module) {
  const { serve } = require("@hono/node-server");

  console.log(`🚀 Keisha Cloud starting on port ${port}`);

  serve({
    fetch: app.fetch,
    port,
  });

  console.log(`✅ Keisha Cloud running at http://localhost:${port}`);
}
