// src/components/FileList.js
import { FileTable } from "@/components/FileTable";
import { FileFilter } from "@/components/FileFilter";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { adminAgency } from "@/constants";
import styles from "./FileList.module.css";

export const FileList = ({ title, files, isLoading, loginAgency }) => {
  // Extra set of unique agencies from the files
  const agencies = useMemo(
    () => [...new Set(files.map((item) => item.metadata.agency))],
    [files],
  );

  const [selectedAgency, setSelectedAgency] = useState(loginAgency);

  const filteredFiles = useMemo(() => {
    // Admin agency - show everything
    if (selectedAgency === adminAgency || selectedAgency === "all") {
      return files;
    }

    const selectedAgencyAsInt = parseInt(selectedAgency, 10);
    return files.filter((item) => item.metadata.agency === selectedAgencyAsInt);
  }, [selectedAgency, files]);

  if (isLoading || !files) {
    return <p>Indlæser data...</p>;
  }

  return (
    <div className={styles.fileList}>
      <div>
        <h3>{title}</h3>
      </div>
      <div>
        <h4>Filer til afhentning</h4>
      </div>
      <div>
        <FileFilter
          agencies={agencies}
          setSelectedAgency={setSelectedAgency}
          loginAgency={loginAgency}
        />
      </div>
      <div>
        <FileTable files={filteredFiles} />
      </div>
    </div>
  );
};

FileList.propTypes = {
  title: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loginAgency: PropTypes.string.isRequired,
};
