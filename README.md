# MyArchery Scoring System - Monorepo

Ini adalah monorepo untuk sistem scoring panahan berbasis arsitektur modern (Fastify, uWebSockets.js, Redis, Pusher, React).

## Struktur Monorepo (Turborepo)

```
archery-app/
├── apps/
│   ├── client/       # React (FE)
│   └── server/       # Fastify + uWS (BE)
├── packages/
│   ├── shared/       # TypeScript types, DTO, validator
│   └── database/     # Redis, Prisma client
├── turbo.json        # Turborepo pipeline
```

- Semua kode frontend di `apps/client/`
- Backend di `apps/server/`
- Shared types di `packages/shared/`

## Build & Develop

```bash
pnpm install
pnpm dev # via Turborepo
```

## Referensi Arsitektur

Lihat `docs/new-architecture.md` dan `docs/guidance-be.md` untuk detail best practice dan aturan pengembangan.

---

# MyArchery Scoring System - Web Admin

Ini adalah dasbor admin web untuk MyArchery, sebuah platform yang dirancang untuk mengelola acara panahan, peserta, dan sistem penilaian. Aplikasi ini dibangun menggunakan React dan dilengkapi dengan berbagai fitur untuk menyederhanakan manajemen acara dari awal hingga akhir.

## ✨ Fitur Utama

- **Manajemen Acara Komprehensif:** Buat, edit, dan kelola acara panahan dengan detail lengkap, termasuk jadwal, kategori, biaya, dan lainnya.
- **Sistem Penilaian:** Modul penilaian untuk babak kualifikasi dan eliminasi, dengan pembaruan skor secara *real-time*.
- **Manajemen Peserta & Pengguna:** Kelola data peserta, pendaftaran, dan akun pengguna admin.
- **Dasbor Interaktif:** Dasbor terpusat untuk admin dan penyelenggara acara (DOS) untuk memantau ringkasan acara, jadwal, dan metrik penting lainnya.
- **Pembuatan Dokumen Dinamis:** Hasilkan Kartu ID peserta dan Sertifikat secara otomatis berdasarkan template yang dapat disesuaikan.
- **Bagan & Laporan:** Visualisasikan data dengan bagan dan tabel interaktif untuk peringkat, perolehan medali, dan hasil pertandingan.
- **Antarmuka yang Dapat Disesuaikan:** Editor bawaan untuk menyesuaikan tampilan sertifikat dan kartu ID.
- **Autentikasi Aman:** Sistem autentikasi pengguna yang lengkap, termasuk pendaftaran, login, pemulihan kata sandi, dan verifikasi email.
- **Internasionalisasi:** Dukungan untuk berbagai bahasa (Inggris & Indonesia) menggunakan `i18next`.

## 🛠️ Teknologi & Pustaka Utama

Proyek ini dibangun di atas ekosistem React modern dan memanfaatkan berbagai pustaka populer:

- **Framework:** [React](https://reactjs.org/)
- **State Management:** [Redux](https://redux.js.org/) dengan [Redux Toolkit](https://redux-toolkit.js.org/)
- **Routing:** [React Router](https://reactrouter.com/)
- **UI Components:** [Bootstrap 5](https://getbootstrap.com/) & [Reactstrap](https://reactstrap.github.io/)
- **Styling:** [Sass](https://sass-lang.com/)
- **Bagan & Grafik:** [ApexCharts](https://apexcharts.com/), [Chart.js](https://www.chartjs.org/)
- **Tabel Data:** [react-bootstrap-table-next](https://react-bootstrap-table.github.io/react-bootstrap-table2/)
- **Formulir:** [Availity Reactstrap Validation](https://availity.github.io/availity-reactstrap-validation/)
- **Internasionalisasi (i18n):** [i18next](https://www.i18next.com/)
- **API Client:** `fetch` (wrapper kustom di `src/utils/api`)

## 📂 Struktur Proyek

Struktur folder utama dalam direktori `src` diatur sebagai berikut untuk menjaga keterbacaan dan skalabilitas kode.

```
src/
├── assets/         # Aset statis seperti gambar, font, dan SCSS global
├── components/     # Komponen React yang dapat digunakan kembali di seluruh aplikasi
├── constants/      # Nilai-nilai konstan (mis. tipe sertifikat, kategori acara)
├── contexts/       # React Context untuk state global
├── hooks/          # Custom React Hooks
├── layouts/        # Komponen layout untuk struktur halaman (mis. dasbor, otentikasi)
├── libraries/      # Pustaka atau helper khusus (mis. generator PDF)
├── middlewares/    # Middleware untuk proteksi rute
├── pages/          # Komponen utama untuk setiap halaman/rute
├── routes/         # Konfigurasi rute aplikasi
├── services/       # Fungsi untuk berinteraksi dengan API backend
├── store/          # Konfigurasi Redux (slice, reducer)
├── translations/   # File JSON untuk i18n
└── utils/          # Fungsi utilitas umum
```

## 🚀 Memulai

Ikuti langkah-langkah ini untuk menjalankan proyek ini di lingkungan pengembangan lokal Anda.

### Prasyarat

- [Node.js](https://nodejs.org/) (versi 16 atau lebih tinggi direkomendasikan)
- [NPM](https://www.npmjs.com/) atau [Yarn](https://yarnpkg.com/)

### Instalasi

1.  **Clone repositori ini:**
    ```bash
    git clone https://github.com/ltmoerdani/myarchery-scoring-system.git
    cd myarchery-scoring-system
    ```

2.  **Instal semua dependensi:**
    ```bash
    npm install
    ```

3.  **Konfigurasi Variabel Lingkungan**
    Buat file `.env` di root proyek dan tambahkan variabel lingkungan yang diperlukan. Anda bisa menyalin dari `.env.example` jika tersedia.
    ```
    REACT_APP_API_URL=http://localhost:8000/api
    ```

4.  **Jalankan Aplikasi:**
    Gunakan skrip berikut untuk memulai server pengembangan.
    ```bash
    npm start
    ```
    Aplikasi akan berjalan di `http://localhost:3000`.

    Perintah `start` menggunakan flag `--openssl-legacy-provider` untuk kompatibilitas dengan versi Node.js yang lebih baru.

## 📜 Skrip yang Tersedia

Dalam direktori proyek, Anda dapat menjalankan:

- `npm start`: Menjalankan aplikasi dalam mode pengembangan.
- `npm run build`: Mem-build aplikasi untuk produksi ke dalam folder `build`.
- `npm test`: Menjalankan test runner dalam mode interaktif.
- `npm run lint`: Menganalisis kode untuk menemukan potensi error.
- `npm run format`: Memformat semua file menggunakan Prettier.

---

Selamat bekerja dengan proyek MyArchery! Jika Anda memiliki pertanyaan, jangan ragu untuk bertanya.