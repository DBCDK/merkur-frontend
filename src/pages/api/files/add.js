import { log } from "dbc-node-logger";
import { withAuthorization } from "@/components/api-validator";

async function handler(req, res, agencyId) {
  if (agencyId !== undefined) {
    if (req.method === "POST") {
      log.info(agencyId + " uploading file");
      if (req.is("multipart/form-data")) {
        // Handle multipart form
      } else if (req.is("application/octet-stream")) {
        // Handle octet stream
      }
    }
  }
}

export default withAuthorization(handler);
