import type { build as esbuild } from "https://deno.land/x/esbuild@v0.17.18/mod.js";
import { denoPlugins } from "https://deno.land/x/esbuild_deno_loader@0.7.0/mod.ts";

type Options =  {
  scripts: string[]
}

export const doBuild = (build: typeof esbuild) => async (opts: Options) => {
  return await build({
    absWorkingDir: Deno.cwd(),
    splitting: true,
    plugins: [...denoPlugins()],
    stdin: {
      contents: opts.scripts.map((s) => `import "${s}";`).join('\n'),
      resolveDir: './src',
      sourcefile: 'imaginary-file.js',
      loader: 'ts',
    },
    format: "esm",
    bundle: true,
    // write: false,
    outdir: ".",
    target: ["chrome99", "firefox99", "safari15"],
    // outfile: "/meow.ts",
    platform: "neutral",
    jsx: 'automatic',
    jsxImportSource: 'preact',
  })
}

export const buildRoute = (build: typeof esbuild) => {
  return (opts: Options) => {
    return async () => {
      const body = await (async () => {
        const result = await doBuild(build)(opts)
        const firstFile = result.outputFiles && result.outputFiles[0]
        const body = firstFile && firstFile.text
        return body
      })()
      return new Response(body || '', { status: 200, headers: { 'content-type': 'text/javascript' }})
    }
  }
}