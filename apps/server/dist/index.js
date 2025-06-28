"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const shared_1 = require("@archery/shared");
const fastify = (0, fastify_1.default)({ logger: true });
fastify.get('/health', async () => ({ status: 'ok' }));
fastify.post('/scores', {
    schema: { body: shared_1.ScoringEventSchema },
}, async (req, reply) => {
    // TODO: handle scoring event (save to Redis, broadcast, etc)
    return reply.status(202).send({ status: 'queued' });
});
fastify.listen({ port: 8000 }, (err, address) => {
    if (err)
        throw err;
    console.log(`Server listening at ${address}`);
});
