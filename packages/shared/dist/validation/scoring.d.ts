import { z } from 'zod';
export declare const ScoringEventSchema: z.ZodObject<{
    athleteId: z.ZodString;
    score: z.ZodNumber;
    ring: z.ZodNumber;
    isX: z.ZodOptional<z.ZodBoolean>;
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    athleteId: string;
    score: number;
    ring: number;
    timestamp: number;
    isX?: boolean | undefined;
}, {
    athleteId: string;
    score: number;
    ring: number;
    timestamp: number;
    isX?: boolean | undefined;
}>;
