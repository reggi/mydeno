import { getHandler } from 'calendar/denodb/fresh/api.ts'
import Calendar from 'calendar/denodb/model.ts'
import db from '../../../denodb/db.ts'
db.link([Calendar]);

// ¯\_(ツ)_/¯ this needs to be wrapped to access db connection
export const handler = getHandler()