# Panduan Lengkap Developer: Aturan Pengembangan Sistem Scoring Panahan

**Versi 1.0 | Berlaku untuk semua modul dan layer aplikasi**

---

## I. Prinsip Utama

### Realtime-First
- Latency scoring update ≤ 100ms
- Prioritaskan WebSocket di atas HTTP untuk scoring

### Decoupled Layers
- FE hanya konsumsi API (zero SSR)
- BE hanya handle data (zero UI logic)

### 10-Year Code
- Setiap keputusan arsitektur harus pertimbangkan dampak 10 tahun ke depan
- _"If it hurts to do now, it'll kill you later"_

---

## II. Struktur Monorepo (Wajib)

```bash
archery-app/
├── apps/
│   ├── client/       # React Vite
│   │   └── src/
│   │       ├── features/   # Contoh: scoring, leaderboard
│   │       └── lib/        # Shared FE utils
│   └── server/       # Fastify + uWebSockets
│       └── src/
│           ├── modules/    # scoring, auth, realtime
│           └── core/       # Framework setup
├── packages/
│   ├── shared/       # TypeScript types
│   │   └── src/
│   │       ├── events/     # ScoringEvent, BroadcastMessage
│   │       └── validation/ # Zod schemas
│   └── database/     # Redis + Prisma client
└── turbo.json        # Turborepo pipelines
```

**Aturan File Structure:**

```typescript
// ❌ DILARANG
import { thing } from '../../../../some-module';

// ✅ WAJIB
import { ScoringEvent } from '@archery/shared';
import { scoringService } from '@archery/server/modules/scoring';
```

---

## III. Aturan Koding HTTP (Fastify Layer)

**Do**
- ✅ Gunakan plugin system
- ✅ Validasi dengan Zod
- ✅ Response status 202 untuk async ops
- ✅ Error handling terpusat

**Don't**
- ❌ Jangan polute instance Fastify global
- ❌ Jangan gunakan manual validation
- ❌ Jangan block event loop dengan CPU-heavy task
- ❌ Jangan throw error tanpa konteks

**Contoh Pattern:**

```typescript
// ✅ CORRECT
export default (fastify: FastifyInstance) => {
  fastify.post<{ Body: ScoringEvent }>('/scores', {
    schema: { body: ScoringEventSchema }
  }, async (req) => {
    await scoringService.handle(req.body); // Async processing
    return { status: 'queued' }; // HTTP 202
  });
};
```

---

## IV. Aturan Koding Realtime (uWebSockets Layer)

**Do**
- ✅ Gunakan Protobuf encoding
- ✅ Batasi payload ≤ 512B
- ✅ Prioritaskan scoring message
- ✅ Compression: 0 (off)

**Don't**
- ❌ Jangan gunakan JSON untuk payload besar
- ❌ Jangan terima message tanpa validasi
- ❌ Jangan handle business logic di handler
- ❌ Jangan aktifkan compression untuk small payload

**Contoh Pattern:**

```typescript
// ✅ CORRECT
import { decodeScoreEvent } from '@archery/shared';

App().ws('/*', {
  message: (ws, encoded) => {
    const event = decodeScoreEvent(encoded); // Protobuf decode
    scoringService.process(event); // Delegate to service
  }
});
```

---

## V. Aturan State Management (Redis Layer)

**Do**
- ✅ Gunakan Redis Streams untuk event sourcing
- ✅ SETEX untuk cache jangka pendek
- ✅ Pipeline untuk bulk ops
- ✅ Consumer groups untuk processing

**Don't**
- ❌ Jangan simpan state di memory
- ❌ Jangan cache data realtime
- ❌ Jangan gunakan blocking commands
- ❌ Jangan gunakan polling

**Contoh Pattern:**

```typescript
// ✅ CORRECT
const streamKey = `competition:${compId}:scores`;

// Producer
await redis.xadd(streamKey, '*', 'event', protobuf.encode(event));

// Consumer Group
const events = await redis.xreadgroup(
  'GROUP', 'scoring-group', 'worker-1',
  'COUNT', '100', 'STREAMS', streamKey, '>'
);
```

---

## VI. Aturan Broadcast (Pusher Layer)

**Do**
- ✅ Trigger per event type
- ✅ Gunakan channel partitioning
- ✅ Event naming konsisten
- ✅ Payload ≤ 1KB

**Don't**
- ❌ Jangan broadcast full state
- ❌ Jangan gunakan single channel
- ❌ Jangan gunakan generic event names
- ❌ Jangan kirim data tidak perlu

**Contoh Pattern:**

```typescript
// ✅ CORRECT
const CHANNEL_MAP = {
  SCORING: `competition-${compId}-scoring`,
  LEADERBOARD: `competition-${compId}-leaderboard`
};

// Trigger specific event
pusher.trigger(CHANNEL_MAP.SCORING, 'arrow-scored', {
  athleteId: 'A23',
  score: 9,
  isX: false
});
```

---

## VII. Aturan Integrasi FE-BE

**Do**
- Shared types untuk semua payload
- Custom hooks untuk WebSocket

```typescript
// packages/shared/src/events.ts
export type ScoringEvent = {
  athleteId: string;
  score: number;
  ring: number;
  isX: boolean;
  timestamp: number;
};

// apps/client/src/lib/useRealtime.ts
export function useScoringEvents(compId: string) {
  const [event, setEvent] = useState<ScoringEvent>();
  useEffect(() => {
    const channel = pusher.subscribe(`competition-${compId}-scoring`);
    channel.bind('arrow-scored', setEvent);
    return () => pusher.unsubscribe(channel);
  }, [compId]);
}
```

**Don't**
- ❌ Jangan parse manual data - gunakan shared validator
- ❌ Jangan hardcode endpoint URLs - gunakan env vars

---

## VIII. Aturan Performa Kritis

**Wajib Diimplementasi:**

- Protobuf Schema (untuk semua WS messages):

```proto
// shared/proto/scoring.proto
message ScoreEvent {
  required string athlete_id = 1;
  required int32 score = 2;
  optional bool is_x = 3 [default = false];
}
```

- Memory Limits (di entry point):

```bash
# Dalam package.json
"scripts": {
  "start:server": "NODE_OPTIONS='--max-old-space-size=3072' node dist/index.js"
}
```

- Prioritization (WebSocket traffic):

```typescript
// Di uWebSockets config
App().ws('/*', {
  priority: 10, // High priority
  maxBackpressure: 1024 // 1KB buffer
});
```

---

## IX. Aturan Testing & QA

**Wajib Sebelum Merge:**

- Unit Test Coverage ≥ 80% untuk:
  - Service layer
  - Validation utils
  - Protobuf encoding/decoding
- Integration Test untuk:

```gherkin
Scenario: Realtime scoring update
  When arrow is scored for athlete "A23"
  Then event should appear in Redis stream
  And broadcast should be sent within 100ms
```

- Load Test dengan skenario:

```bash
k6 run --vus 1000 --duration 30s script.js
# Target: <5% error rate pada 1000 CCU
```

---

## X. Aturan Dokumentasi

**Wajib untuk Setiap Modul:**

- Module Manifest:

```markdown
## Scoring Module
### Responsibilities:
- Process arrow scoring events
- Broadcast updates
### Dependencies:
- Redis streams
- Pusher channels
### Critical Paths:
[Mermaid diagram alur scoring]
```

- Event Catalog (di shared package):

```typescript
/**
 * ScoringEvent
 * @desc Event ketika panah berhasil discore
 * @prop athleteId - ID atlet
 * @prop score - Nilai panahan (1-10)
 * @prop isX - Apakah X-ring?
 * @prop timestamp - Unix timestamp
 */
export type ScoringEvent = { ... };
```

---

## XI. Prosedur Perubahan Breaking Changes

- **Versioning:**

```typescript
// HTTP API versioning prefix
fastify.register(v1Routes, { prefix: '/v1' });
fastify.register(v2Routes, { prefix: '/v2' });
```

- **Deprecation Policy:**
  - Support versi sebelumnya minimal 2 tahun
  - Beri warning di logs:

```
[DEPRECATION] /v1/scores will be removed on 2026-01-01
```

- **Migration Toolkit:**
  - Sediakan script migrasi data
  - Contoh: `pnpm shared migrate-scoring-events v1-to-v2`

---

## XII. Critical Red Flags (Auto-Reject PR)

- ⛔ Menambahkan SSR di React FE
- ⛔ Business logic di HTTP/WS handler
- ⛔ Redis state disimpan di memory
- ⛔ Direct database access tanpa repository
- ⛔ Hardcoded credentials
- ⛔ Dependencies baru >1MB size
- ⛔ Any @ts-ignore tanpa komentar

---

## Panduan Onboarding Developer

### Setup environment

```bash
pnpm install
cp .env.example .env
pnpm dev
```

### Jalankan test suite

```bash
pnpm test:all   # Unit + integration
dpnm test:load  # Load test
```

### Contoh implementasi fitur

```bash
pnpm generate feature scoring
# Akan membuat boilerplate:
# - server/src/modules/scoring
# - client/src/features/scoring
# - shared/src/types/scoring.ts
```

> "Konsistensi lebih penting daripada kepintaran individu. Arsitektur yang baik adalah produk disiplin kolektif."
> 
> – Panduan Tim Archery Scoring v1.0

