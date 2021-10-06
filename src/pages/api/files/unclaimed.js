import { defaultCategory } from "@/constants";
import { log } from "dbc-node-logger";
import { withAuthorization } from "@/components/api-validator";
import { mapToFileObjectList } from "@/components/file-helper";
import { searchFiles } from "@/components/FileStoreConnector";

async function handler(req, res, agencyId) {
  if (agencyId !== undefined) {
    if (req.method === "GET") {
      log.info(agencyId + " getting unclaimed files");

      const data = {
        agency: parseInt(agencyId, 10),
        category: defaultCategory,
        claimed: false,
      };

      const response = await searchFiles(data);

      if (response.status === 200) {
        const posts = await response.json();

        return res.status(200).json(mapToFileObjectList(posts));
      } else {
        // Log the real exception cause but show only the generic message to the user
        log.error(
          `Status code ${
            response.status
          } from /api/files/search with message '${await response.text()}'`
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
