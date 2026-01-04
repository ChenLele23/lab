import express from 'express';

import { pool } from './db';

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(express.static('public'));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });
  
  app.get('/api/db/ping', async (_req,res) => {
    const r = await pool.query('select now() as now');
    res.json({ ok: true, now: r.rows[0].now });
  });

  app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body ?? {};
    const demoUser = process.env.DEMO_USER ?? 'admin';
    const demoPass = process.env.DEMO_PASS ?? 'admin';

    const success = username === demoUser && password === demoPass;

    // TODO (lab step #4): add logging here in a separate branch (feature/logging)

    if (!success) return res.status(401).json({ ok: false, message: 'Invalid credentials' });

    return res.json({ ok: true, user: { username } });
  });

  app.get('/api/todos', async (_req, res) => {
    const { rows } = await pool.query('SELECT id, title, done, created_at FROM todos ORDER BY id DESC;');
    res.json(rows);
  });

  app.post('/api/todos', async (req, res) => {
    const title = String(req.body?.title ?? '').trim();
    if (!title) return res.status(400).json({ message: 'title is required' });

    const { rows } = await pool.query(
      'INSERT INTO todos(title) VALUES($1) RETURNING id, title, done, created_at;',
      [title],
    );
    res.status(201).json(rows[0]);
  });

  app.patch('/api/todos/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ message: 'invalid id' });

    const done = Boolean(req.body?.done);
    const { rows } = await pool.query(
      'UPDATE todos SET done=$1 WHERE id=$2 RETURNING id, title, done, created_at;',
      [done, id],
    );

    if (rows.length === 0) return res.status(404).json({ message: 'not found' });
    res.json(rows[0]);
  });

  app.delete('/api/todos/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ message: 'invalid id' });

    const { rowCount } = await pool.query('DELETE FROM todos WHERE id=$1;', [id]);
    if (!rowCount) return res.status(404).json({ message: 'not found' });
    res.status(204).send();
  });

  return app;
}
