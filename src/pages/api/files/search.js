import { log } from "dbc-node-logger";
import { authenticate } from "@/components/api-validator";
import { adminAgency, conversionsOrigin, defaultCategory } from "@/constants";
import { mapToFileObjectList } from "@/components/file-helper";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  let agencyId = undefined;

  const session = await getSession({ req: req });
  if (!session) {
    agencyId = authenticate(req, res);
  } else {
    agencyId = session.user.netpunktAgency;
  }

  if (agencyId !== undefined) {
    if (req.method === "GET") {
      log.info(agencyId + " getting files");

      const data = {
        category: defaultCategory,
        origin: conversionsOrigin,
      };

      if (agencyId !== adminAgency) {
        data.agency = agencyId;
      }

      const response = await fetch(`${process.env.FILESTORE_URL}/files`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const posts = await response.json();

      return res.status(response.status).json(mapToFileObjectList(req, posts));
    } else {
      return res
        .status(405)
        .json({ message: "The request does not support method " + req.method });
    }
  }
}
