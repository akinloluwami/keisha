import { KeishaEngine } from "../index";
import { promises as fs } from "fs";
import * as path from "path";
import { randomUUID } from "crypto";

const testFile = path.join(__dirname, "benchdb.kei");
const NUM_KEYS = 10000;
const values = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  JSON.stringify({ foo: "bar", baz: 42 }),
  "The quick brown fox jumps over the lazy dog.",
  JSON.stringify({ hello: "world", arr: [1, 2, 3] }),
];

function getRandomValue() {
  return values[Math.floor(Math.random() * values.length)];
}

async function runBenchmark() {
  await fs.writeFile(testFile, "");
  const engine = new KeishaEngine({ path: testFile });
  await engine["storage"].init();

  const keys: string[] = [];

  console.log(`Writing ${NUM_KEYS} keys...`);
  const writeStart = Date.now();
  for (let i = 0; i < NUM_KEYS; i++) {
    const key = randomUUID();
    const value = getRandomValue();
    await engine.set(key, value);
    keys.push(key);
  }
  const writeEnd = Date.now();
  console.log(`Write time: ${(writeEnd - writeStart) / 1000}s`);

  console.log(`Reading ${NUM_KEYS} keys...`);
  const readStart = Date.now();
  for (const key of keys) {
    const value = await engine.get(key);
    if (!value) throw new Error(`Missing value for key ${key}`);
  }
  const readEnd = Date.now();
  console.log(`Read time: ${(readEnd - readStart) / 1000}s`);

  await fs.unlink(testFile);
}

runBenchmark().catch((err) => {
  console.error("Benchmark failed:", err);
  process.exit(1);
});
