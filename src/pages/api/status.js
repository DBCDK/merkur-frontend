import { log } from "dbc-node-logger";

async function handler(req, res) {
  log.info("/status");
  return res.status(200).json({ message: "ok" });
}

export default handler;
