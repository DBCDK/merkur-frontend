import { authenticate } from "@/components/api-validator";
import { log } from "dbc-node-logger";
import { adminAgency } from "@/constants";

export default async function handler(req, res) {
  const agencyId = authenticate(req, res);

  if (agencyId !== undefined) {
    if (req.method === "POST") {
      const {
        query: { id: fileId },
      } = req;
      log.info(agencyId + " claiming file with id " + fileId);

      const attributeResponse = await fetch(
        `${process.env.FILESTORE_URL}/files/${fileId}/attributes`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const fileAttributes = await attributeResponse.json();
      const metaData = fileAttributes.metadata;
      const fileAgencyId = metaData.agency;

      if (adminAgency !== agencyId && fileAgencyId !== agencyId) {
        res.status(403).send("Attempt to claim file owned by another agency");
      }

      metaData.claimed = true;

      const response = await fetch(
        `${process.env.FILESTORE_URL}/files/${fileId}`,
        {
          method: "POST",
          body: JSON.stringify(metaData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.status(200).send(response.body);
    } else {
      return res
        .status(405)
        .json({ message: "The request does not support method " + req.method });
    }
  }
}
