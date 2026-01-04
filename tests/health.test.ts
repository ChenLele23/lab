import request from 'supertest';

import { createApp } from '../src/app';
import { closeDb } from "../src/db";

describe('health', () => {
  it('returns ok', async () => {
    const app = createApp();
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});

afterAll(async () => {
  await closeDb();
});
