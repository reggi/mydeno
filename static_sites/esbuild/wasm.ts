import { build } from "https://deno.land/x/esbuild@v0.17.18/wasm.js";
import { buildRoute } from "./lib.ts";

export const bundleJavascript = buildRoute(build)