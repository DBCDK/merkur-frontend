const FILESTORE_URL = process.env.FILESTORE_URL || "filestore-url-not-set";

export async function getFile(fileId) {
  return fetch(`${process.env.FILESTORE_URL}/files/${fileId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function getFileAttributes(fileId) {
  return fetch(`${process.env.FILESTORE_URL}/files/${fileId}/attributes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
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
  return fetch(`${FILESTORE_URL}/files`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
