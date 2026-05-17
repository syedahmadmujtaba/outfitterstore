import { query } from '@/lib/db';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

const migrationsDir = join(process.cwd(), 'db', 'migrations');

async function runMigrations() {
  console.log('Running migrations...');

  const files = readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const exists = await query(`SELECT 1 FROM migrations WHERE name = $1`, [file]);

    if (exists.length > 0) {
      console.log(`  ✓ ${file} (already applied)`);
      continue;
    }

    const filePath = join(migrationsDir, file);
    const migrationSql = readFileSync(filePath, 'utf-8');

    await query(migrationSql);
    await query(`INSERT INTO migrations (name) VALUES ($1)`, [file]);

    console.log(`  ✓ ${file} (applied)`);
  }

  console.log('All migrations complete.');
}

runMigrations().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
