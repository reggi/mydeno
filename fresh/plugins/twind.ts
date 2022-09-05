import { InnerRenderFunction, RenderContext } from "https://deno.land/x/fresh@1.0.2/server.ts";
import { config, setup } from "./twind_config.ts";
import { virtualSheet } from "https://esm.sh/twind@0.16.17/sheets";

export default function twind () {
  const TWIND = 'twind'
  const sheet = virtualSheet();
  sheet.reset();
  setup({ ...config, sheet });
  
  function freshTwindRender(ctx: RenderContext, render: InnerRenderFunction) {
    const snapshot = ctx.state.get(TWIND) as unknown[] | null;
    sheet.reset(snapshot || undefined);
    render();
    ctx.styles.splice(0, ctx.styles.length, ...(sheet).target);
    const newSnapshot = sheet.reset();
    ctx.state.set(TWIND, newSnapshot);
  }
  freshTwindRender.id = 'freshTwindRender'
  return freshTwindRender
}