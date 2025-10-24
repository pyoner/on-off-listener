import * as fs from "fs";
import * as path from "path";

const scriptName = path.basename(process.argv[1]);

if (process.argv.length < 3) {
  console.error(`Usage: ${scriptName} <path-to-file>`);
  process.exit(1);
}

const filePath = process.argv[2];

let content;
try {
  content = fs.readFileSync(filePath, "utf8");
} catch (error) {
  console.error(
    `Error reading file: ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exit(1);
}

const lines = content.split(/\r?\n/);

const pairs = new Map<string, string>();

const eventMapRegex = /keyof (\w+EventMap)/g;
const thisTypeRegex = /this: (\w{2,}),/g;

for (const line of lines) {
  if (line.includes("addEventListener")) {
    const thisMatch = thisTypeRegex.exec(line);
    const eventMatch = eventMapRegex.exec(line);
    if (thisMatch && eventMatch) {
      const thisType = thisMatch[1];
      const eventMap = eventMatch[1];
      if (!pairs.has(thisType)) {
        pairs.set(thisType, eventMap);
      }
    }
    // Reset exec for next line
    thisTypeRegex.lastIndex = 0;
    eventMapRegex.lastIndex = 0;
  }
}

console.log("// WARNING: This file is auto-generated. Do not edit manually.");
console.log("// Any changes will be overwritten when the script is run again.");
console.log('/// <reference lib="dom" />');
console.log("import { eventMap } from '../../property-key';");
console.log("declare global {");
console.log(`interface EventTarget {[eventMap]: object}`);
for (const [type, map] of pairs.entries()) {
  console.log(`interface ${type} {[eventMap]: ${map}}`);
}
console.log("}");
