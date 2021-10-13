import React from "react";
import styles from "./File.module.css";

export const File = (file) => {
  return (
    <tr key={file.id} className={styles.tr}>
      <td key={"td_href_" + file.id}>
        <a href={"/api/files/" + file.id} download={file.metadata.name}>
          {file.metadata.name}
        </a>
      </td>
      <td key={"td_agency_" + file.id}>{file.metadata.agency}</td>
      <td key={"td_date_" + file.id}>
        {formatCreationTime(file.creationTime)}
      </td>
      <td key={"td_size_" + file.id}>
        {byteSizeToHumanReadableSI(file.byteSize)}
      </td>
    </tr>
  );

  function formatCreationTime(dateString) {
    return new Date(dateString).toLocaleString("da-DK");
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
};
