import { log } from "dbc-node-logger";
import { withAuthorization } from "@/components/api-validator";
import { defaultCategory, periodicJobsOrigin } from "@/constants";
import { mapToFileObjectList } from "@/components/file-helper";
import { searchFiles } from "@/components/FileStoreConnector";

async function handler(req, res, agencyId) {
  if (agencyId !== undefined) {
    if (req.method === "GET") {
      log.info(agencyId + " getting periodic-jobs files");

      const data = {
        agency: parseInt(agencyId),
        category: defaultCategory,
        origin: periodicJobsOrigin,
      };

      const posts = await searchFiles(data);

      return res.status(200).json(mapToFileObjectList(req, posts));
    } else {
      return res
        .status(405)
        .json({ message: "The request does not support method " + req.method });
    }
  }
}

export default withAuthorization(handler);
