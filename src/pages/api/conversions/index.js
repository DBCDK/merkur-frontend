import { log } from "dbc-node-logger";
import { conversionsOrigin, defaultCategory } from "@/constants";
import { mapToFileObjectList } from "@/components/file-helper";
import { searchFiles } from "@/components/FileStoreConnector";
import { withAuthorization } from "@/components/api-validator";

async function handler(req, res, agencyId) {
  if (agencyId !== undefined) {
    if (req.method === "GET") {
      log.info(agencyId + " getting conversions files");

      const data = {
        agency: parseInt(agencyId, 10),
        category: defaultCategory,
        origin: conversionsOrigin,
      };

      const response = await searchFiles(data);

      if (response.status === 200) {
        const posts = await response.json();

        res.status(200).json(mapToFileObjectList(posts));
      } else {
        // Log the real exception cause but show only the generic message to the user
        log.error(
          `Exception caught in /api/conversions while calling ${
            response.url
          }. Got unexpected status code ${
            response.status
          }  with message '${await response.text()}'`
        );

        res.status(response.status).send(response.statusText);
      }
    } else {
      res
        .status(405)
        .json({ message: "The request does not support method " + req.method });
    }
  }
}

export default withAuthorization(handler);
