# Roadmap Task Tracker: Migrasi & Implementasi Arsitektur Baru

_Dokumen ini digunakan untuk memantau progress migrasi dan implementasi arsitektur baru scoring panahan. Update status dan catatan secara berkala._

---

## Legend Status
- [ ] To Do
- [~] In Progress
- [R] Review
- [x] Done

---

## 1. Migrasi ke Monorepo & Turborepo

| Task                                | Status | PIC | Expected Result                                   | Catatan |
|------------------------------------- |--------|-----|--------------------------------------------------|---------|
| Setup Turborepo                     | [x]    |     | Struktur monorepo terbentuk, turbo.json & workspace siap |         |
| Migrasi FE ke `apps/client/`        | [x]    |     | Semua kode FE berjalan di folder baru, tidak ada error import |         |
| Setup struktur folder monorepo      | [x]    |     | Struktur folder sesuai standar, siap untuk pengembangan BE & shared |         |
| Update konfigurasi build            | [x]    |     | Build FE sukses di monorepo, output di folder yang benar |         |
| Update dokumentasi struktur         | [x]    |     | Dokumentasi struktur baru tersedia & mudah dipahami |         |

**Sub-task:**
- Setup Turborepo: Inisialisasi monorepo dengan Turborepo (`pnpm create turbo@latest ...`)
- Migrasi FE: Pindahkan seluruh isi `src/` ke `apps/client/`, update import path jika perlu
- Setup struktur: Buat folder `apps/`, `packages/`, dsb
- Update build: Update script build di package.json, pastikan build berjalan di struktur baru
- Dokumentasi: Update README & docs terkait struktur baru

---

## 2. Setup Shared Types (FE-BE)

| Task                           | Status | PIC | Expected Result                                   | Catatan |
|--------------------------------|--------|-----|--------------------------------------------------|---------|
| Buat package `packages/shared/`| [ ]    |     | Folder `packages/shared/` siap, bisa diimport FE & BE |         |
| Definisikan DTO & types utama  | [ ]    |     | Semua kontrak data utama terdokumentasi & reusable |         |
| Integrasi shared types ke FE   | [ ]    |     | FE hanya konsumsi types dari shared, tidak ada duplikasi |         |
| Integrasi shared types ke BE   | [ ]    |     | BE validasi & response pakai shared types         |         |

**Sub-task:**
- Inisialisasi package TypeScript shared, setup tsconfig & package.json
- Buat interface ScoreEvent, User, dsb (opsional: Protobuf schema)
- Update import di FE & BE agar pakai shared types, refactor service/komponen yang relevan
- Validasi payload pakai DTO shared

---

## 3. Implementasi Backend Fastify + uWebSockets.js

| Task                              | Status | PIC | Expected Result                                   | Catatan |
|-----------------------------------|--------|-----|--------------------------------------------------|---------|
| Setup Fastify server              | [ ]    |     | Fastify server running, endpoint `/health` OK     |         |
| Setup uWebSockets.js              | [ ]    |     | WS server running, client bisa connect            |         |
| Implementasi endpoint scoring     | [ ]    |     | Endpoint scoring berjalan, terhubung ke FE        |         |
| Validasi payload dengan shared types | [ ] |     | Semua input scoring tervalidasi, error jelas      |         |

**Sub-task:**
- Inisialisasi Fastify di `apps/server/`, setup basic endpoint `/health`
- Integrasi uWebSockets.js, setup basic WS endpoint
- Buat endpoint REST/GraphQL untuk scoring, CRUD score
- Gunakan DTO dari shared package untuk validasi, tambah error handling

---

## 4. Integrasi Redis & Pusher

| Task                              | Status | PIC | Expected Result                                   | Catatan |
|-----------------------------------|--------|-----|--------------------------------------------------|---------|
| Integrasi Redis client            | [ ]    |     | Redis client terhubung, bisa set/get data         |         |
| Implementasi event streaming Redis| [ ]    |     | Event scoring masuk ke Redis stream, bisa dikonsumsi |         |
| Integrasi Pusher                  | [ ]    |     | Pusher bisa broadcast event ke client             |         |
| Implementasi trigger event ke FE  | [ ]    |     | FE menerima update realtime dari backend          |         |

**Sub-task:**
- Setup ioredis di backend, test koneksi Redis
- Gunakan Redis Streams/XADD untuk scoring event, tambah consumer group jika perlu
- Setup Pusher di backend, test trigger event ke channel
- FE subscribe ke channel Pusher, UI update saat event masuk

---

## 5. Integrasi WebSocket Client di FE

| Task                              | Status | PIC | Expected Result                                   | Catatan |
|-----------------------------------|--------|-----|--------------------------------------------------|---------|
| Implementasi client uWebSockets.js| [ ]    |     | FE bisa connect ke WS backend                     |         |
| Subscribe & handle event scoring  | [ ]    |     | UI update otomatis saat ada event baru            |         |
| Error handling & reconnect        | [ ]    |     | FE robust terhadap disconnect, reconnect otomatis |         |

**Sub-task:**
- Tambah client WS di FE, test koneksi ke backend
- FE subscribe ke event scoring, update UI saat event masuk
- Implementasi reconnect & error handler

---

## 6. Testing & Observability

| Task                              | Status | PIC | Expected Result                                   | Catatan |
|-----------------------------------|--------|-----|--------------------------------------------------|---------|
| Setup unit test (Jest)            | [ ]    |     | Test jalan, coverage report tersedia              |         |
| Setup integration test (Supertest)| [ ]    |     | Integration test jalan, hasil sesuai ekspektasi   |         |
| Setup load test (k6)              | [ ]    |     | Laporan performa tersedia, bottleneck teridentifikasi |         |
| Tambah script monitoring          | [ ]    |     | Script monitoring bisa dijalankan & hasil terbaca |         |

**Sub-task:**
- Setup Jest di FE & BE, tambah test coverage minimal 60%
- Setup Supertest di BE, test endpoint utama
- Setup k6, simulasi 1.000 CCU
- Tambah script redis-cli, netstat, dsb

---

## 7. CI/CD Pipeline

| Task                              | Status | PIC | Expected Result                                   | Catatan |
|-----------------------------------|--------|-----|--------------------------------------------------|---------|
| Setup GitHub Actions              | [ ]    |     | Pipeline otomatis jalan di setiap push/PR         |         |
| Setup docker-compose              | [ ]    |     | Semua service bisa dijalankan dengan 1 perintah   |         |

**Sub-task:**
- Setup workflow build, test, lint, deploy di GitHub Actions
- Buat docker-compose untuk local dev & deploy

---

## 8. Load Testing & Optimasi

| Task                              | Status | PIC | Expected Result                                   | Catatan |
|-----------------------------------|--------|-----|--------------------------------------------------|---------|
| Jalankan load test                | [ ]    |     | Hasil load test terdokumentasi                    |         |
| Identifikasi bottleneck           | [ ]    |     | Bottleneck teridentifikasi & didokumentasi        |         |
| Optimasi konfigurasi              | [ ]    |     | Performa meningkat, hasil test membaik            |         |

**Sub-task:**
- Jalankan k6 untuk end-to-end test
- Analisa hasil load test, catat bottleneck utama
- Tuning Redis, uWS, Fastify, dsb

---

## 9. Dokumentasi & Knowledge Transfer

| Task                              | Status | PIC | Expected Result                                   | Catatan |
|-----------------------------------|--------|-----|--------------------------------------------------|---------|
| Update dokumentasi arsitektur     | [ ]    |     | Dokumentasi up-to-date, mudah dipahami            |         |
| Knowledge sharing ke tim          | [ ]    |     | Tim paham arsitektur & proses migrasi             |         |

**Sub-task:**
- Update docs sesuai implementasi, tambah diagram/flow baru
- Sesi sharing/materi migrasi, Q&A internal

---

> Update status, expected result & catatan setiap progress. Tambahkan task/sub-task baru jika diperlukan selama proses migrasi.
