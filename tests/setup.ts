import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

process.env.DATABASE_URL = process.env.DATABASE_URL_TEST || process.env.DATABASE_URL;

import { initDb, pool } from '../src/db';

beforeAll(async () => {
  await initDb();
});

beforeEach(async () => {
  await pool.query('TRUNCATE TABLE todos RESTART IDENTITY;');
});
