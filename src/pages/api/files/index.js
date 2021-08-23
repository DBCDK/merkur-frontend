import {defaultCategory} from "@/constants";
import {log} from "dbc-node-logger";
import {authenticate} from "@/components/api-validator";
import {mapToFileObjectList} from "@/components/file-helper";


export default async function handler(req, res) {
    const FILESTORE_URL = `${process.env.FILESTORE_URL}/files`;
    const agencyId = authenticate(req, res);

    if (agencyId !== undefined) {
        if (req.method === "GET") {
            log.info(agencyId + " getting files");

            const data = {
                "agencyId": agencyId,
                "category": defaultCategory
            }
            const response = await fetch(FILESTORE_URL, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const posts = await response.json();

            return res.status(response.status).json(mapToFileObjectList(req, posts));
        } else {
            return res
                .status(405)
                .json({message: "The request does not support method " + req.method});
        }
    }
}
