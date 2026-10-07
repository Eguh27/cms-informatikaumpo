import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { LECTURERS, NEWS, CURRICULUM_TRACKS, PARTNERS } from '@/data/mock';

export async function GET(req: Request) { return await runSeed(req); }
export async function POST(req: Request) { return await runSeed(req); }

async function runSeed(req: Request) {
  try {
    const payload = await getPayload({ config: configPromise });

    // Seed Lecturers
    const existingLecturers = await payload.find({ collection: 'lecturers', limit: 1 });
    if (existingLecturers.totalDocs === 0) {
      for (const lecturer of LECTURERS) {
        await payload.create({
          collection: 'lecturers',
          data: {
            name: lecturer.name,
            role: lecturer.role,
            nidn: lecturer.nidn,
            nik: lecturer.nik,
            category: lecturer.category,
            focus: lecturer.focus,
          },
        });
      }
    }

    // Seed Categories
    const categoriesMap: Record<string, any> = {};
    const existingCats = await payload.find({ collection: 'categories', limit: 10 });
    for (const cat of existingCats.docs) {
      categoriesMap[cat.title] = cat.id;
    }

    const defaultCats = ['Agenda', 'Akademik', 'Pengumuman'];
    for (const catName of defaultCats) {
      if (!categoriesMap[catName]) {
        const newCat = await payload.create({
          collection: 'categories',
          data: {
            title: catName,
            slug: catName.toLowerCase().replace(/ /g, '-'),
          },
        });
        categoriesMap[catName] = newCat.id;
      }
    }

    // Seed News
    const existingNews = await payload.find({ collection: 'news', limit: 1 });
    if (existingNews.totalDocs === 0) {
      for (const news of NEWS) {
        // Construct a very basic Lexical structure for the required content field
        const basicContent = {
          root: {
            type: "root",
            format: "",
            indent: 0,
            version: 1,
            children: [
              {
                type: "paragraph",
                format: "",
                indent: 0,
                version: 1,
                children: [
                  {
                    type: "text",
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: news.excerpt,
                    version: 1
                  }
                ]
              }
            ]
          }
        };

        const catId = categoriesMap[news.category] || categoriesMap['Pengumuman'];

        await payload.create({
          collection: 'news',
          data: {
            title: news.title,
            slug: news.id,
            category: catId,
            excerpt: news.excerpt,
            readTime: parseInt(news.readTime) || 3,
            publishedAt: new Date(news.date).toISOString(),
            content: basicContent as any,
          },
        });
      }
    }

    // Seed Curriculums
    const existingCurriculums = await payload.find({ collection: 'curriculums', limit: 1 });
    if (existingCurriculums.totalDocs === 0) {
      await payload.create({
        collection: 'curriculums',
        data: {
          name: 'Kurikulum OBE 2023/2024',
          isActive: true,
          tracks: CURRICULUM_TRACKS.map((t) => ({
            number: t.number,
            title: t.title,
            copy: t.copy,
            icon: t.icon?.name || 'Cpu',
            tags: t.tags.map((tag) => ({ tag })),
            prospects: t.prospects,
          })),
          semesters: [
            {
              stage: 1,
              label: "Tahun 1 (Semester 1 & 2)",
              focus: "Pondasi Sains Komputasi & Logika Pemrograman",
              courses: [
                { code: "TIF101", name: "Algoritma & Pemrograman Dasar", sks: 3, type: "Wajib" },
                { code: "TIF102", name: "Matematika Diskrit Komputasi", sks: 3, type: "Wajib" },
                { code: "TIF103", name: "Pengantar Teknologi Informasi", sks: 2, type: "Wajib" },
                { code: "TIF104", name: "Al-Islam & Kemuhammadiyahan I", sks: 2, type: "Universitas" },
                { code: "TIF105", name: "Bahasa Inggris Komputasi", sks: 2, type: "Wajib" },
                { code: "TIF201", name: "Struktur Data & Praktikum", sks: 4, type: "Wajib" },
                { code: "TIF202", name: "Arsitektur & Organisasi Komputer", sks: 3, type: "Wajib" },
                { code: "TIF203", name: "Kalkulus Informatika", sks: 3, type: "Wajib" },
              ],
            },
            {
              stage: 2,
              label: "Tahun 2 (Semester 3 & 4)",
              focus: "Inti Rekayasa Sistem & Jaringan",
              courses: [
                { code: "TIF301", name: "Sistem Basis Data & Praktikum", sks: 4, type: "Wajib" },
                { code: "TIF302", name: "Pemrograman Berorientasi Objek (OOP)", sks: 3, type: "Wajib" },
                { code: "TIF303", name: "Jaringan Komputer Dasar", sks: 3, type: "Wajib" },
                { code: "TIF304", name: "Sistem Operasi Modern", sks: 3, type: "Wajib" },
                { code: "TIF401", name: "Rekayasa Perangkat Lunak (RPL)", sks: 3, type: "Wajib" },
                { code: "TIF402", name: "Pemrograman Web Lanjut", sks: 3, type: "Wajib" },
                { code: "TIF403", name: "Keamanan Sistem & Kriptografi", sks: 3, type: "Wajib" },
                { code: "TIF404", name: "Interaksi Manusia dan Komputer (IMK)", sks: 3, type: "Wajib" },
              ],
            },
            {
              stage: 3,
              label: "Tahun 3 (Semester 5 & 6)",
              focus: "Konsentrasi AI, RPL & Internet of Things",
              courses: [
                { code: "TIF501", name: "Kecerdasan Buatan (Artificial Intelligence)", sks: 3, type: "Wajib" },
                { code: "TIF502", name: "Machine Learning & Deep Learning", sks: 3, type: "Peminatan AI" },
                { code: "TIF503", name: "Mobile Application Development", sks: 3, type: "Peminatan RPL" },
                { code: "TIF504", name: "Internet of Things & Sensor Network", sks: 3, type: "Peminatan Lab" },
                { code: "TIF601", name: "Pengolahan Citra Digital (Computer Vision)", sks: 3, type: "Peminatan AI" },
                { code: "TIF602", name: "Cloud Computing & Microservices", sks: 3, type: "Peminatan RPL" },
                { code: "TIF603", name: "Data Mining & Data Warehouse", sks: 3, type: "Peminatan AI" },
                { code: "TIF604", name: "Metodologi Penelitian Informatika", sks: 2, type: "Wajib" },
              ],
            },
            {
              stage: 4,
              label: "Tahun 4 (Semester 7 & 8)",
              focus: "Praktik Industri, Magang & Tugas Akhir",
              courses: [
                { code: "TIF701", name: "Kerja Praktik (KP) / Magang Industri", sks: 3, type: "Praktik" },
                { code: "TIF702", name: "Kuliah Kerja Nyata (KKN) Tematik GIAT", sks: 3, type: "Pengabdian" },
                { code: "TIF703", name: "Technopreneurship & Etika Profesi TI", sks: 2, type: "Wajib" },
                { code: "TIF704", name: "Kapita Selekta Komputasi Cerdas", sks: 2, type: "Pilihan" },
                { code: "TIF801", name: "Proposal Skripsi (SISKRIP)", sks: 2, type: "Tugas Akhir" },
                { code: "TIF802", name: "Skripsi / Tugas Akhir Mandiri", sks: 4, type: "Tugas Akhir" },
              ],
            }
          ]
        },
      });
    }

    // Seed Partners
    const existingPartners = await payload.find({ collection: 'partners', limit: 1 });
    if (existingPartners.totalDocs === 0) {
      for (const partner of PARTNERS) {
        await payload.create({
          collection: 'partners',
          data: {
            name: partner.name,
            label: partner.label,
          },
        });
      }
    }

    // Downloads require an uploaded Media file; seed them from the admin panel instead.
    // (Previous loop body was intentionally empty and has been removed.)

    return NextResponse.json({ message: 'Seeding completed successfully!' });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: 'Seeding failed' }, { status: 500 });
  }
}
