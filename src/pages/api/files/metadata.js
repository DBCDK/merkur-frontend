import { log } from "dbc-node-logger";
import { withSession } from "@/components/api-validator";
import { addMetadata } from "@/components/FileStoreConnector";
// TODO MS-3593 Merkur v2: Opføgning på fjernelse af upload funktionalitet
async function handler(req, res, agencyId) {
  log.warn("Deprecated endpoint hit: /api/files/metadata");

  return res
    .status(501)
    .json({ message: "This endpoint is no longer supported" });

  if (agencyId !== undefined) {
    if (req.method === "POST") {
      const data = req.body;
      const fileId = data.fileId;
      const metadata = data.metadata;

      log.info(agencyId + " setting metadata for file " + fileId);

      await addMetadata(fileId, metadata);

      return res.status(200).end();
    } else {
      return res
        .status(405)
        .json({ message: "The request does not support method " + req.method });
    }
  }
}

export default withSession(handler);
