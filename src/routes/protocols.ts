import { Router } from 'express';
import { z } from 'zod';
import OpenAI from 'openai';

type ProtocolRequest = {
  state: string;
  symptoms: string[];
};

const router = Router();

const RequestSchema = z.object({
  state: z.string().min(1),
  symptoms: z.array(z.string()).optional()
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', async (req, res) => {
  const parseResult = RequestSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.format() });
  }

  const { state, symptoms } = parseResult.data;

  try {
    const prompt = `
You are a whimsical forest healer. Based on the goblin state and symptoms below, generate a 4-step emergency care protocol.

Goblin state: ${state}
Symptoms: ${symptoms?.join(', ') || 'none'}

Return a JSON object with:
- protocol (array of 4 strings)
- summary (short description)
- advice (short encouraging note)
`;

    const response = await openai.responses.create({
      model: 'gpt-4o-mini',
      input: prompt,
      max_output_tokens: 250,
      temperature: 0.85
    });

    const outputText = response.output[0]?.content[0]?.text || '';
    let result;

    try {
      result = JSON.parse(outputText);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to parse AI response', raw: outputText });
    }

    return res.json({ data: result });
  } catch (error) {
    console.error('OpenAI error', error);
    return res.status(500).json({ error: 'Protocol generation failed' });
  }
});

export default router;
