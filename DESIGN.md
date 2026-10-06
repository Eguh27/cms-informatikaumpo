# DESIGN.md — Panduan Desain Redesain Website Prodi Teknik Informatika UMPO

Dokumen ini merupakan acuan desain resmi untuk redesain antarmuka website Program Studi Teknik Informatika, Universitas Muhammadiyah Ponorogo. Disusun berdasarkan hasil sintesis Stitch MCP dan disesuaikan dengan konten, data riil, dan menu resmi yang sudah ada.

---

## 1. Design Tokens

### 1.1 Palet Warna (100% Light Mode — Hangat, Terang, Semi Ceria)
| Token Name | Hex Code | Peran & Penggunaan |
| :--- | :--- | :--- |
| `color-canvas` | `#FFFBF5` | Latar belakang dasar halaman (*Warm Ivory/Cream*), ramah di mata |
| `color-primary` | `#1E6FD9` | Biru dinamis; tombol primer, link aktif, aksen interaktif, focus ring |
| `color-primary-dark` | `#0B3A8C` | Biru tua terpercaya; heading utama, top bar info, teks identitas kampus |
| `color-primary-light` | `#EAF4FF` | Biru lembut; background card sekunder, container badge, highlight row |
| `color-accent-amber` | `#FFB84D` | Kuning-amber hangat; badge PMB buka, highlight prestasi, rating/bintang |
| `color-accent-peach` | `#FFE8CC` | Peach lembut; kontainer badge aksen, pill pendukung |
| `color-text-main` | `#0F2A4A` | Navy pekat; teks tubuh utama (kontras tinggi WCAG AAA di atas krem) |
| `color-text-muted` | `#4B6B94` | Biru-slate; teks pendukung, tanggal berita, NIDN/NIK dosen, subtitle |
| `color-surface-white` | `#FFFFFF` | Putih bersih; background kartu independen, modal, popup |
| `color-border-subtle` | `rgba(30, 111, 217, 0.10)` | Garis batas tipis untuk kartu dan divider |

### 1.2 Tipografi
* **Font Family**: `Plus Jakarta Sans`, sans-serif (Google Fonts)
* **Skala Tipografi**:
  * **Display Hero**: `56px` (Mobile: `36px`), line-height: `1.2`, weight: `800` (ExtraBold), tracking: `-0.025em`
  * **Headline XL**: `40px` (Mobile: `28px`), line-height: `1.25`, weight: `700` (Bold)
  * **Headline LG**: `32px` (Mobile: `24px`), line-height: `1.3`, weight: `700` (Bold)
  * **Headline MD**: `24px` (Mobile: `20px`), line-height: `1.35`, weight: `600` (SemiBold)
  * **Headline SM / Card Title**: `20px`, line-height: `1.4`, weight: `600` (SemiBold)
  * **Body LG**: `18px`, line-height: `1.6`, weight: `400`
  * **Body MD (Default)**: `16px`, line-height: `1.6`, weight: `400`
  * **Body SM**: `14px`, line-height: `1.5`, weight: `400` / `500`
  * **Label / Badge**: `12px` - `13px`, line-height: `1.4`, weight: `600` / `700`, uppercase tracking: `+0.05em`

### 1.3 Kelengkungan Sudut (Border Radius)
* `rounded-3xl` (`24px` – `32px`): Kartu utama, hero container, banner pendaftaran, modal besar
* `rounded-2xl` (`16px` – `20px`): Kartu dosen, kartu berita, kartu kurikulum, kotak fitur
* `rounded-xl` (`12px`): Input form, dropdown panel menu
* `rounded-full` (`9999px`): Tombol aksi utama (CTA), pill badges, status akreditasi

### 1.5 Aturan Ink-on-Tint (Kontras Pasangan Warna)

Setiap pasangan teks–latar harus lolos WCAG AA (4.5:1 teks normal, 3:1 teks besar ≥24px). Pasangan yang sudah terukur dan disetujui:

| Teks di atas Latar | Rasio | Status |
| :--- | :--- | :--- |
| `#0B3A8C` / `#0F2A4A` di `#FFFBF5` | 10–14:1 | ✅ |
| Putih di `#1E6FD9` / `#0B3A8C` / `#15803D` / `#B45309` / `#0F766E` | 4.8–10:1 | ✅ |
| `#4B6B94` di putih / `#FFFBF5` | 5.3–5.5:1 | ✅ (pengganti semua abu-abu) |

Dilarang: teks putih di `#25D366`, amber-500, atau teal-600; teks `slate-400`/`#7386a8` di permukaan terang. Uji pasangan baru sebelum dipakai.

### 1.4 Elevasi & Bayangan (Shadows)
* **Level 1 (Card Resting)**: `box-shadow: 0 4px 20px -2px rgba(15, 42, 74, 0.05), 0 2px 6px -1px rgba(15, 42, 74, 0.03)`
* **Level 2 (Hover / Active)**: `box-shadow: 0 16px 32px -4px rgba(30, 111, 217, 0.12), 0 6px 12px -2px rgba(15, 42, 74, 0.04)` + `transform: translateY(-4px)`
* **Level 3 (Sticky Nav / Modal)**: `box-shadow: 0 20px 40px -8px rgba(11, 58, 140, 0.12)` + `backdrop-filter: blur(16px)`

---

## 2. Aturan Komponen

### 2.1 Tombol (Button System)
1. **Primary Button**: Background solid `#1E6FD9`, teks `#FFFFFF`, bentuk `rounded-full`, padding `14px 28px`. Hover: background `#0B3A8C`, shadow biru menyala lembut.
2. **Secondary / Accent Button**: Background `#FFE8CC`, border `1px solid #FFB84D`, teks `#0F2A4A`. Hover: background `#FFB84D`.
3. **Ghost / Outline Button**: Border `1.5px solid #1E6FD9`, background transparan, teks `#1E6FD9`. Hover: background `#EAF4FF`.

### 2.2 Kartu Informasi (Cards)
* Latar putih `#FFFFFF` di atas kanvas `#FFFBF5`.
* Border tipis `1px solid rgba(30, 111, 217, 0.08)`.
* Sudut `rounded-3xl` atau `rounded-2xl`.
* Efek transisi halus saat hover (`transition-all duration-300 ease-out`).

### 2.3 Badges & Chips
* Bentuk *pill* (`rounded-full`), padding `6px 14px`.
* Tipe Kategori / Akademik: Latar `#EAF4FF`, teks `#0B3A8C`.
* Tipe PMB / Aksen: Latar `#FFE8CC`, teks `#0F2A4A`, ikon dot `#FFB84D`.

### 2.4 Pembatas Bergelombang (Wave Divider SVG)
* SVG inline kurva bergelombang dinamis untuk transisi antar-bagian.
* Menyambungkan latar kanvas krem `#FFFBF5`, biru muda `#EAF4FF`, dan putih `#FFFFFF` tanpa garis patah kaku.

### 2.5 Lingkaran Ikon (PxCircle)
* `rounded-full` + border 1px + satu lapis glow. Diganti sebagai pengganti slab ikon persegi agar baris kartu tidak terbaca sebagai hujan warna.
* **Warna dibatasi dua sumbu saja**: `primary` (`#1E6FD9` di atas kanvas krem) dan `amber` (`#FFB84D` di atas `#FFE8CC`). Larangan memakai palet semantik framework (`bg-blue-50`, `bg-emerald-50`, `bg-amber-50`) untuk membedakan jenis kartu.
* Glow dibawa oleh varian `tone`, bukan flag terpisah, sehingga jumlah varian tetap dua sumbu dan lingkaran yang terlalu bercahaya tidak bisa terjadi.
* Di atas panel gelap `#0B3A8C` gunakan `onNavy` (amber) atau `onNavySoft` (putih transparan).
* Ukuran: `sm` 36px untuk ikon pelengkap, `md` 44px untuk target sentuh, `hero` 112px untuk satu nilai utama per section.

---

## 3. Daftar Section dan Urutannya (Homepage)

Sesuai struktur konten riil yang ada pada project Teknik Informatika UMPO:

1. **Header & Top Utility Bar (Sticky)**
   * Bar info atas: Akreditasi "Baik Sekali" BAN-PT, kontak email/telepon kampus, link UMPO.
   * Navbar sticky: Logo & Nama Prodi, Menu (Beranda, Profil, Akademik, Dosen, Fasilitas, Berita, Unduhan, Kontak) + Tombol CTA "Daftar PMB".
2. **Hero Section (Mode A — Multi-layer Parallax Hero)**
   * Background: `langit.webp` + animasi lembut `awan.webp`.
   * Midground: `gedung-asli.webp` (Cutout gedung kampus TI UMPO).
   * Foreground: `taman.webp` (Taman kampus berdaun hijau asri).
   * Konten: Badge "Penerimaan Mahasiswa Baru", Headline utama prodi, subjudul, 2 tombol CTA, dan Quick Stats Bar (Akreditasi, Lulusan, Dosen, Mahasiswa Aktif).
3. **Wave Transition Divider 1** (Transisi dari Hero ke Konten Krem).
4. **Sambutan Kaprodi & Profil Singkat Prodi**
   * Sambutan resmi Ketua Program Studi (Adi Fajaryanto Cobantoro, S.Kom., M.Kom.).
   * Ringkasan visi, misi, dan pilar keilmuan prodi.
5. **Bidang Minat & Keunggulan Kurikulum**
   * 3 Peminatan Utama: Sistem Cerdas & Data, Rekayasa Perangkat Lunak, Jaringan & Keamanan Siber.
   * Sertifikasi kompetensi dan kurikulum berbasis OBE/MBKM.
6. **Dosen & Tenaga Ahli (Highlight Sivitas)**
   * Kartu profil pimpinan prodi, kepala laboratorium, dan dosen tetap lengkap dengan bidang keahlian dan NIDN/NIK.
7. **Fasilitas Laboratorium Unggulan**
   * Lab Jaringan & IoT, Lab Rekayasa Perangkat Lunak, Lab Sistem Informasi & Multimedia.
8. **Berita & Agenda Terkini**
   * Tab filter: Semua, Akademik, Agenda, Pengumuman.
   * Kartu berita dengan tanggal, kategori, excerpt ringkas, dan estimasi waktu baca.
9. **Testimoni Alumni & Mitra Industri**
   * Ulasan karir alumni di berbagai tech company dan daftar instansi mitra.
10. **CTA Penerimaan Mahasiswa Baru (PMB)**
    * Banner aksen hangat (`#1E6FD9` dengan aksen amber) mengajak calon mahasiswa mendaftar online.
11. **Footer Komprehensif**
    * Identitas lengkap Prodi TI FT UMPO, navigasi cepat ke seluruh menu, tautan portal kampus (SIAKAD, Jurnal), media sosial resmi, dan hak cipta.

---

## 4. Rencana Animasi per Section

| Section | Target Elemen | Jenis Animasi & Karakteristik |
| :--- | :--- | :--- |
| **Sticky Navbar** | Header Container | Transisi ke background kaca (`backdrop-blur-md bg-white/90`) saat scroll > 40px |
| **Hero Section** | Awan (`awan.webp`) | Drift horizontal lambat terus menerus (CSS keyframe floating `60s linear infinite`) |
| **Hero Section** | Gedung & Taman | Parallax lembut saat scroll dan micro-depth layering |
| **Hero Section** | Text & CTA | Staggered entrance fade-up (`translate-y-0 opacity-100` delay 100ms) |
| **Quick Stats Bar** | Angka & Metrik | Counter increment feeling + hover elevation |
| **Sambutan & Profil**| Foto Kaprodi & Teks | Soft fade-in dan border shimmer lembut |
| **Keunggulan** | Kartu Peminatan | Hover lift `-4px`, border color highlight biru `#1E6FD9`, ikon rotation micro-spring |
| **Dosen** | Kartu Profil | Smooth scale badge hover dan fade-in detail fokus riset |
| **Fasilitas** | Tab Navigasi & Item | Smooth tab slide indicator dan transisi fade gambar |
| **Berita** | Kartu Berita | Hover shadow expansion dan arrow icon slide-x `4px` |
| **CTA PMB** | Tombol Daftar | Pulse glow berkala pada badge amber dan hover scale 1.02x |
