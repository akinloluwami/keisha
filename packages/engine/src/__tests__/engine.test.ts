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

  it("should handle special characters and emojis", async () => {
    const specialText = "hehe are you babyyyy???? 🚀 café naïve résumé";
    await engine.set("special", specialText);
    const value = await engine.get("special");
    expect(value?.toString("utf-8")).toBe(specialText);
  });

  it("should preserve exact special characters without corruption", async () => {
    const testCases = [
      "how are you babyyyy????",
      "🚀 🎯 🔥 💡 ⚡️",
      "café naïve résumé",
      "@#$%^&*()",
      "한국어 中文 العربية",
      "quotes: \"hello\" 'world'",
      "tabs:\tand\nnewlines",
      "backslash: \\ forward: /",
      "curly: {} square: [] angle: <>",
    ];

    for (const original of testCases) {
      await engine.set(`test_${testCases.indexOf(original)}`, original);
      const retrieved = await engine.get(`test_${testCases.indexOf(original)}`);
      expect(retrieved?.toString("utf-8")).toBe(original);
    }
  });

  it("should store and retrieve different JSON data types", async () => {
    // Test number
    await engine.set("number_test", JSON.stringify(42));
    const numberValue = await engine.get("number_test");
    expect(numberValue?.toString()).toBe("42");

    // Test boolean
    await engine.set("boolean_test", JSON.stringify(true));
    const booleanValue = await engine.get("boolean_test");
    expect(booleanValue?.toString()).toBe("true");

    // Test object
    const testObject = { name: "John", age: 30, active: true };
    await engine.set("object_test", JSON.stringify(testObject));
    const objectValue = await engine.get("object_test");
    expect(objectValue?.toString()).toBe(
      '{"name":"John","age":30,"active":true}'
    );

    // Test array
    const testArray = [1, 2, "three", true, { nested: "object" }];
    await engine.set("array_test", JSON.stringify(testArray));
    const arrayValue = await engine.get("array_test");
    expect(arrayValue?.toString()).toBe(
      '[1,2,"three",true,{"nested":"object"}]'
    );

    // Test null
    await engine.set("null_test", JSON.stringify(null));
    const nullValue = await engine.get("null_test");
    expect(nullValue?.toString()).toBe("null");

    // Test nested complex structure
    const complexData = {
      users: [
        { id: 1, name: "Alice", tags: ["admin", "active"] },
        { id: 2, name: "Bob", tags: ["user"] },
      ],
      metadata: {
        version: "1.0",
        created: "2025-09-02",
        settings: { debug: true, maxUsers: 100 },
      },
    };
    await engine.set("complex_test", JSON.stringify(complexData));
    const complexValue = await engine.get("complex_test");
    expect(JSON.parse(complexValue?.toString()!)).toEqual(complexData);
  });
});
