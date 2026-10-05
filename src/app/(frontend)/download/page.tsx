import React from "react";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { DownloadClient } from "./DownloadClient";

export default async function DownloadPage() {
  const payload = await getPayload({ config: configPromise });
  
  const downloadsRes = await payload.find({
    collection: "downloads",
    limit: 100, // Fetch all for filtering on the client
    depth: 1,
  });

  return <DownloadClient initialDownloads={downloadsRes.docs} />;
}
