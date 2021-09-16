import { log } from "dbc-node-logger";
import { adminAgency, defaultCategory } from "@/constants";
import { withAuthorization } from "@/components/api-validator";
import { searchFiles } from "@/components/FileStoreConnector";

async function handler(req, res, agencyId) {
  if (agencyId !== undefined) {
    if (req.method === "POST") {
      log.info(agencyId + " getting files");

      const data = JSON.parse(req.body);

      if (agencyId === adminAgency) {
        data.category = defaultCategory;
      } else {
        data.agency = parseInt(agencyId);
      }

      const posts = await searchFiles(data);

      return res.status(200).json(posts);
    } else {
      return res
        .status(405)
        .json({ message: "The request does not support method " + req.method });
    }
  }
}

export default withAuthorization(handler);
