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

      const fileAttributesResponse = await getFileAttributes(fileId);

      if (fileAttributesResponse.status !== 200) {
        log.error(
          `Exception caught in /api/files/${fileId}/claimed while calling ${
            fileAttributesResponse.url
          }. Got unexpected status code ${
            fileAttributesResponse.status
          }  with message '${await fileAttributesResponse.text()}'`
        );

        res
          .status(fileAttributesResponse.status)
          .send(fileAttributesResponse.statusText);
      }

      const fileAttributes = await fileAttributesResponse.json();
      const metaData = fileAttributes.metadata;
      const fileAgencyId = metaData.agency;

      if (adminAgency !== agencyId && fileAgencyId.toString() !== agencyId) {
        res.status(403).send("Attempt to claim file owned by another agency");
      }

      metaData.claimed = true;

      const addMetadataResponse = await addMetadata(fileId, metaData);

      if (addMetadataResponse.status !== 200) {
        log.error(
          `Exception caught in /api/files/${fileId}/claimed while calling ${
            addMetadataResponse.url
          }. Got unexpected status code ${
            addMetadataResponse.status
          }  with message '${await addMetadataResponse.text()}'`
        );

        res
          .status(addMetadataResponse.status)
          .send(addMetadataResponse.statusText);
      }

      res.status(200).end(); //End without any body
    } else {
      res
        .status(405)
        .json({ message: "The request does not support method " + req.method });
    }
  } else {
    res.status(400).json({ message: "Agency is missing" });
  }
}

export default withAuthorization(handler);
