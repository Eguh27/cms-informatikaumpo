# Website Portal & CMS Teknik Informatika UMPO

Selamat datang di repositori resmi aplikasi Portal Web & Content Management System (CMS) untuk Program Studi S1 Teknik Informatika Universitas Muhammadiyah Ponorogo.

Proyek ini merupakan hasil migrasi dari arsitektur *Single Page Application* (Vite + React statis) menjadi aplikasi **Fullstack Headless CMS** yang tangguh, cepat, dan modern menggunakan **Next.js (App Router)** dan **Payload CMS v3**.

## 🚀 Fitur Utama

- **Modern Tech Stack**: Dibangun menggunakan Next.js (App Router) untuk Server-Side Rendering (SSR) dan performa yang optimal.
- **Headless CMS (Payload)**: Memungkinkan pengelolaan seluruh konten website (Berita, Profil Dosen, Kurikulum, Layanan) secara dinamis dari satu panel admin.
- **Desain UI/UX Premium**: Mempertahankan estetika *glassmorphism* dan interaktivitas tingkat tinggi dengan Tailwind CSS v4, Lucide Icons, dan komponen *frontend* khusus.
- **Local-First Database**: Menggunakan SQLite selama masa pengembangan agar mudah di-*setup* secara instan.
- **Auto-Seeding**: API khusus yang memungkinkan populasi data awal dengan sekali klik, sehingga website langsung terisi konten.

---

## 🛠️ Persyaratan Sistem

Pastikan mesin pengembangan Anda telah terpasang:
- [Node.js](https://nodejs.org/en/) (Disarankan versi 20.x atau terbaru)
- `npm` atau `pnpm` atau `yarn`

---

## 💻 Panduan Instalasi & Pengembangan (Lokal)

Ikuti langkah-langkah di bawah ini untuk menjalankan portal dan CMS secara lokal:

### 1. Kloning Repositori
```bash
git clone https://github.com/Eguh27/cms-informatikaumpo.git
cd cms-informatikaumpo
```

### 2. Instalasi Dependensi
Jalankan perintah instalasi dependensi (contoh menggunakan `npm`):
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Salin file `.env.example` ke `.env` (jika belum ada). Pastikan memuat variabel berikut:
```env
DATABASE_URL=file:./.d
PAYLOAD_SECRET=YOUR_RANDOM_SECRET_KEY
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```
*(Catatan: `DATABASE_URL` menentukan tempat file database SQLite disimpan. Secara default akan dibuat file bernama `.d` di dalam root direktori)*.

### 4. Menjalankan Mode Development
Jalankan server pengembangan:
```bash
npm run dev
```
Setelah server berjalan, Anda bisa mengakses:
- **Website Publik (Frontend)**: `http://localhost:3000`
- **Panel Admin CMS (Payload)**: `http://localhost:3000/admin`

*(Untuk pertama kalinya membuka `/admin`, Anda akan diminta membuat akun Administrator baru).*

---

## 📂 Mengisi Data Awal (Auto-Seeding)

Jika Anda baru pertama kali menjalankan proyek ini dan database SQLite masih kosong, halaman depan (Frontend) mungkin tidak akan menampilkan data dosen, berita, maupun kurikulum. 

Untuk memigrasikan data lawas secara otomatis ke dalam CMS, ikuti langkah berikut:
1. Pastikan aplikasi sedang berjalan (`npm run dev`).
2. Buka peramban (browser) dan kunjungi tautan berikut:
   **[http://localhost:3000/api/seed](http://localhost:3000/api/seed)**
3. Anda akan melihat pesan **"Seeding completed successfully!"**.
4. Kembali ke beranda `http://localhost:3000` dan seluruh data awal akan muncul.

---

## 🏗️ Deployment (Produksi)

Jika Anda ingin merilis atau melakukan tes *build* aplikasi untuk lingkungan produksi:

1. Pastikan Anda menghentikan proses *development* (`npm run dev`) untuk melepaskan penguncian (lock) pada database SQLite.
2. Jalankan perintah kompilasi:
   ```bash
   npm run build
   ```
3. Setelah proses *build* selesai (tanpa error Typescript / Schema), jalankan versi produksinya:
   ```bash
   npm run start
   ```

---

## 📂 Struktur Direktori Proyek

Proyek ini menggabungkan *frontend* Next.js dan *backend* Payload CMS dalam satu repositori (*monorepo layout*).

- `src/app/(frontend)/` : Berisi struktur *routing* dan halaman publik Next.js.
- `src/collections/` : Berisi definisi skema tabel database (Lecturers, News, dll) untuk Payload CMS.
- `src/components/` : Berisi komponen-komponen UI React yang digunakan berulang kali.
- `src/payload.config.ts` : Konfigurasi pusat untuk sistem Payload CMS.
- `src-legacy/` : (Hanya referensi) Arsip *codebase* lama berbasis Vite untuk keperluan referensi styling.
- `src/docs/` : Dokumentasi arsitektur dan peta implementasi proyek MVP.

---
*Dikembangkan untuk Program Studi S1 Teknik Informatika, Universitas Muhammadiyah Ponorogo (UMPO).*
