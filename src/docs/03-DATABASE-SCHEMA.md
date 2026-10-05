# Database Schema & Payload CMS Collections

Dokumen ini memuat rancangan skema basis data (*Database Schema*) yang dipetakan menjadi **Collections** pada Payload CMS. Dokumen ini diperbarui berdasarkan implementasi final MVP dan dirancang sebagai panduan, terutama jika kedepannya aplikasi akan dimigrasikan dari **SQLite ke PostgreSQL**.

---

## Memahami ORM Drizzle (Payload v3)

Payload CMS v3 menggunakan **Drizzle ORM** sebagai lapisan penghubung ke database. Hal ini membuat struktur tabel database (baik SQLite maupun PostgreSQL) dikonstruksi secara otomatis berdasarkan definisi `fields` pada *Collections*.

Jika Anda beralih ke **PostgreSQL**, Drizzle akan:
1. Memecah *field* bertipe `array` dan `blocks` menjadi tabel relasional (Foreign Key) terpisah.
2. Menyimpan tipe data `richText` (Lexical) sebagai JSONB.
3. Memberlakukan aturan `unique: true` dengan *Unique Constraints* yang ketat pada database level.

---

## 1. Media (Uploads Collection)
Koleksi sistem untuk menangani semua unggahan file (gambar, dokumen PDF, dll).

- **Slug**: `media`
- **Fields Utama**:
  - `alt`: Text (Teks alternatif untuk aksesibilitas gambar)
- **Perilaku Database**: Payload secara otomatis membuat kolom `filename`, `filesize`, `mimeType`, dan `url` (serta kolom meta untuk *image resizing*).

---

## 2. Dosen & Tendik (Lecturers)
Menyimpan profil pengajar, pimpinan, dan staf laboratorium.

- **Slug**: `lecturers`
- **Fields**:
  - `name`: Text (Required) - Nama lengkap beserta gelar.
  - `role`: Text (Required) - Jabatan struktural atau akademik.
  - `nidn`: Text - Nomor Induk Dosen Nasional.
  - `nik`: Text - Nomor Induk Karyawan.
  - `category`: Select (Required) - Opsi: `['pimpinan', 'dosen', 'lab']`.
  - `focus`: Text - Bidang keahlian atau riset.
  - `image`: Upload (relation to `media`) - Foto profil dosen. *(Dibuat **opsional** agar data lawas yang tidak berfoto tidak menyebabkan error saat seeding/migrasi).*

---

## 3. Berita & Pengumuman (News)
Menyimpan artikel berita, agenda kegiatan, dan pengumuman akademik.

- **Slug**: `news`
- **Fields**:
  - `title`: Text (Required) - Judul berita.
  - `slug`: Text (Required, **Unique: true**) - Identitas unik untuk URL (contoh: `/berita/magang-pako`). Pada PostgreSQL, kolom ini otomatis memiliki *index* unik.
  - `category`: Select (Required) - Opsi: `['Agenda', 'Akademik', 'Pengumuman']`.
  - `publishedAt`: Date (Required) - Tanggal rilis berita.
  - `image`: Upload (relation to `media`) - Gambar sampul utama (*thumbnail*).
  - `excerpt`: Textarea (Required) - Ringkasan singkat berita.
  - `content`: RichText (Required) - Isi lengkap artikel/pengumuman, disimpan sebagai Lexical JSON tree.
  - `readTime`: Number - Estimasi waktu baca (dalam menit).

---

## 4. Kurikulum & Peminatan (Curriculum Tracks)
Menyimpan data bidang peminatan (seperti AI, RPL, Jaringan).

- **Slug**: `curriculum-tracks`
- **Fields**:
  - `number`: Text - Nomor urut (misal: "01").
  - `title`: Text (Required) - Nama peminatan.
  - `copy`: Textarea (Required) - Deskripsi spesifik peminatan.
  - `tags`: Array of Text - Mata kuliah utama atau keahlian (misal: "Computer Vision").
    - *(Catatan PostgreSQL: `tags` berupa array akan menghasilkan tabel terpisah `curriculum_tracks_tags` yang berelasi ke tabel utama via `parent_id`).*
  - `prospects`: Text - Prospek karir lulusan.
  - `icon`: Text - Nama icon Lucide (misal: "Cpu", "Code2").

---

## 5. Mitra (Partners)
Menyimpan daftar mitra industri dan sertifikasi.

- **Slug**: `partners`
- **Fields**:
  - `name`: Text (Required) - Nama institusi mitra (misal: "Oracle Academy").
  - `label`: Text (Required) - Bentuk kerja sama (misal: "Kurikulum Database & Java Global").

---

## 6. Pusat Unduhan (Downloads)
Menyimpan dokumen pedoman, template skripsi, dsb.

- **Slug**: `downloads`
- **Fields**:
  - `title`: Text (Required) - Nama dokumen.
  - `category`: Select (Required) - Opsi: `['Pedoman', 'Skripsi', 'Magang', 'KKN', 'Publikasi']`.
  - `file`: Upload (Required, relation to `media`) - File dokumen yang diunggah. Payload akan merender metadata seperti ukuran (KB/MB) secara bawaan berkat relasi tabel.

---

## Panduan Migrasi ke PostgreSQL
Jika nanti diputuskan memigrasi database SQLite ini ke PostgreSQL untuk lingkungan produksi yang lebih besar, langkah utamanya adalah:
1. Pada `src/payload.config.ts`, ganti impor `@payloadcms/db-sqlite` ke `@payloadcms/db-postgres`.
2. Ganti blok `db: sqliteAdapter(...)` menjadi `db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL } })`.
3. Jalankan `npm run payload migrate:create` lalu `npm run payload migrate` untuk membuat dan menyinkronkan seluruh tabel-tabel di atas ke instance PostgreSQL Anda.
