import React from "react";
import type { Metadata } from "next";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { getCurrentLocale } from "@/utilities/getLocale";
import { resolveBeritaContent } from "@/data/beritaFallback";
import { BeritaClient } from "./BeritaClient";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  const payload = await getPayload({ config: configPromise });
  const cmsData = await payload
    .findGlobal({
      slug: "berita-page",
      locale,
    })
    .catch(() => null);

  const content = resolveBeritaContent(cmsData, locale);

  return {
    title: content.metaTitle,
    description: content.metaDescription,
  };
}

export default async function BeritaPage() {
  const locale = await getCurrentLocale();
  const payload = await getPayload({ config: configPromise });

  const [beritaPageRes, categoriesRes, newsRes] = await Promise.all([
    payload
      .findGlobal({
        slug: "berita-page",
        locale,
      })
      .catch(() => null),
    payload
      .find({
        collection: "categories",
        locale,
        limit: 100,
      })
      .catch(() => ({ docs: [] })),
    payload
      .find({
        collection: "news",
        locale,
        limit: 100,
        sort: "-publishedAt",
        depth: 1,
      })
      .catch(() => ({ docs: [] })),
  ]);

  const content = resolveBeritaContent(beritaPageRes, locale);

  return (
    <BeritaClient
      content={content}
      categories={(categoriesRes.docs || []) as any[]}
      initialNews={(newsRes.docs || []) as any[]}
      locale={locale}
    />
  );
}
