import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import protocolRouter from './routes/protocols.js';
import diagnosisRouter from './routes/diagnoses.js';
import healthRouter from './routes/health.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/health', healthRouter);
app.use('/api/protocols', protocolRouter);
app.use('/api/diagnoses', diagnosisRouter);

app.listen(port, () => {
  console.log(`Goblin Diagnostic Backend running on http://localhost:${port}`);
});
