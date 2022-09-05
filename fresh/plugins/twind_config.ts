import { IS_BROWSER } from "https://deno.land/x/fresh@1.0.2/runtime.ts";
import { Configuration, setup } from "https://esm.sh/v93/twind@0.16.17";
export * from "https://esm.sh/v93/twind@0.16.17/es2022/twind.js"
export const config: Configuration = {
  darkMode: "class",
  mode: "silent",
};
if (IS_BROWSER) setup(config);
