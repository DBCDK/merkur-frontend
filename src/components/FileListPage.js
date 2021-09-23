import {FileList} from "@/components/FileList";
import {FileFilter} from "@/components/FileFilter";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { adminAgency } from "@/constants";

export const FileListPage = ({ title, files, isLoading, loginAgency }) => {
  if (isLoading || !files) {
    return <p>Indlæser data...</p>;
  }
  // Extra set of unique agencies from the files
  const agencies = [...new Set(files.map((item) => item.metadata.agency))];
  const filteredAgencies = () => {
    if (loginAgency === adminAgency) {
      return agencies;
    } else {
      return [loginAgency];
    }
  };
  const [selectedAgency, setSelectedAgency] = useState(loginAgency);
  const [filteredFiles, setFilteredFiles] = useState([]);

  useEffect(() => {
    // Admin agency - show everything
    if (selectedAgency === adminAgency) {
      setFilteredFiles(files);
    } else {
      const selectedAgencyAsInt = parseInt(selectedAgency, 10);
      setFilteredFiles(
        files.filter((item) => item.metadata.agency === selectedAgencyAsInt)
      );
    }
  }, [selectedAgency]);

  return (
    <>
      <div>
        <h3>{title}</h3>
      </div>
      <div>
        <h6>
          Ses filen ikke? Gå evt. til&nbsp;
          <a
            href="http://dbcposthus.dbc.dk/dataleverancer/index.php"
            target="_blank"
          >
            Det gamle DBC-posthus
          </a>
        </h6>
      </div>
      <div>
        <h4>Filer til afhentning</h4>
      </div>
      <div>
        <FileFilter
          agencies={filteredAgencies()}
          setSelectedAgency={setSelectedAgency}
          loginAgency={loginAgency}
        />
      </div>
      <div>{<FileList files={filteredFiles} />}</div>
    </>
  );
}

FileListPage.propTypes = {
  title: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loginAgency: PropTypes.string.isRequired,
};
