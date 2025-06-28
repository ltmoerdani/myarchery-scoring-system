"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoringEventSchema = void 0;
const zod_1 = require("zod");
exports.ScoringEventSchema = zod_1.z.object({
    athleteId: zod_1.z.string(),
    score: zod_1.z.number().int().min(0).max(10),
    ring: zod_1.z.number().int().min(1).max(10),
    isX: zod_1.z.boolean().optional(),
    timestamp: zod_1.z.number().int(),
});
