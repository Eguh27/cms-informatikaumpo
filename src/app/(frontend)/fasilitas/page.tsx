import React from "react";
import type { Metadata } from "next";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { getCurrentLocale } from "@/utilities/getLocale";
import { resolveFasilitasContent } from "@/data/fasilitasFallback";
import { FasilitasClient, type FasilitasLeadership } from "./FasilitasClient";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  const payload = await getPayload({ config: configPromise });
  const cmsData = await payload
    .findGlobal({
      slug: "fasilitas-page",
      locale,
    })
    .catch(() => null);

  const content = resolveFasilitasContent(cmsData, locale);

  return {
    title: content.metaTitle,
    description: content.metaDescription,
  };
}

export default async function FasilitasPage() {
  const locale = await getCurrentLocale();
  const payload = await getPayload({ config: configPromise });

  const [fasilitasPageRes, lecturersRes] = await Promise.all([
    payload
      .findGlobal({
        slug: "fasilitas-page",
        locale,
      })
      .catch(() => null),
    payload
      .find({
        collection: "lecturers",
        locale,
        limit: 100,
        depth: 1,
      })
      .catch(() => ({ docs: [] })),
  ]);

  const content = resolveFasilitasContent(fasilitasPageRes, locale);
  const lecturers = (lecturersRes.docs || []) as any[];

  // Match Lab Heads from lecturers collection (synced with /profil#struktur & /dosen)
  const labJaringan = lecturers.find((l) =>
    l.role?.toLowerCase().includes("jaringan") || l.role?.toLowerCase().includes("iot")
  );
  const labRpl = lecturers.find((l) =>
    l.role?.toLowerCase().includes("rpl") || l.role?.toLowerCase().includes("ka. lab prodi")
  );

  const leadership: FasilitasLeadership = {
    labJaringan: labJaringan ? { name: labJaringan.name, nidn: labJaringan.nidn } : null,
    labRpl: labRpl ? { name: labRpl.name, nidn: labRpl.nidn } : null,
  };

  return (
    <FasilitasClient
      data={content}
      leadership={leadership}
      locale={locale}
    />
  );
}
