import path from "https://deno.land/std@0.152.0/node/path.ts";
import { Base64 } from "https://deno.land/x/bb64/mod.ts";

const set: {[key: string]: { mime: string, data: string }} = {}

for await (const file of Deno.readDir(Deno.args[0])) {
  if (file.isFile) {
    const fullPath = path.join(Deno.args[0], file.name)
    const [mime, data] = Base64.fromFile(fullPath).toStringWithMime().split(',')
    set[file.name] = { mime, data }
  }
}

console.log(JSON.stringify(set, null, 2))