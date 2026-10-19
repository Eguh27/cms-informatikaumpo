import React from "react";
import type { Metadata } from "next";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { getCurrentLocale } from "@/utilities/getLocale";
import { resolveDownloadContent } from "@/data/downloadFallback";
import { DownloadClient } from "./DownloadClient";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  const payload = await getPayload({ config: configPromise });
  const cmsData = await payload
    .findGlobal({
      slug: "download-page",
      locale,
    })
    .catch(() => null);

  const content = resolveDownloadContent(cmsData, locale);

  return {
    title: content.metaTitle,
    description: content.metaDescription,
  };
}

export default async function DownloadPage() {
  const locale = await getCurrentLocale();
  const payload = await getPayload({ config: configPromise });

  const [downloadPageRes, downloadsRes] = await Promise.all([
    payload
      .findGlobal({
        slug: "download-page",
        locale,
      })
      .catch(() => null),
    payload
      .find({
        collection: "downloads",
        locale,
        limit: 100,
        depth: 1,
      })
      .catch(() => ({ docs: [] })),
  ]);

  const content = resolveDownloadContent(downloadPageRes, locale);

  return (
    <DownloadClient
      content={content}
      initialDownloads={(downloadsRes.docs || []) as any[]}
      locale={locale}
    />
  );
}
