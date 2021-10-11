import PropTypes from "prop-types";
import { adminAgency } from "@/constants";

export const FileFilter = ({ agencies, setSelectedAgency, loginAgency }) => {
  const filteredAgencies = () => {
    if (loginAgency === adminAgency) {
      // Removed undefined value - otherwise a blank option will be shown
      return agencies.filter((x) => x !== undefined);
    } else {
      return [loginAgency];
    }
  };

  return (
    <div>
      <select
        name="agency_select"
        id="agency_select"
        onChange={(e) => setSelectedAgency(parseInt(e?.target?.value), 10)}
      >
        {loginAgency === adminAgency && (
          <option value="010100" key="010100">
            Alle
          </option>
        )}
        {filteredAgencies().map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

FileFilter.propTypes = {
  agencies: PropTypes.array.isRequired,
  setSelectedAgency: PropTypes.func.isRequired,
  loginAgency: PropTypes.string.isRequired,
};
