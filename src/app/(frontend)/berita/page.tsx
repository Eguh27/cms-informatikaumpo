import React from "react";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { BeritaClient } from "./BeritaClient";

export default async function BeritaPage() {
  const payload = await getPayload({ config: configPromise });
  
  const newsRes = await payload.find({
    collection: "news",
    limit: 100, // Fetch all for simple client-side filtering, or you can implement pagination later
    sort: "-publishedAt",
  });

  return <BeritaClient initialNews={newsRes.docs} />;
}
