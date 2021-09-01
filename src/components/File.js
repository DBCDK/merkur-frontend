import React from "react";

export default function File(file) {
  return (
    <tr>
      <td>
        <a href="#" onClick={this.onClick}>
          {file.metadata.name}
        </a>
      </td>
      <td>{file.metadata.agency}</td>
      <td>{formatCreationTime(file.creationTime)}</td>
      <td>{byteSizeToHumanReadableSI(file.byteSize)}</td>
    </tr>
  );

  function formatCreationTime(millisecondsSinceEpoch) {
    return new Date(millisecondsSinceEpoch);
  }

  function byteSizeToHumanReadableSI(bytes) {
    const e = (Math.log(bytes) / Math.log(1e3)) | 0;
    return (
      +(bytes / Math.pow(1e3, e)).toFixed(2) +
      " " +
      ("kMGTPEZY"[e - 1] || "") +
      "B"
    );
  }
}
