import { z } from 'zod';

export const ScoringEventSchema = z.object({
  athleteId: z.string(),
  score: z.number().int().min(0).max(10),
  ring: z.number().int().min(1).max(10),
  isX: z.boolean().optional(),
  timestamp: z.number().int(),
});
