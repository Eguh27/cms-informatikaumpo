# Frontend Architecture & Algorithms

Dokumen ini mendeskripsikan struktur, arsitektur, dan algoritma utama yang berjalan pada sistem frontend **setelah proses migrasi** ke Next.js (App Router) terintegrasi dengan Payload CMS.

## 1. Teknologi Utama (Tech Stack)

Frontend saat ini dibangun menggunakan stack modern:
- **Framework Utama**: Next.js 15+ (App Router)
- **CMS Backend**: Payload CMS v3 (Terintegrasi secara monorepo/lokal)
- **Bahasa Pemrograman**: TypeScript (dengan Payload generated types)
- **Styling**: Tailwind CSS v4 (Utility-first CSS)
- **Iconography**: Lucide React
- **Komponen Klien**: React Hooks (`useMemo`, `useState`) untuk fitur interaktif.

## 2. Struktur Direktori

Kode sumber dipecah antara rute publik (frontend) dan skema database (CMS) dengan struktur sebagai berikut:

```text
src/
├── app/
│   ├── (frontend)/            # Halaman Publik (Frontend Next.js)
│   │   ├── layout.tsx         # Root Layout (Navbar & Footer global)
│   │   ├── page.tsx           # Beranda (Server Component)
│   │   ├── akademik/          # Rute spesifik
│   │   ├── berita/
│   │   │   ├── [slug]/        # Dynamic route untuk halaman detail berita
│   │   │   ├── page.tsx       # Berita Index (Server Component)
│   │   │   └── BeritaClient.tsx # Client Component untuk fitur filter & search
│   │   ├── dosen/
│   │   ├── download/
│   │   ├── fasilitas/
│   │   ├── kontak/
│   │   └── profil/
│   └── (payload)/             # Panel Admin CMS (Route bawaan Payload)
├── collections/               # Definisi Skema Tabel Database (Payload)
├── components/                # Komponen UI Reusable (Client & Server)
├── docs/                      # Dokumentasi teknis proyek
└── payload.config.ts          # Konfigurasi Utama Payload CMS
```

## 3. Arsitektur Aplikasi & Manajemen State

Sistem frontend saat ini menggunakan arsitektur **Hybrid Server & Client Components** yang ditawarkan oleh Next.js App Router.

### A. Pengambilan Data (Data Fetching - Server Components)
- Halaman utama (file `page.tsx`) sebagian besar adalah **Server Components**.
- Komponen ini berjalan di server, melakukan *fetch* data langsung ke database SQLite via Payload API (`getPayload()`).
- Data yang didapat (contoh: daftar Dosen atau Berita) akan dilemparkan (passed down) ke komponen UI atau **Client Component** sebagai properti (`initialData`).
- Hal ini menjamin waktu muat (load time) yang instan, **SEO yang optimal**, serta meringankan beban perangkat pengguna.

### B. File-based Routing (App Router)
Navigasi tidak lagi dikelola melalui state URL hash manual. Next.js App Router mengatur *routing* berdasarkan struktur folder:
- Navigasi halaman ke halaman lain menggunakan komponen `<Link>` dari `next/link`.
- Detail halaman dinamis menggunakan kurung siku, misalnya `berita/[slug]/page.tsx` di mana `[slug]` adalah parameter unik untuk mengambil berita spesifik dari Payload CMS.

### C. Pemisahan Tanggung Jawab (Server vs Client)
- **Server Components**: Murni untuk pengambilan data (fetching), struktur halaman, dan SEO (contoh: `generateMetadata`).
- **Client Components** (Ditandai dengan direktif `"use client"`): Digunakan khusus saat dibutuhkan interaksi antarmuka (DOM events), manajemen state filter (`useState`), atau animasi spesifik.
  - *Contoh*: `BeritaClient.tsx`, `DosenClient.tsx`.

## 4. Algoritma Utama (Core Algorithms)

### A. Algoritma Pencarian Global & Pemfilteran (Client-Side)
Fitur filter kategori dan pencarian data berjalan tanpa memuat ulang halaman (*No Refresh*):
- Data awal (`initialData`) diterima dari Server Component.
- **Client Component** menggunakan `useState` untuk menyimpan state *query pencarian* dan *filter kategori*.
- Fungsi `useMemo` digunakan untuk mengalkulasi ulang data (`filteredData`) secara otomatis (reaktif) setiap kali *query* atau *kategori* berubah.
- Algoritma melakukan pencarian secara *case-insensitive* ke beberapa kolom sekaligus (misal: mencocokkan input pada *title* atau *excerpt*).

### B. Algoritma Rendering Gambar
- Relasi unggahan gambar (Media) dari Payload CMS mengembalikan objek gambar utuh yang memiliki properti `url`, `alt`, dll.
- Frontend merender nilai tersebut dengan proteksi fallback (menggunakan URL default placeholder apabila objek URL kosong atau error pemuatan).

### C. Manajemen Scroll & Layout Global
- Komponen `Navbar` (berjalan di client) melacak posisi `window.scrollY`.
- Jika posisi *scroll* melebih nilai tertentu, Tailwind classes pada navbar bertransisi mengubah warna latar, transparansi (*glassmorphism*), dan penambahan bayangan (*shadow*) secara dinamis.

## 5. Hubungan Backend dan Frontend

1. **Payload Local API**: 
   Next.js dan Payload CMS berjalan pada instance yang sama. Hal ini memungkinkan pemanggilan database mem-bypass lapisan *HTTP Network* murni (tanpa REST API / GraphQL overhead) lewat *Local API*, sehingga eksekusi perutean sangat cepat.
   
2. **Typescript Tying**:
   - Skema CMS dari Payload (`src/collections`) diekspor otomatis menjadi antarmuka TypeScript (`src/payload-types.ts`).
   - Frontend mengimpor tipe data ini (contoh: `import type { News } from '@/payload-types'`) guna memastikan validasi dan prediktabilitas struktur data dari ujung belakang ke depan terjamin secara sistem (*Type-Safe*).

---
*Dokumentasi ini mencerminkan struktur sistem setelah sukses bermigrasi dari arsitektur SPA Vite menuju integrasi Next.js Fullstack dengan Payload CMS.*
