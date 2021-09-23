import React from "react";
import url from "url";
import {
  conversionsOrigin,
  fileClaimedEndpoint,
  fileEndpoint,
  periodicJobsOrigin,
} from "@/constants";

const mapToUtc = (millisecondsSinceEpoch) => {
  return new Date(millisecondsSinceEpoch).toISOString();
};

export function mapToFileObjectList(req, posts) {
  return posts.map((item) => mapToFileObject(req, item));
}

export function mapToFileObject(req, fileAttributes) {
  const file = {
    filename: fileAttributes.metadata.name,
    origin: convertFileOrigin(fileAttributes.metadata.origin),
    creationTimeUTC: mapToUtc(fileAttributes.creationTime),
    byteSize: fileAttributes.byteSize,
    downloadUrl: mapToFileUrl(req, fileAttributes, fileEndpoint),
  };
  if (!fileAttributes.metadata.claimed) {
    file.claimedUrl = mapToFileUrl(req, fileAttributes, fileClaimedEndpoint);
  }
  return file;
}

function mapToFileUrl(req, fileAttributes, path) {
  return url.format({
//    protocol: req.protocol,
    protocol: 'http',
//    host: req.headers.host,
    host: 'merkur-service.metascrum-staging.svc.cloud.dbc.dk',
    pathname: path.replace(":id", fileAttributes.id),
  });
}

function convertFileOrigin(origin) {
  switch (origin) {
    case conversionsOrigin:
      return "conversions";
    case periodicJobsOrigin:
      return "periodic-jobs";
    default:
      return "";
  }
}
