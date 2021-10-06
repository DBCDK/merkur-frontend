import { withAuthorization } from "@/components/api-validator";
import { log } from "dbc-node-logger";
import { adminAgency } from "@/constants";
import {
  addMetadata,
  getFileAttributes,
} from "@/components/FileStoreConnector";

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

      if (adminAgency !== agencyId && fileAgencyId.toString() !== agencyId) {
        return res
          .status(403)
          .send("Attempt to claim file owned by another agency");
      }

      metaData.claimed = true;

      await addMetadata(fileId, metaData);

      return res.status(200).end(); //End without any body
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
