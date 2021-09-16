import { withAuthorization } from "@/components/api-validator";
import { log } from "dbc-node-logger";
import { adminAgency } from "@/constants";
import { getFile, getFileAttributes } from "@/components/FileStoreConnector";

async function handler(req, res, agencyId) {
  if (agencyId !== undefined) {
    if (req.method === "POST") {
      const {
        query: { id: fileId },
      } = req;
      log.info(agencyId + " claiming file with id " + fileId);

      const fileAttributes = await getFileAttributes(fileId);
      const metaData = fileAttributes.metadata;
      const fileAgencyId = metaData.agency;

      if (adminAgency !== agencyId && fileAgencyId !== agencyId) {
        res.status(403).send("Attempt to claim file owned by another agency");
      }

      metaData.claimed = true;

      const content = await getFile(fileId);

      return res.status(200).send(content);
    } else {
      return res
        .status(405)
        .json({ message: "The request does not support method " + req.method });
    }
  }
}

export default withAuthorization(handler);
