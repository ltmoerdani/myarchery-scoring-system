import Fastify from 'fastify';
import { ScoringEvent, ScoringEventSchema } from '@archery/shared';

const fastify = Fastify({ logger: true });

fastify.get('/health', async () => ({ status: 'ok' }));

fastify.post<{ Body: ScoringEvent }>('/scores', {
  schema: { body: ScoringEventSchema },
}, async (req, reply) => {
  // TODO: handle scoring event (save to Redis, broadcast, etc)
  return reply.status(202).send({ status: 'queued' });
});

fastify.listen({ port: 8000 }, (err, address) => {
  if (err) throw err;
  console.log(`Server listening at ${address}`);
});
