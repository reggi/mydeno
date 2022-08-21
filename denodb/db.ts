// deno run --allow-env --allow-net ../denodb/test_conn.ts

import { Database, PostgresConnector } from "https://deno.land/x/denodb/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

export const connection = (() => {
  const DENODB_PGURL = Deno.env.get('DENODB_PGURL');

  if (DENODB_PGURL) {
    return new PostgresConnector({uri: DENODB_PGURL});  
  }

  const DENODB_HOST = Deno.env.get('DENODB_HOST');
  if (!DENODB_HOST) throw new Error('DENODB_HOST is not set');
  const DENODB_USERNAME = Deno.env.get('DENODB_USERNAME');
  if (!DENODB_USERNAME) throw new Error('DENODB_USERNAME is not set');
  const DENODB_PASSWORD = Deno.env.get('DENODB_HOST');
  if (!DENODB_PASSWORD) throw new Error('DENODB_PASSWORD is not set');
  const DENODB_DATABASE = Deno.env.get('DENODB_DATABASE');
  if (!DENODB_DATABASE) throw new Error('DENODB_DATABASE is not set');
  
  return new PostgresConnector({
    host: DENODB_HOST,
    username: DENODB_USERNAME,
    password: DENODB_PASSWORD,
    database: DENODB_DATABASE,
  });

})()

const db = new Database(connection);

export default db;