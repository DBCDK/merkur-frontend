import { defaultCategory, periodicJobsOrigin } from "@/constants";
import { log } from "dbc-node-logger";
import { authenticate } from "@/components/api-validator";
import { mapToFileObjectList } from "@/components/file-helper";

export default async function handler(req, res) {
  const agencyId = authenticate(req, res);

  if (agencyId !== undefined) {
    if (req.method === "GET") {
      log.info(agencyId + " getting unclaimed periodic-jobs files");

      const data = {
        agencyId: agencyId,
        category: defaultCategory,
        origin: periodicJobsOrigin,
        claimed: false,
      };
      const response = await fetch(`${process.env.FILESTORE_URL}/files`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const posts = await response.json();

      return res.status(response.status).json(mapToFileObjectList(req, posts));
    } else {
      return res
        .status(405)
        .json({ message: "The request does not support method " + req.method });
    }
  }
}
