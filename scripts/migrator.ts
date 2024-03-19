import { drizzle } from 'drizzle-orm/vercel-postgres';
import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { sql } from '@vercel/postgres';

// wrap the migration script in an async IIFE (Immediately Invoked Function Expression)
// because we are using ECMAScript Modules and encountering issues with top-level await in Node.js 
// Error: `Top-level await is currently not supported with the "cjs" output format`

(async () => {
  const db = drizzle(sql);

  await migrate(db, { migrationsFolder: "drizzle" });

  await sql.end();
})();