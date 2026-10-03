import React from "react";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { DosenClient } from "./DosenClient";

export default async function DosenPage() {
  const payload = await getPayload({ config: configPromise });
  
  const lecturersRes = await payload.find({
    collection: "lecturers",
    limit: 100, // Fetch all for filtering on the client
    depth: 1,
  });

  return <DosenClient initialLecturers={lecturersRes.docs} />;
}
