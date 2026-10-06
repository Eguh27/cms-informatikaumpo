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

    // Seed Curriculum Tracks
    const existingTracks = await payload.find({ collection: 'curriculum-tracks', limit: 1 });
    if (existingTracks.totalDocs === 0) {
      for (const track of CURRICULUM_TRACKS) {
        await payload.create({
          collection: 'curriculum-tracks',
          data: {
            title: track.title,
            number: track.number,
            copy: track.copy,
            icon: track.icon?.name || 'Cpu',
            tags: track.tags.map((t) => ({ tag: t })),
            prospects: track.prospects,
          },
        });
      }
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
