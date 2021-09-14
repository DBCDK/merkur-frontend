import { log } from "dbc-node-logger";
import { adminAgency, conversionsOrigin, defaultCategory } from "@/constants";
import { mapToFileObjectList } from "@/components/file-helper";
import { withAuthorization } from "@/components/api-validator";

async function handler(req, res, agencyId) {
  if (agencyId !== undefined) {
    if (req.method === "GET") {
      log.info(agencyId + " getting files");

      const data = {
        category: defaultCategory,
        origin: conversionsOrigin,
      };

      if (agencyId !== adminAgency) {
        data.agency = agencyId;
      }

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

export default withAuthorization(handler);
