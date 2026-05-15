import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import protocolRouter from '../src/routes/protocols';
import healthRouter from '../src/routes/health';

const app = express();
app.use(express.json());
app.use('/api/health', healthRouter);
app.use('/api/protocols', protocolRouter);

describe('Backend routes', () => {
  it('health route responds ok', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('protocol route validates input', async () => {
    const response = await request(app)
      .post('/api/protocols')
      .send({ state: '' });
    expect(response.status).toBe(400);
  });
});
