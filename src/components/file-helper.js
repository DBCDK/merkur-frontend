import React from "react";
import url from "url";

const mapToUtc = (millisecondsSinceEpoch) => {
    return new Date(millisecondsSinceEpoch).toISOString();
};

export function mapToFileObjectList(request, posts) {
    return posts.map(item => mapToFileObject(request, item))
}

export function mapToFileObject(request, fileAttributes) {
    const file = {
        'filename': fileAttributes.metadata.name,
        'origin': convertFileOrigin(fileAttributes.metadata.origin),
        'creationTimeUTC': mapToUtc(fileAttributes.creationTime),
        'byteSize': fileAttributes.byteSize,
        'downloadUrl': mapToFileUrl(request, fileAttributes, constants.fileEndpoint),
    };

    if (!fileAttributes.metadata.claimed) {
        file.claimedUrl = mapToFileUrl(request, fileAttributes, constants.fileClaimedEndpoint);
    }

    return file;
}

export function mapToFileUrl(request, fileAttributes, path) {
    return url.format({
        protocol: request.protocol,
        host: request.get('host'),
        pathname: path.replace(':id', fileAttributes.id)
    });
}

export function convertFileOrigin(origin) {
    switch (origin) {
        case constants.conversionsOrigin:
            return "conversions";
        case constants.periodicJobsOrigin:
            return "periodic-jobs";
        default:
            return "";
    }
}
