import { log } from "dbc-node-logger";
import { adminAgency } from "@/constants";
import { withAuthorization } from "@/components/api-validator";
import { getFile, getFileAttributes } from "@/components/FileStoreConnector";

async function handler(req, res, agencyId) {
  if (agencyId !== undefined) {
    if (req.method === "GET") {
      const {
        query: { id: fileId },
      } = req;
      log.info(agencyId + " getting file with id " + fileId);

      const fileAttributes = await getFileAttributes(fileId);
      const fileAgencyId = fileAttributes.metadata.agency;

      if (adminAgency !== agencyId && fileAgencyId !== parseInt(agencyId)) {
        return res
          .status(403)
          .send("Attempt to download file owned by another agency");
      }

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
