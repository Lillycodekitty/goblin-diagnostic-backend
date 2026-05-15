import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'Goblin Diagnostic Backend', version: '1.0.0' });
});

export default router;
