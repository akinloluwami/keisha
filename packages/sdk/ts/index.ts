import { KeishaEngine } from "@keishadb/engine";

/**
 * KeishaSDK: Unified interface for local and (future) cloud Keisha backends.
 *
 * Usage:
 *   const sdk = new KeishaSDK("./mydb.kei");
 *   await sdk.set("foo", "bar");
 *   const value = await sdk.get("foo");
 */
export class KeishaSDK {
  private engine?: KeishaEngine;
  // private cloudClient?: any; // For future cloud support
  private isLocal: boolean;

  /**
   * @param connectionString - Local file path (e.g. "./mydb.kei") or cloud URI (e.g. "keisha://user:pass@host/db")
   */
  constructor(private connectionString: string) {
    this.isLocal = this.isLocalPath(connectionString);

    if (this.isLocal) {
      this.engine = new KeishaEngine({ path: connectionString });
      // Optionally, you may want to call engine['storage'].init() here if required by your engine
      // (async init is not supported in constructor, so expose an async init() if needed)
    } else {
      // TODO: Initialize cloud backend client here
      // this.cloudClient = new KeishaCloudClient(connectionString);
      throw new Error("Cloud backend not implemented yet.");
    }
  }

  /**
   * Get a value by key.
   * @param key
   * @returns Buffer or null if not found
   */
  async get(key: string): Promise<Buffer | null> {
    if (this.engine) {
      return this.engine.get(key);
    }
    // TODO: Cloud backend
    throw new Error("Cloud backend not implemented yet.");
  }

  /**
   * Set a value for a key.
   * @param key
   * @param value - string or Buffer
   */
  async set(key: string, value: string | Buffer): Promise<void> {
    if (this.engine) {
      const buf = typeof value === "string" ? Buffer.from(value) : value;
      await this.engine.set(key, buf);
      return;
    }
    // TODO: Cloud backend
    throw new Error("Cloud backend not implemented yet.");
  }

  /**
   * Delete a key.
   * @param key
   */
  async delete(key: string): Promise<void> {
    if (this.engine) {
      await this.engine.delete(key);
      return;
    }
    // TODO: Cloud backend
    throw new Error("Cloud backend not implemented yet.");
  }

  /**
   * Detect if the connection string is a local file path.
   * @param conn
   */
  private isLocalPath(conn: string): boolean {
    // Heuristic: treat as local if it doesn't start with 'keisha://'
    return !/^keisha:\/\//i.test(conn);
  }
}

export default KeishaSDK;
