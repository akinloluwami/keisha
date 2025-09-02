import { KeishaSDK } from "../index";
import { promises as fs } from "fs";
import * as path from "path";

describe("KeishaSDK", () => {
  const testFile = path.join(__dirname, "testsdk.kei");
  let sdk: KeishaSDK;

  beforeAll(async () => {
    await fs.writeFile(testFile, "");
    sdk = new KeishaSDK(testFile);
    // Initialize the underlying engine storage
    await sdk["engine"]?.["storage"].init();
  });

  afterAll(async () => {
    try {
      await fs.unlink(testFile);
    } catch {}
  });

  it("should set and get a string value", async () => {
    await sdk.set("hello", "world");
    const value = await sdk.get("hello");
    expect(value?.toString()).toBe("world");
  });

  it("should set and get a buffer value", async () => {
    const buf = Buffer.from("binary data");
    await sdk.set("binary", buf);
    const value = await sdk.get("binary");
    expect(Buffer.compare(buf, value!)).toBe(0);
  });

  it("should delete a value", async () => {
    await sdk.set("temp", "delete me");
    await sdk.delete("temp");
    const value = await sdk.get("temp");
    expect(value).toBeNull();
  });

  it("should return null for non-existent key", async () => {
    const value = await sdk.get("nonexistent");
    expect(value).toBeNull();
  });

  it("should throw error for cloud connection string", () => {
    expect(() => new KeishaSDK("keisha://user:pass@host/db")).toThrow(
      "Cloud backend not implemented yet"
    );
  });
});
