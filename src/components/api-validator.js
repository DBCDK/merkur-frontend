import React from "react";
import { log } from "dbc-node-logger";
import { getSession } from "next-auth/client";

const apiKeys = JSON.parse(process.env.APIKEYS);

export function withSession(callback) {
  return async function checkSession(req, res) {
    const session = await getSession({ req });

    if (session) {
      callback(req, res, session.user.netpunktAgency);
    } else {
      res
        .status(403)
        .send("Authentication with Apikey is forbidden for this endpoint");
      return undefined;
    }
  };
}

export function withAuthorization(callback) {
  return async function checkAuthorization(req, res) {
    let agencyId;
    const session = await getSession({ req });

    if (!session) {
      agencyId = authenticate(req, res);
    } else {
      agencyId = session.user.netpunktAgency;
    }

    return callback(req, res, agencyId);
  };
}

function authenticate(req, res) {
  log.debug("Authenticating via authorization header");
  const clientIp = req.headers["x-real-ip"] || req.connection.remoteAddress
  // TODO Log the path so we can see which endpoint was called
  res.setHeader("WWW-Authenticate", 'Basic realm="DBC merkur"');
  if (!req.headers.authorization) {
    log.error(`Authorization failed from remote address '${clientIp}' - No Authorization header - returning 401 with WWW-Authenticate header (might not be an error)`);
    res.status(401).send("Missing Authorization header");
    return undefined;
  }

  let parts = req.headers.authorization.split(" ");
  if (parts.length !== 2) {
    log.error(`Authorization failed from remote address '${clientIp}' - Authorization header has wrong format`);
    res
      .status(401)
      .send("Authorization header must include both type and credentials");
    return undefined;
  }

  // verify type
  if (parts[0].toLowerCase() !== "basic") {
    log.error(`Authorization failed from remote address '${clientIp}' - Authorization type is not basic`);
    res.status(401).send("Authorization type must be Basic");
    return undefined;
  }

  const encodedCredentials = parts[1];
  const decodedCredentials = Buffer.from(encodedCredentials, "base64").toString(
    "utf8"
  );
  parts = decodedCredentials.split(":");

  if (parts.length !== 2) {
    log.error(`Authorization failed from remote address '${clientIp}' - Apikey is missing either user or secret`);
    res.status(401).send("Apikey must include both user and secret");
    return undefined;
  }

  if (apiKeys[parts[0]] && apiKeys[parts[0]]["apikey"] === parts[1]) {
    res.status(200);
    return parts[0];
  }

  log.error(`Authorization failed from remote address '${clientIp}' - Unknown agency ID or apikey: '${parts[0]}'`);
  res.status(401).send("Unknown agency ID or apikey");
  return undefined;
}
