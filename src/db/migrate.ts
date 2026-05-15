import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const createTableSQL = `
CREATE TABLE IF NOT EXISTS diagnoses (
  id UUID PRIMARY KEY,
  state TEXT NOT NULL,
  symptoms TEXT[] DEFAULT ARRAY[]::TEXT[],
  protocol TEXT[] DEFAULT ARRAY[]::TEXT[],
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
`;

async function migrate() {
  try {
    await client.connect();
    await client.query(createTableSQL);
    console.log('Migration completed');
  } catch (error) {
    console.error('Migration failed', error);
  } finally {
    await client.end();
  }
}

migrate();
