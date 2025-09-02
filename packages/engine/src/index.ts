// Keisha Engine: Local KV database

import { KeishaStorage } from "./storage";

export interface KeishaOptions {
  path: string; // Path to .kei file
}

export class KeishaEngine {
  private storage: KeishaStorage;

  constructor(options: KeishaOptions) {
    this.storage = new KeishaStorage(options.path);
  }

  async get(key: string): Promise<Buffer | null> {
    return this.storage.get(key);
  }

  async set(key: string, value: Buffer | string): Promise<void> {
    const buf = typeof value === "string" ? Buffer.from(value) : value;
    await this.storage.set(key, buf);
  }

  async delete(key: string): Promise<void> {
    await this.storage.delete(key);
  }
}
