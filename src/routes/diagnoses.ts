import { Router } from 'express';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { query } from '../db/client.js';

const router = Router();

const createDiagnosisSchema = z.object({
  state: z.string().min(1),
  symptoms: z.array(z.string()).optional(),
  protocol: z.array(z.string()).optional(),
  notes: z.string().optional()
});

router.post('/', async (req, res) => {
  const parsed = createDiagnosisSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.format() });
  }

  const diagnosisId = uuidv4();
  const { state, symptoms = [], protocol = [], notes = '' } = parsed.data;

  try {
    const result = await query(
      `INSERT INTO diagnoses (id, state, symptoms, protocol, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [diagnosisId, state, symptoms, protocol, notes]
    );

    return res.status(201).json({ diagnosis: result.rows[0] });
  } catch (error) {
    console.error('DB error', error);
    return res.status(500).json({ error: 'Failed to save diagnosis' });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM diagnoses ORDER BY created_at DESC LIMIT 50');
    return res.json({ diagnoses: result.rows });
  } catch (error) {
    console.error('DB error', error);
    return res.status(500).json({ error: 'Failed to fetch diagnoses' });
  }
});

export default router;
