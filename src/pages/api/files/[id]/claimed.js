import {authenticate} from "@/components/api-validator";
import {log} from "dbc-node-logger";
import {adminAgency} from "@/constants";

export default async function handler(req, res) {
    const agencyId = authenticate(req, res);

    if (agencyId !== undefined) {
        if (req.method === "POST") {
            log.info(agencyId + " claiming file with id " + req.params.id);

            const fileId = req.params.id;
            const params = {
                "id": id
            }
            const attributeResponse = await fetch(`${process.env.FILESTORE_URL}/files/${fileId}/attributes`, {
                method: "GET",
                body: JSON.stringify(params),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const fileAttributes = await attributeResponse.json();
            const fileAgencyId = fileAttributes.metadata.agency;

            if (adminAgency !== agencyId && fileAgencyId !== agencyId) {
                res.status(403).send("Attempt to claim file owned by another agency");
            }

            fileAttributes.metadata.claimed = true;

            const response = await fetch(`${process.env.FILESTORE_URL}/files/${fileId}`, {
                method: "POST",
                body: JSON.stringify(fileAttributes),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            return res.status(200).send(response.body);
        } else {
            return res
                .status(405)
                .json({message: "The request does not support method " + req.method});
        }
    }
}
