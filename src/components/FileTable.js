import { File } from "./File";

export const FileTable = ({ files }) => {
  if (!files) {
    return <p>Waiting for data</p>;
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr key="tr">
            <th key="th_filename">Filnavn</th>
            <th key="th_agency">Bibl.nr</th>
            <th key="th_date">Dato</th>
            <th key="th_size">Størrelse</th>
          </tr>
        </thead>
        <tbody>{files.map((file) => File(file))}</tbody>
      </table>
    </>
  );
};
