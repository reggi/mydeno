import { HandlerContext } from "https://deno.land/x/fresh@1.0.2/server.ts";
import { endpoint } from '../endpoint.ts'

export const getHandler = () => async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const request = await _req.json()
  const results = await endpoint(request);
  const ok = JSON.stringify({ ok: true })
  return new Response(ok);
};
