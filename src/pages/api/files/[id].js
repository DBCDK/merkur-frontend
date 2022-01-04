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

      const fileAttributesResponse = await getFileAttributes(fileId);

      if (fileAttributesResponse.status !== 200) {
        log.error(
          `Exception caught in /api/files/${fileId} while calling ${
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
        res
          .status(403)
          .send("Attempt to download file owned by another agency");
      }

      const getFileResponse = await getFile(fileId);

      if (getFileResponse.status !== 200) {
        log.error(
          `Exception caught in /api/files/${fileId} while calling ${
            getFileResponse.url
          }. Got unexpected status code ${
            getFileResponse.status
          }  with message '${await getFileResponse.text()}'`
        );

        res.status(getFileResponse.status).send(getFileResponse.statusText);
      }

      const content = getFileResponse.body;

      res.status(200).send(content);
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
