import React from "react";
import type { Metadata } from "next";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { getCurrentLocale } from "@/utilities/getLocale";
import {
  resolveDosenContent,
  localizeLecturerRole,
  localizeLecturerFocus,
} from "@/data/dosenFallback";
import { DosenClient } from "./DosenClient";

type Args = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  const payload = await getPayload({ config: configPromise });
  const cmsData = await payload
    .findGlobal({
      slug: "dosen-page",
      locale,
    })
    .catch(() => null);

  const content = resolveDosenContent(cmsData, locale);

  return {
    title: content.metaTitle,
    description: content.metaDescription,
  };
}

export default async function DosenPage({ searchParams }: Args) {
  const locale = await getCurrentLocale();
  const payload = await getPayload({ config: configPromise });
  const { q } = await searchParams;

  const [dosenPageRes, lecturersRes] = await Promise.all([
    payload
      .findGlobal({
        slug: "dosen-page",
        locale,
      })
      .catch(() => null),
    payload
      .find({
        collection: "lecturers",
        locale,
        limit: 100, // Fetch all for filtering on the client
        depth: 1,
      })
      .catch(() => ({ docs: [] })),
  ]);

  const content = resolveDosenContent(dosenPageRes, locale);
  const rawLecturers = (lecturersRes.docs || []) as any[];

  // Ensure robust localized display for role and focus
  const localizedLecturers = rawLecturers.map((l) => ({
    ...l,
    role: l.role ? (locale === 'en' ? localizeLecturerRole(l.role, 'en') : l.role) : '',
    focus: l.focus ? (locale === 'en' ? localizeLecturerFocus(l.focus, 'en') : l.focus) : l.focus,
  }));

  return (
    <DosenClient
      initialLecturers={localizedLecturers}
      initialQuery={q ?? ""}
      content={content}
      locale={locale}
    />
  );
}
