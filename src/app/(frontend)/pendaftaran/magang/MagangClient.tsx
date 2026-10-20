"use client";

import React from "react";
import { PageBanner } from "@/components/PageBanner";
import { resolveMediaUrl } from "@/data/siteMedia";
import { Briefcase, Download, ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";
import type { MagangPageContent } from "@/data/magangFallback";

type MagangClientProps = {
  content: MagangPageContent;
  docs: any[];
  locale?: "id" | "en";
};

export function MagangClient({
  content,
  docs = [],
  locale = "id",
}: MagangClientProps) {
  const steps = [
    { n: "1", title: content.step1Title, desc: content.step1Desc },
    { n: "2", title: content.step2Title, desc: content.step2Desc },
    { n: "3", title: content.step3Title, desc: content.step3Desc },
  ];

  const homeHref = locale === "en" ? "/en" : "/";

  return (
    <div className="min-h-screen bg-[#FFFBF5] pb-28" id="konten-utama">
      <PageBanner
        category={content.bannerCategory}
        title={content.bannerTitle}
        subtitle={content.bannerSubtitle}
        breadcrumbs={[
          { label: content.breadcrumbHome, href: homeHref },
          { label: content.breadcrumbCurrent },
        ]}
      />

      <div className="relative mx-auto max-w-4xl px-5 lg:px-8 mt-4">
        {/* Card Persyaratan & Alur */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm md:p-10">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-blue-50 text-[#1453d6]">
              <Briefcase className="size-6" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-display text-xl font-bold text-[#08235b]">
                {content.termsTitle}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {content.termsDesc}
              </p>
            </div>
          </div>

          <ol className="mt-8 space-y-0">
            {steps.map((step, i, arr) => (
              <li
                key={step.n}
                className={`relative flex gap-4 pb-6 last:pb-0 ${
                  i < arr.length - 1 ? "" : ""
                }`}
              >
                {i < arr.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[17px] top-10 h-[calc(100%-2.5rem)] w-px bg-slate-200"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-[#1453d6] text-sm font-bold text-white"
                >
                  {step.n}
                </span>
                <span>
                  <span className="block text-sm font-bold text-[#08235b]">
                    {step.title}
                  </span>
                  <span className="mt-0.5 block text-sm text-slate-600">
                    {step.desc}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Card Berkas Unduhan dari Prodi */}
        <div className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm md:p-10">
          <div className="flex items-center gap-3">
            <FileText className="size-5 text-[#1453d6]" aria-hidden="true" />
            <h2 className="font-display text-xl font-bold text-[#08235b]">
              {content.docsSectionTitle}
            </h2>
          </div>

          {docs.length > 0 ? (
            <ul className="mt-5 divide-y divide-slate-100">
              {docs.map((doc: any) => {
                const fileUrl = resolveMediaUrl(doc.file, "");
                return (
                  <li
                    key={doc.id}
                    className="flex items-center justify-between gap-4 py-3.5"
                  >
                    <span className="truncate text-sm font-semibold text-slate-800">
                      {doc.title}
                    </span>
                    {fileUrl ? (
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full bg-[#1453d6] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#08235b]"
                      >
                        <Download className="size-3.5" aria-hidden="true" />{" "}
                        {content.btnDownloadLabel}
                      </a>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400">
                        {content.btnComingSoonLabel}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-600">
              {content.docsEmptyText}
            </p>
          )}

          {content.docsNoteText && (
            <p className="mt-6 rounded-2xl bg-blue-50/60 p-4 text-xs leading-relaxed text-slate-600">
              {content.docsNoteText}
            </p>
          )}
        </div>

        <Link
          href={homeHref}
          className="mt-8 inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-[#1453d6] transition hover:text-[#08235b]"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />{" "}
          {content.btnBackHomeLabel}
        </Link>
      </div>
    </div>
  );
}
