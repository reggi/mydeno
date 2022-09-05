import { InnerRenderFunction, RenderContext } from "https://deno.land/x/fresh@1.0.2/server.ts";

type RenderPlugin = {
  (ctx: RenderContext, render: InnerRenderFunction): void;
  id?: string;
};

const uniquePlugins = (plugins: RenderPlugin[]) => {
  const cache: string[] = [];
  const result: RenderPlugin[] = [];
  plugins.forEach(plugin => {
    if (plugin.id) {
      if (cache.includes(plugin.id)) return;
      cache.push(plugin.id);
    }
    result.push(plugin)
  })  
  return result
}

export default function renderPlugin (...plugins: (RenderPlugin | RenderPlugin[])[]) {
  const _plugins = uniquePlugins([...plugins].flat())
  return (ctx: RenderContext, render: InnerRenderFunction) => {
    const reduce = _plugins.reduce((render, plugin) => {
      return () => {
        plugin(ctx, render)
        return ''
      }
    }, render)
    reduce()
  }
}