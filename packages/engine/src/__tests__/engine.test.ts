import { KeishaEngine } from "../index";
import { promises as fs } from "fs";
import * as path from "path";

describe("KeishaEngine", () => {
  const testFile = path.join(__dirname, "testdb.kei");
  let engine: KeishaEngine;

  beforeAll(async () => {
    await fs.writeFile(testFile, "");
    engine = new KeishaEngine({ path: testFile });
    await engine["storage"].init();
  });

  afterAll(async () => {
    await fs.unlink(testFile);
  });

  it("should set and get a value", async () => {
    await engine.set("foo", "bar");
    const value = await engine.get("foo");
    expect(value?.toString()).toBe("bar");
  });

  it("should delete a value", async () => {
    await engine.set("baz", "qux");
    await engine.delete("baz");
    const value = await engine.get("baz");
    expect(value).toBeNull();
  });

  it("should handle binary blobs", async () => {
    const buf = Buffer.from([1, 2, 3, 4]);
    await engine.set("blob", buf);
    const value = await engine.get("blob");
    expect(Buffer.compare(buf, value!)).toBe(0);
  });
});
