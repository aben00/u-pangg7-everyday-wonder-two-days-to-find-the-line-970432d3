// SPDX-License-Identifier: MIT
// Everyday Wonder, Two Days to Find the Line — one sentence, at most 200 characters.
// Writes the entry to /output/entry.txt and verifies it byte-for-byte.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Entry: the fridge light as a small sunrise staged for one person at 3 a.m. —
// a grounded, familiar moment (a midnight kitchen) with the surprise landing
// late, in "the kitchen felt chosen": the room, not the person, is honoured.
const ENTRY =
  "At 3 a.m. the fridge light came on like a small sunrise staged only for me, and the kitchen felt chosen.";
const OUTPUT_PATH = "/output/entry.txt";
const LIMIT = 200;

function charCount(text: string): number {
  return Array.from(text).length;
}

function gateCheck(text: string): string | null {
  const n = charCount(text);
  if (n < 1) return "empty entry";
  if (n > LIMIT) return `entry is ${n} characters, over the ${LIMIT} limit`;
  if (text !== text.trim()) return "leading or trailing whitespace";
  if (text.trim().length === 0) return "entry is whitespace only";
  if (text.indexOf("\n") !== -1 || text.indexOf("\r") !== -1)
    return "entry spans more than one line";
  for (const ch of text) {
    const code = ch.codePointAt(0) as number;
    if (code < 0x20 || code === 0x7f) return "entry contains a control character";
  }
  return null;
}

const problem = gateCheck(ENTRY);
if (problem !== null) throw new Error(`gate failed: ${problem}`);

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");
const roundTrip = readFileSync(OUTPUT_PATH, "utf8");
if (roundTrip !== ENTRY) throw new Error("read-back does not match entry");
console.log(`wrote ${charCount(ENTRY)} chars to ${OUTPUT_PATH}`);
