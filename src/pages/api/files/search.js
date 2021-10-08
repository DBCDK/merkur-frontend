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
        data.agency = parseInt(agencyId, 10);
      }

      const response = await searchFiles(data);

      if (response.status === 200) {
        const posts = await response.json();

        return res.status(200).json(posts);
      } else {
        // Log the real exception cause but show only the generic message to the user
        log.error(
          `Exception caught in /api/files/search while calling ${
            response.url
          }. Got unexpected status code ${
            response.status
          }  with message '${await response.text()}'`
        );
        return res.status(response.status).send(response.statusText);
      }
    } else {
      return res
        .status(405)
        .json({ message: "The request does not support method " + req.method });
    }
  } else {
    return res.status(400).json({ message: "Agency is missing" });
  }
}

export default withAuthorization(handler);
