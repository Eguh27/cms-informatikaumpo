# Implementation Plan (MVP)
**Migrasi dari Vite SPA ke Next.js Fullstack (dengan Payload CMS)**

Dokumen ini berisi peta jalan (*roadmap*) langkah demi langkah untuk membangun dan memigrasikan sistem frontend yang ada saat ini menjadi sebuah sistem *Fullstack CMS* terpadu.

---

## Tahap 0: Persiapan Repositori (In-Place Migration)
**Tujuan:** Mengamankan file proyek Vite lama dan membersihkan direktori *root* sebelum inisialisasi Next.js.

- [ ] **0.1. Mengamankan Folder Utama (Legacy)**
  - Mengubah nama direktori `src` saat ini menjadi `src-legacy`.
  - Memindahkan file konfigurasi Vite (`vite.config.ts`, `index.html`) ke dalam folder `src-legacy` lama.
- [ ] **0.2. Membersihkan Root Direktori**
  - Menghapus atau memodifikasi `package.json` lama agar tidak bentrok saat instalasi proyek baru.
  - Memastikan *root* repositori bersih siap untuk menampung struktur Next.js.

---

## Tahap 1: Inisialisasi Proyek Core & Backend (Payload CMS)
**Tujuan:** Membangun fondasi Next.js dan Admin Panel Payload CMS.

- [ ] **1.1. Setup Proyek Baru**
  - Menginisialisasi proyek menggunakan `npx create-payload-app@latest`.
  - Memilih template *Blank* atau *Website* (berbasis Next.js App Router).
  - Menggunakan TypeScript.
- [ ] **1.2. Setup Database (Local First)**
  - Menggunakan adapter **SQLite** lokal untuk tahap awal pengembangan (mempercepat inisialisasi tanpa perlu setup cloud database).
  - Nantinya, saat persiapan rilis (Tahap 4), konfigurasi ini akan diganti ke **PostgreSQL** (misal: Supabase/Neon).
- [ ] **1.3. Implementasi Collections (Skema Database)**
  - Merujuk ke `04-DATABASE-SCHEMA.md`.
  - Membuat koleksi inti: `Media`, `Lecturers`, `News`, `CurriculumTracks`, `Partners`, dan `Downloads`.
  - Konfigurasi *Access Control* dasar (Publik bisa membaca, hanya Admin yang bisa mengubah).
- [ ] **1.4. Uji Coba Admin Panel**
  - Menjalankan server (`npm run dev`).
  - Membuat akun *Admin* pertama.
  - Memasukkan 2-3 data *dummy* ke setiap *Collection* melalui UI Admin Payload untuk memastikan database berjalan dengan baik.

---

## Tahap 2: Migrasi Frontend (Tailwind & Komponen UI)
**Tujuan:** Memindahkan desain dan komponen UI dari proyek Vite saat ini ke lingkungan Next.js.

- [x] **2.1. Konfigurasi Styling**
  - Menyalin konfigurasi Tailwind CSS (v4) dan *global styles* (`index.css`) ke proyek Next.js (`src/app/globals.css`).
  - Menyesuaikan dependensi seperti `lucide-react`.
- [x] **2.2. Restrukturisasi Layout (Pemisahan App.tsx)**
  - Mengubah layout utama (Navbar & Footer) dari `App.tsx` lama menjadi file `src/app/(frontend)/layout.tsx` di Next.js.
  - Menyesuaikan logika *scroll* Navbar (sebagai *Client Component*).
- [x] **2.3. Transisi Routing (*File-based Routing*)**
  - Membuat folder untuk setiap halaman utama (misal: `src/app/(frontend)/berita/page.tsx`, `src/app/(frontend)/dosen/page.tsx`).
  - Mengganti logika state `currentPage` dan manipulasi *hash URL* menjadi navigasi bawaan Next.js (`<Link href="...">`).
- [x] **2.4. Migrasi Page Components**
  - Memindahkan kode dari direktori `src/pages/` lama ke masing-masing direktori di struktur `app/` baru.
  - Menyesuaikan penamaan kelas dan aset yang relevan.

---

## Tahap 3: Integrasi Data (Backend ke Frontend)
**Tujuan:** Mengganti *mock data* statis dengan data dinamis yang diambil dari database melalui Payload API.

- [x] **3.1. Hapus Hardcode Data**
  - Menghapus konstanta `LECTURERS`, `NEWS`, dsb dari kode UI.
- [x] **3.2. Implementasi Fetch Data (Server Components)**
  - Di setiap halaman (seperti `berita/page.tsx`), ambil data menggunakan *Payload Local API* (contoh: `const data = await payload.find({ collection: 'news' })`).
  - Teruskan data tersebut (sebagai props) ke komponen UI yang merender daftar (*grid* / *list*).
- [x] **3.3. Penanganan Gambar & Media**
  - Pastikan relasi kolom `image` pada koleksi memuat URL gambar secara utuh.
  - Render gambar menggunakan komponen `<Image>` bawaan Next.js untuk optimasi performa.
- [x] **3.4. Implementasi Halaman Detail (Dynamic Routes)**
  - Membuat *Dynamic Route* untuk halaman bacaan berita (misal: `src/app/(frontend)/berita/[slug]/page.tsx`).
  - Mengambil data berdasarkan parameter *slug*.
  - Render field *RichText* dari Payload ke dalam halaman detail menggunakan *parser* yang sesuai (seperti pustaka Lexical Payload to HTML).

---

## Tahap 4: Finalisasi & Deployment (Produksi)
**Tujuan:** Memastikan aplikasi stabil, performa tinggi, dan siap diakses publik.

- [x] **4.1. Refaktor Logika Pencarian & Filter**
  - Memodifikasi filter kategori (Berita/Dosen) agar berfungsi di Next.js (bisa menggunakan *Server-Side Filtering* via query string `?category=Akademik` atau mempertahankan *Client-Side Filtering* dengan *Client Component`).
- [x] **4.2. Pengujian Menyeluruh (Testing)**
  - *Cross-browser testing*.
  - Memastikan waktu muat (loading) halaman optimal (SSR berfungsi).
  - Menguji aksesibilitas (SEO tags, meta description dari database).
- [x] **4.3. Persiapan Deployment**
  - Melakukan *build* aplikasi (`npm run build`).
