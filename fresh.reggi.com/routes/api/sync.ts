import Calendar from 'calendar/denodb/model.ts'
import db from '../../../denodb/db.ts'
db.link([Calendar]);

export const handler = async (_req: Request): Promise<Response> => {
  await db.sync({ drop: true });
  return new Response('ok');
};
