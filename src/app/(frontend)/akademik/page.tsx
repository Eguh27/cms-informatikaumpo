import React from "react";
import { PageBanner } from "@/components/PageBanner";
import AkademikClient from "./AkademikClient";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { Curriculum } from "@/payload-types";

export default async function AkademikPage() {
  const payload = await getPayload({ config: configPromise });

  const curriculums = await payload.find({
    collection: "curriculums",
    where: {
      isActive: {
        equals: true,
      },
    },
    limit: 1,
  });

  const activeCurriculum = curriculums.docs[0] as Curriculum | null;

  return (
    <div className="min-h-screen bg-[#FFFBF5] pb-28" id="konten-utama">
      {/* Banner */}
      <PageBanner
        category="Kurikulum & Standar Kompetensi"
        title="Akademik & Kurikulum S1"
        subtitle="Kurikulum Outcome-Based Education (OBE) 144 SKS yang mengintegrasikan penguasaan teori komputasi, keahlian praktis industri, dan proyek riset inovatif."
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Akademik" },
        ]}
      />

      {/* Render Dynamic Interactive Client Component */}
      <AkademikClient activeCurriculum={activeCurriculum} />
    </div>
  );
}
