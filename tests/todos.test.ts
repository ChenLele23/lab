import request from 'supertest';

import { createApp } from '../src/app';

describe('todos', () => {
  it('creates and lists todos', async () => {
    const app = createApp();

    const created = await request(app).post('/api/todos').send({ title: 'first' });
    expect(created.status).toBe(201);
    expect(created.body.title).toBe('first');

    const list = await request(app).get('/api/todos');
    expect(list.status).toBe(200);
    expect(list.body.length).toBe(1);
    expect(list.body[0].title).toBe('first');
  });

  it('toggles done', async () => {
    const app = createApp();
    const created = await request(app).post('/api/todos').send({ title: 'x' });

    const updated = await request(app).patch(`/api/todos/${created.body.id}`).send({ done: true });
    expect(updated.status).toBe(200);
    expect(updated.body.done).toBe(true);
  });
});

import { closeDb } from "../src/db";

afterAll(async () => {
  await closeDb();
});
