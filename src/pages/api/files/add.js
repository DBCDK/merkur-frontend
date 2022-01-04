import { log } from "dbc-node-logger";
import { withSession } from "@/components/api-validator";
import { addFile } from "@/components/FileStoreConnector";
// TODO MS-3593 Merkur v2: Opføgning på fjernelse af upload funktionalitet
async function handler(req, res, agencyId) {
  log.warn("Deprecated endpoint hit: /api/files/add");

  res.status(501).json({ message: "This endpoint is no longer supported" });

  if (agencyId !== undefined) {
    if (req.method === "POST") {
      log.info(agencyId + " uploading file");
      const headers = req.headers;

      if (
        !("content-type" in headers) ||
        headers["content-type"] !== "application/octet-stream"
      ) {
        res
          .status(415)
          .json({ message: "Content-type must be application/octet-stream" });
      }

      const data = req.body;
      const response = await addFile(data);

      if (response.status !== 201) {
        res.status(response.status).json({ message: "Unexpected status code" });
      }
      const location = response.headers.get("location");

      res.status(200).json({ location: location });
    }
  }
}

export default withSession(handler);
