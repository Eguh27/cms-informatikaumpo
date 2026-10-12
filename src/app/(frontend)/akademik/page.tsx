import React from "react";
import { PageBanner } from "@/components/PageBanner";
import AkademikClient from "./AkademikClient";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { Curriculum } from "@/payload-types";

import { getCurrentLocale } from "@/utilities/getLocale";

export default async function AkademikPage() {
  const locale = await getCurrentLocale();
  const isEn = locale === "en";
  const payload = await getPayload({ config: configPromise });

  const curriculums = await payload.find({
    collection: "curriculums",
    locale,
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
        category={isEn ? "Curriculum & Competency Standard" : "Kurikulum & Standar Kompetensi"}
        title={isEn ? "Academics & Undergraduate Curriculum" : "Akademik & Kurikulum S1"}
        subtitle={
          isEn
            ? "Outcome-Based Education (OBE) curriculum with 144 credits integrating computational theory, practical industry skills, and innovative research projects."
            : "Kurikulum Outcome-Based Education (OBE) 144 SKS yang mengintegrasikan penguasaan teori komputasi, keahlian praktis industri, dan proyek riset inovatif."
        }
        breadcrumbs={[
          { label: isEn ? "Home" : "Beranda", href: isEn ? "/en" : "/" },
          { label: isEn ? "Academics" : "Akademik" },
        ]}
      />

      {/* Render Dynamic Interactive Client Component */}
      <AkademikClient activeCurriculum={activeCurriculum} locale={locale} />
    </div>
  );
}
