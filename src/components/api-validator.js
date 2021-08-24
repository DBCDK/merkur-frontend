import React from "react";
import { log } from "dbc-node-logger";

const apiKeys = JSON.parse(process.env.APIKEYS);

export function authenticate(req, res) {
  if (req.session?.agencyid) {
    log.debug("Authenticating via session");
    return req.session.agencyid;
  }
  log.debug("Authenticating via authorization header");

  res.setHeader("WWW-Authenticate", 'Basic realm="DBC merkur"');
  if (!req.headers.authorization) {
    res.status(401).send("Missing Authorization header");
    return undefined;
  }

  let parts = req.headers.authorization.split(" ");
  if (parts.length !== 2) {
    res
      .status(401)
      .send("Authorization header must include both type and credentials");
    return undefined;
  }

  // verify type
  if (parts[0].toLowerCase() !== "basic") {
    res.status(401).send("Authorization type must be Basic");
    return undefined;
  }

  const encodedCredentials = parts[1];
  const decodedCredentials = Buffer.from(encodedCredentials, "base64").toString(
    "utf8"
  );
  parts = decodedCredentials.split(":");

  if (parts.length !== 2) {
    res.status(401).send("Apikey must include both user and secret");
    return undefined;
  }

  if (apiKeys[parts[0]] && apiKeys[parts[0]]["apikey"] === parts[1]) {
    res.status(200);
    return parts[0];
  }

  res.status(401).send("Unknown agency ID or apikey");
  return undefined;
}
