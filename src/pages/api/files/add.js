import {log} from "dbc-node-logger";
import {withAuthorization} from "@/components/api-validator";
import {addFile} from "@/components/FileStoreConnector";

async function handler(req, res, agencyId) {
    if (agencyId !== undefined) {
        if (req.method === "POST") {
            log.info(agencyId + " uploading file");
          const headers = req.headers;

          if (!('content-type' in headers) || headers['content-type'] !=='application/octet-stream' ) {
            return res
                .status(415)
                .json({ message: "Content-type must be application/octet-stream"});
          }

          const data = req.body;
          const response = await addFile(data);

          if (response.status !== 201) {
              return res.status(response.status).json({message: "Unexpected status code"})
          }
          const location = response.headers.get('location');

          return res.status(200).json({ location: location});
        }
    }
}

export default withAuthorization(handler);
