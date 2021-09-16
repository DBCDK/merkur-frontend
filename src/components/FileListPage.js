import FileList from "@/components/FileList";
import FileFilter from "@/components/FileFilter";
import PropTypes from "prop-types";

export function FileListPage({ title, files, isLoading }) {
  if (isLoading || !files) {
    return <p>Indlæser data...</p>;
  }
  // Extra set of unique agencies from the files
  const agencies = [...new Set(files.map((item) => item.metadata.agency))];

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
        <FileFilter agencies={agencies} />
      </div>
      <div>{<FileList files={files} />}</div>
    </>
  );
}

FileListPage.propTypes = {
  title: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
