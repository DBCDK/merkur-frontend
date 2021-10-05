import React from "react";

const FILESTORE_URL = process.env.FILESTORE_URL || "filestore-url-not-set";

// TODO MS-3593 Merkur v2: Opføgning på fjernelse af upload funktionalitet
export async function addFile(data) {
  return fetch(`${FILESTORE_URL}/files`, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/octet-stream",
    },
  });
}

export async function getFile(fileId) {
  const response = await fetch(`${process.env.FILESTORE_URL}/files/${fileId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.body;
}

export async function getFileAttributes(fileId) {
  const response = await fetch(
    `${process.env.FILESTORE_URL}/files/${fileId}/attributes`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
}

export async function addMetadata(fileId, data) {
  let url = fileId;
  if (!fileId.toString().startsWith(FILESTORE_URL)) {
    url = `${FILESTORE_URL}/files/${fileId}`;
  }
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function searchFiles(data) {
  const response = await fetch(`${FILESTORE_URL}/files`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}
