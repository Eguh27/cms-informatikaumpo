"use client";

import React from "react";
import { PageBanner } from "@/components/PageBanner";
import { SITE_MEDIA } from "@/data/siteMedia";
import { resolveMediaUrl } from "@/data/siteMedia";
import type { FasilitasPageContent } from "@/data/fasilitasFallback";
import {
  Network,
  Laptop,
  Building2,
  CheckCircle2,
  Users,
  BookOpen,
} from "lucide-react";

export interface FasilitasLeadership {
  labJaringan?: { name: string; nidn?: string | null } | null;
  labRpl?: { name: string; nidn?: string | null } | null;
}

interface FasilitasClientProps {
  data: FasilitasPageContent;
  leadership?: FasilitasLeadership;
  locale?: "id" | "en";
}

export function FasilitasClient({
  data,
  leadership,
  locale = "id",
}: FasilitasClientProps) {
  const lab1ImgUrl = resolveMediaUrl(data.lab1Image, SITE_MEDIA.labNetwork);
  const lab2ImgUrl = resolveMediaUrl(data.lab2Image, SITE_MEDIA.labSoftware);

  return (
    <div className="min-h-screen bg-[#FFFBF5] pb-28" id="konten-utama">
      {/* Banner */}
      <PageBanner
        category={data.bannerCategory}
        title={data.bannerTitle}
        subtitle={data.bannerSubtitle}
        breadcrumbs={[
          { label: data.breadcrumbHome, href: locale === "en" ? "/en" : "/" },
          { label: data.breadcrumbCurrent },
        ]}
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 mt-4">
        {/* Lab 1 & Lab 2 Showcase */}
        <div className="space-y-12 mb-16">
          {/* Lab 1: Jaringan & IoT */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-7 md:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-[#1453d6] border border-blue-100">
                  <Network className="size-3.5" /> {data.lab1Badge}
                </div>
                <h2 className="mt-3 font-display text-2xl md:text-3xl font-bold text-[#08235b]">
                  {data.lab1Title}
                </h2>
                <div className="mt-2 text-xs font-semibold text-slate-500">
                  {data.lab1HeadRoleLabel}{" "}
                  <span className="text-[#1453d6] font-bold">
                    {leadership?.labJaringan?.name || data.lab1HeadName}
                  </span>
                </div>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  {data.lab1Desc}
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                    <span>{data.lab1Point1}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                    <span>{data.lab1Point2}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                    <span>{data.lab1Point3}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                    <span>{data.lab1Point4}</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
                  <span>{data.lab1Capacity}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{data.lab1Connection}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{data.lab1Location}</span>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-md aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={lab1ImgUrl}
                    alt={data.lab1Title}
                    className="size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06183d]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs font-bold text-[#6edbff]">{data.lab1ImageTag}</div>
                    <div className="text-sm font-semibold">{data.lab1ImageSub}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lab 2: RPL & Komputer */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-7 md:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-md aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={lab2ImgUrl}
                    alt={data.lab2Title}
                    className="size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06183d]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs font-bold text-[#6edbff]">{data.lab2ImageTag}</div>
                    <div className="text-sm font-semibold">{data.lab2ImageSub}</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3.5 py-1 text-xs font-bold text-teal-700 border border-teal-100">
                  <Laptop className="size-3.5" /> {data.lab2Badge}
                </div>
                <h2 className="mt-3 font-display text-2xl md:text-3xl font-bold text-[#08235b]">
                  {data.lab2Title}
                </h2>
                <div className="mt-2 text-xs font-semibold text-slate-500">
                  {data.lab2HeadRoleLabel}{" "}
                  <span className="text-[#1453d6] font-bold">
                    {leadership?.labRpl?.name || data.lab2HeadName}
                  </span>
                </div>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  {data.lab2Desc}
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <CheckCircle2 className="size-4 text-teal-600 shrink-0" />
                    <span>{data.lab2Point1}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <CheckCircle2 className="size-4 text-teal-600 shrink-0" />
                    <span>{data.lab2Point2}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <CheckCircle2 className="size-4 text-teal-600 shrink-0" />
                    <span>{data.lab2Point3}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <CheckCircle2 className="size-4 text-teal-600 shrink-0" />
                    <span>{data.lab2Point4}</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
                  <span>{data.lab2Capacity}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{data.lab2Ac}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{data.lab2Location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fasilitas Penunjang Kampus */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-7 md:p-10 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-[#1453d6]">
            {data.supportTag}
          </div>
          <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold text-[#08235b]">
            {data.supportTitle}
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-2xl">
            {data.supportDesc}
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <div className="grid size-11 place-items-center rounded-xl bg-blue-100 text-[#1453d6] mb-4">
                <Building2 className="size-5" />
              </div>
              <h3 className="font-display text-base font-bold text-slate-900">
                {data.support1Title}
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                {data.support1Desc}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <div className="grid size-11 place-items-center rounded-xl bg-blue-100 text-[#1453d6] mb-4">
                <BookOpen className="size-5" />
              </div>
              <h3 className="font-display text-base font-bold text-slate-900">
                {data.support2Title}
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                {data.support2Desc}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <div className="grid size-11 place-items-center rounded-xl bg-blue-100 text-[#1453d6] mb-4">
                <Users className="size-5" />
              </div>
              <h3 className="font-display text-base font-bold text-slate-900">
                {data.support3Title}
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                {data.support3Desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
