import { useState } from "react";
import {
  conversionsOrigin,
  defaultCategory,
  periodicJobsOrigin,
} from "@/constants";
import PropTypes from "prop-types";

export const UploadForm = ({ onUpload }) => {
  const [file, setFile] = useState();

  function onClick(event) {
    event.preventDefault();

    if (!file) {
      alert("Ingen fil valgt");
      return;
    }

    const form = event.target.form;

    if (!form.name.value) {
      alert("Filnavn ikke sat");
      return;
    }
    const name = form.name.value;

    if (!form.agency.value) {
      alert("Bibl.nr. ikke sat");
      return;
    }
    const agency = form.agency.value;

    // Regex match - begins with 6 digits and nothing else
    if (!/^\d{1,6}$/.test(agency)) {
      alert(
        "Bibl.nr. har ikke en gyldig værdi. Skal være et tal på seks tegn."
      );
      return;
    }

    const metadata = {
      name: name,
      agency: agency,
      origin: form.origin.value,
      category: defaultCategory,
    };

    onUpload(file, metadata);
  }

  function onFilesChosen({ target }) {
    setFile(target.files[0]);
  }

  return (
    <>
      <h1>Upload</h1>
      <form id="upload-form">
        <div className="form-group">
          <label htmlFor="type_select">Type:</label>
          <select name="origin" id="type_select">
            <option
              id="option_conversion"
              key="option_conversion"
              value={conversionsOrigin}
            >
              Konverteringsservice
            </option>
            <option
              id="option_periodic_job"
              key="option_periodic_job"
              value={periodicJobsOrigin}
            >
              Dataleverancer
            </option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="input_filename">Filnavn:</label>
          <input
            className="form-control"
            id="input_filename"
            key="input_filename"
            name="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="input_agencysdfsdf">Bibl.nr.:</label>
          <input
            className="form-control"
            id="input_agency"
            key="input_agency"
            type="text"
            inputMode="numeric"
            pattern="\d+"
            name="agency"
          />
        </div>
        <div className="form-group">
          <label htmlFor="file-upload">Vælg fil til upload</label>
          <input
            className="form-control-file"
            onChange={onFilesChosen}
            type="file"
            name="file-upload"
          />
        </div>
        <button type="submit" onClick={onClick}>
          Upload
        </button>
      </form>
    </>
  );
};

UploadForm.propTypes = {
  onUpload: PropTypes.func,
};
