# Panduan Lengkap Frontend (React) untuk Sistem Scoring Panahan

*Versi 1.0 | Berintegrasi dengan Fastify + uWebSockets.js + Redis + Pusher*

---

## I. Struktur Direktori (Wajib)

```bash
apps/client/
├── src/
│   ├── features/          # Modul bisnis
│   │   ├── scoring/       # Fitur scoring
│   │   │   ├── api/       # API calls
│   │   │   ├── hooks/     # Custom hooks
│   │   │   ├── components/
│   │   │   └── types.ts   # Local types
│   │   └── leaderboard/   # Fitur leaderboard
│   ├── lib/               # Shared utilities
│   │   ├── pusher/        # Pusher client setup
│   │   ├── protobuf/      # Protobuf decoder
│   │   └── api.ts         # HTTP client
│   ├── App.tsx            # Entry point
│   └── main.tsx
├── .env                   # Environment variables
└── package.json
```

---

## II. Aturan State Management

**Do**
- ✅ Gunakan swr/tanstack-query untuk data fetching
- ✅ Local state untuk UI state saja
- ✅ Shared types dari monorepo

**Don't**
- ❌ Jangan gunakan Redux untuk server state
- ❌ Jangan duplikat server state di local state
- ❌ Jangan definisikan ulang types

**Contoh Penggunaan SWR:**

```typescript
import { ScoringEvent } from '@archery/shared';

export function useLiveScores(competitionId: string) {
  const { data, error } = useSWR<ScoringEvent[]>(
    `/competitions/${competitionId}/scores`,
    apiClient.get
  );
  return { scores: data, isLoading: !error && !data };
}
```

---

## III. Aturan Realtime (WebSocket/Pusher)

### 1. Setup Pusher Client

```typescript
// lib/pusher/client.ts
import Pusher from 'pusher-js';

export const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
  cluster: 'ap1',
  forceTLS: true,
});
```

### 2. Custom Hook untuk Realtime Updates

```typescript
// features/scoring/hooks/useRealtimeScores.ts
import { ScoringEvent } from '@archery/shared';

export function useRealtimeScores(compId: string) {
  const [event, setEvent] = useState<ScoringEvent>();
  useEffect(() => {
    const channel = pusher.subscribe(`competition-${compId}-scoring`);
    channel.bind('arrow-scored', (data: unknown) => {
      const parsed = ScoringEventSchema.parse(data); // Validasi dengan Zod
      setEvent(parsed);
    });
    return () => pusher.unsubscribe(channel);
  }, [compId]);
  return event;
}
```

### 3. Protobuf Decoding (Jika Pakai Binary WS)

```typescript
// lib/protobuf/decoder.ts
import { Root } from 'protobufjs';

export function decodeScoreEvent(buffer: ArrayBuffer): ScoringEvent {
  const root = Root.fromJSON(protobufJsonDescriptor);
  const ScoreEvent = root.lookupType('archery.ScoreEvent');
  return ScoreEvent.decode(new Uint8Array(buffer)) as unknown as ScoringEvent;
}
```

---

## IV. Aturan Komponen UI

### 1. Atomic Design Principle

```bash
components/
├── atoms/          # Button, Input
├── molecules/      # FormScoring
├── organisms/      # LiveScoreboard
└── templates/      # CompetitionLayout
```

### 2. Contoh Komponen Terintegrasi

```tsx
// features/scoring/components/LiveScoring.tsx
export function LiveScoring({ competitionId }: { competitionId: string }) {
  const { scores } = useLiveScores(competitionId);
  const latestEvent = useRealtimeScores(competitionId);

  return (
    <div>
      <h2>Live Scoring</h2>
      <ul>
        {scores?.map((score) => (
          <ScoreItem key={score.timestamp} score={score} />
        ))}
      </ul>
      {latestEvent && <NewScoreNotification event={latestEvent} />}
    </div>
  );
}
```

---

## V. Aturan HTTP Client

### 1. Axios Instance Shared

```typescript
// lib/api.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/x-protobuf', // Untuk binary payload
    'Accept': 'application/json',
  },
});

// Interceptor untuk error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    throw new Error(error.response?.data?.message || 'API Error');
  }
);
```

### 2. Type-Safe API Calls

```typescript
// features/scoring/api/index.ts
import { ScoringEvent } from '@archery/shared';

export async function submitScore(event: ScoringEvent): Promise<void> {
  await apiClient.post('/scores', event);
}

export async function fetchLeaderboard(compId: string): Promise<ScoringEvent[]> {
  return apiClient.get(`/competitions/${compId}/leaderboard`);
}
```

---

## VI. Aturan Performa Kritis

### 1. Code Splitting

```tsx
// App.tsx
const Leaderboard = lazy(() => import('./features/leaderboard/Leaderboard'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Leaderboard />
    </Suspense>
  );
}
```

### 2. Virtual Scroll untuk Large Lists

```tsx
import { FixedSizeList } from 'react-window';

function ScoreList({ scores }: { scores: ScoringEvent[] }) {
  return (
    <FixedSizeList
      height={500}
      width="100%"
      itemSize={50}
      itemCount={scores.length}
    >
      {({ index, style }) => (
        <div style={style}>
          <ScoreItem score={scores[index]} />
        </div>
      )}
    </FixedSizeList>
  );
}
```

### 3. Optimasi WebSocket

```typescript
// Matikan connection saat tab tidak aktif
useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.hidden) {
      pusher.disconnect();
    } else {
      pusher.connect();
    }
  };
  document.addEventListener('visibilitychange', handleVisibilityChange);
  return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
}, []);
```

---

## VII. Aturan Testing

### 1. Unit Test (Vitest)

```typescript
// features/scoring/api/api.test.ts
import { describe, it, expect, vi } from 'vitest';
import { submitScore } from './api';

describe('Scoring API', () => {
  it('should submit score', async () => {
    const mockEvent = { athleteId: 'A1', score: 9, ring: 8, isX: false };
    vi.spyOn(apiClient, 'post').mockResolvedValue({});
    await submitScore(mockEvent);
    expect(apiClient.post).toHaveBeenCalledWith('/scores', mockEvent);
  });
});
```

### 2. Integration Test (Cypress)

```typescript
// cypress/e2e/scoring.cy.ts
describe('Live Scoring', () => {
  it('should display realtime updates', () => {
    cy.intercept('GET', '/competitions/*/scores', { fixture: 'scores.json' });
    cy.visit('/competition/123');
    cy.findByText('Latest Score: 9').should('exist');
  });
});
```

---

## VIII. Environment Variables (Wajib)

```ini
# .env
VITE_API_URL=http://localhost:8000/v1
VITE_PUSHER_KEY=your_key
VITE_WS_ENDPOINT=ws://localhost:8001
```

---

## IX. Checklist Sebelum Merge PR

- Sempaikan types dari @archery/shared
- Test coverage ≥ 80% untuk fitur baru
- Lakukan load testing jika memengaruhi perf
- Dokumentasi komponen di Storybook
- Cek bundle size (`pnpm build --report`)

---

## X. Critical Red Flags (Auto-Reject)

- ⛔ State management custom (selain SWR/Tanstack Query)
- ⛔ Direct DOM manipulation
- ⛔ Any `any` type tanpa alasan kuat
- ⛔ CSS global yang memengaruhi komponen lain
- ⛔ Logic bisnis di komponen UI

---

## XI. Contoh Implementasi Lengkap

### 1. Subscribe ke Realtime Events

```tsx
// features/scoring/hooks/useCompetitionEvents.ts
export function useCompetitionEvents(compId: string) {
  const [scores, setScores] = useState<ScoringEvent[]>([]);
  // Fetch initial data
  const { data } = useSWR<ScoringEvent[]>(
    `/competitions/${compId}/scores`,
    apiClient.get
  );
  // Realtime updates
  useEffect(() => {
    const channel = pusher.subscribe(`competition-${compId}-scoring`);
    channel.bind('arrow-scored', (event: unknown) => {
      const parsed = ScoringEventSchema.parse(event);
      setScores((prev) => [parsed, ...prev.slice(0, 100)]);
    });
    return () => pusher.unsubscribe(channel);
  }, [compId]);
  return scores;
}
```

### 2. Komponen Terintegrasi

```tsx
// features/scoring/components/ScoringDashboard.tsx
export function ScoringDashboard({ compId }: { compId: string }) {
  const scores = useCompetitionEvents(compId);
  const [inputScore, setInputScore] = useState('');

  const handleSubmit = async () => {
    await submitScore({
      athleteId: 'current-user',
      score: Number(inputScore),
      ring: calculateRing(inputScore),
      isX: false,
      timestamp: Date.now(),
    });
  };

  return (
    <div>
      <input 
        value={inputScore} 
        onChange={(e) => setInputScore(e.target.value)} 
      />
      <button onClick={handleSubmit}>Submit</button>
      <LiveScoreList scores={scores} />
    </div>
  );
}
```

---

> "Kode FE harus seperti panahan - tepat sasaran, ringan, dan konsisten."
>
> – Panduan Tim Archery FE v1.0