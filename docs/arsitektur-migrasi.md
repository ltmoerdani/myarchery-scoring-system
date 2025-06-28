# Analisis & Rencana Migrasi Arsitektur

## 1. Analisis Project Existing

### a. Struktur & Stack Saat Ini
- **Frontend:** React.js (SPA), struktur modular, asset di `src/assets`, komponen di `src/components`, halaman di `src/pages`.
- **State Management:** Belum terlihat penggunaan state global modern (misal Redux/Context API untuk state besar).
- **API Layer:** Konsumsi API via service di `src/services/`, belum ada shared types/DTO antara FE-BE.
- **Testing:** Ada setup test (`App.test.js`, `setupTests.js`), namun coverage dan integrasi belum jelas.
- **Build & Deployment:** Menggunakan build output di folder `build/`, belum ada monorepo, belum ada pipeline CI/CD modern.
- **Tidak ditemukan:** Layer backend (Fastify/uWebSockets.js/Redis/Pusher) di repo ini, hanya FE.

### b. Gap dengan Arsitektur Baru
- **Monorepo:** Belum ada, saat ini hanya single FE repo.
- **Shared Types:** Belum ada package shared TypeScript types/DTO.
- **Realtime:** Belum ada integrasi WebSocket/uWebSockets.js, hanya konsumsi REST.
- **State Management:** Belum ada integrasi Redis, event streaming, atau cache.
- **Broadcast:** Belum ada integrasi Pusher.
- **Testing & Observability:** Belum ada setup k6, Redis-mock, atau observability tools.
- **Scalability:** Belum ada sharding, consumer groups, atau cluster awareness.

---

## 2. Rancangan Penyesuaian & Implementasi

### a. Struktur Monorepo (Turborepo)
- Migrasi ke struktur:
  ```
  archery-app/
  ├── apps/
  │   ├── client/       # FE: React (migrasi dari repo ini)
  │   └── server/       # BE: Fastify + uWebSockets.js
  ├── packages/
  │   ├── shared/       # TS types/utils (kontrak FE-BE)
  │   └── database/     # Redis + DB clients
  ├── turbo.json
  └── docker-compose.yml
  ```
- **Langkah:** 
  - Pindahkan seluruh isi `src/` ke `apps/client/`.
  - Setup Turborepo (`pnpm create turbo@latest ...`).

### b. Shared Types & DTO
- Buat package `packages/shared/` berisi:
  - TypeScript interfaces, DTO, dan validator (misal Zod/Protobuf schema).
  - Semua komunikasi FE-BE wajib pakai kontrak ini.

### c. Backend Modern (Fastify + uWebSockets.js)
- Buat `apps/server/`:
  - Fastify untuk REST/GraphQL API.
  - uWebSockets.js untuk WebSocket (realtime scoring).
  - Integrasi Redis untuk state/event streaming.
  - Integrasi Pusher untuk broadcast massal.

### d. Integrasi Realtime di FE
- Tambahkan client WebSocket (uWebSockets.js) di FE.
- FE subscribe ke event scoring, update UI secara realtime.

### e. Testing & Observability
- Setup Jest untuk unit test, Supertest untuk integration test.
- Setup k6 untuk load test (simulasi 1.000 CCU).
- Tambahkan script monitoring (redis-cli, netstat, dsb).

### f. CI/CD & Deployment
- Setup GitHub Actions untuk build, test, lint, dan deploy.
- Tambahkan docker-compose untuk local dev & deployment.

---

## 3. Roadmap Implementasi

1. **Migrasi ke Monorepo & Turborepo**
2. **Setup shared types (FE-BE)**
3. **Implementasi backend Fastify + uWebSockets.js**
4. **Integrasi Redis & Pusher**
5. **Integrasi WebSocket client di FE**
6. **Testing & observability**
7. **CI/CD pipeline**
8. **Load testing & optimasi**
9. **Dokumentasi & knowledge transfer**

---

## 4. Evaluasi & Rekomendasi

- **Kelebihan:** Stack baru sangat scalable, maintainable, dan future-proof.
- **Tantangan:** Migrasi ke monorepo dan shared types butuh effort awal, namun akan mengurangi bug dan duplikasi jangka panjang.
- **Saran:** Lakukan migrasi bertahap, mulai dari setup monorepo, shared types, lalu backend, baru integrasi realtime.

---

_Dokumen ini menjadi acuan migrasi dan pengembangan arsitektur baru untuk project scoring panahan._
