import React from "react";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { DosenClient } from "./DosenClient";

type Args = {
  searchParams: Promise<{ q?: string }>;
};

export default async function DosenPage({ searchParams }: Args) {
  const payload = await getPayload({ config: configPromise });
  const { q } = await searchParams;

  const lecturersRes = await payload.find({
    collection: "lecturers",
    limit: 100, // Fetch all for filtering on the client
    depth: 1,
  });

  return <DosenClient initialLecturers={lecturersRes.docs} initialQuery={q ?? ""} />;
}
