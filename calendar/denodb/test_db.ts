// deno run --allow-env --allow-net ../denodb/test_conn.ts

import { Database, PostgresConnector } from "https://deno.land/x/denodb/mod.ts";
import Calendar from './model.ts';

export const connection = new PostgresConnector({
  host: 'localhost',
  username: 'postgres',
  password: '',
  database: 'deno',
});

const db = new Database(connection);
db.link([Calendar]);

export default db;