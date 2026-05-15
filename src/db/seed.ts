import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const seedSQL = `
INSERT INTO diagnoses (id, state, symptoms, protocol, notes)
VALUES
  ('1e7b6d1c-8e7f-4f3d-9b08-8724b3b22b9b', 'functional', ARRAY['sleep', 'caffeine'], ARRAY['Hydrate', 'Take a break', 'Eat a nutrient-rich snack', 'Take one small win'], 'Sample saved diagnosis'),
  ('aa11bb22-cc33-dd44-ee55-ff6677889900', 'cave', ARRAY['social'], ARRAY['Retreat to a safe space', 'Tell someone you are taking a break', 'Do one low-stimulation activity', 'Allow yourself to rest'], 'Sample cave mode diagnosis');
`;

async function seed() {
  try {
    await client.connect();
    await client.query(seedSQL);
    console.log('Seed completed');
  } catch (error) {
    console.error('Seed failed', error);
  } finally {
    await client.end();
  }
}

seed();
