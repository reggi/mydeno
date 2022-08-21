// deno run --allow-env --allow-net ../denodb/test_init.ts

import db from './test_db.ts'

await db.sync({ drop: true });