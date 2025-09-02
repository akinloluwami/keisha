import { promises as fs } from "fs";
import * as path from "path";

export interface KVEntry {
  key: string;
  value: Buffer;
  deleted?: boolean;
  offset?: number;
}

export class KeishaStorage {
  private filePath: string;
  private index: Map<string, number> = new Map();

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async init() {
    // Ensure file exists
    await fs.open(this.filePath, "a+").then((fh) => fh.close());
    await this.buildIndex();
  }

  private async buildIndex() {
    this.index.clear();
    const fh = await fs.open(this.filePath, "r");
    const data = await fh.readFile();
    await fh.close();
    let offset = 0;
    while (offset < data.length) {
      const nextNewline = data.indexOf(10, offset); // \n
      if (nextNewline === -1) break;
      const line = data.subarray(offset, nextNewline).toString();
      try {
        const entry: KVEntry = JSON.parse(line);
        this.index.set(entry.key, offset);
      } catch {}
      offset = nextNewline + 1;
    }
  }

  async get(key: string): Promise<Buffer | null> {
    if (!this.index.has(key)) return null;
    const offset = this.index.get(key)!;
    const fh = await fs.open(this.filePath, "r");
    const data = await fh.readFile();
    await fh.close();
    const nextNewline = data.indexOf(10, offset);
    if (nextNewline === -1) return null; // No newline found, likely corrupted or incomplete
    const line = data.subarray(offset, nextNewline).toString();
    if (!line.trim()) return null; // Skip empty lines
    let entry: KVEntry;
    try {
      entry = JSON.parse(line);
    } catch {
      return null;
    }
    if (entry.deleted) return null;
    return Buffer.from(entry.value);
  }

  async set(key: string, value: Buffer) {
    const entry: KVEntry = { key, value };
    const offset = await this.getFileEndOffset();
    await this.appendEntry(entry);
    this.index.set(key, offset);
  }

  async delete(key: string) {
    const entry: KVEntry = { key, value: Buffer.alloc(0), deleted: true };
    await this.appendEntry(entry);
    this.index.delete(key);
  }

  private async appendEntry(entry: KVEntry) {
    const fh = await fs.open(this.filePath, "a");
    const line = JSON.stringify(entry) + "\n";
    await fh.appendFile(line);
    await fh.close();
  }

  private async getFileEndOffset(): Promise<number> {
    const stats = await fs.stat(this.filePath);
    return stats.size;
  }
}
