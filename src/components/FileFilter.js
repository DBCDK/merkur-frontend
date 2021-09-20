import PropTypes from "prop-types";
import { adminAgency } from "@/constants";

export default function FileFilter({
  agencies,
  setSelectedAgency,
  loginAgency,
}) {
  // Removed undefined value - otherwise a blank option will be shown
  const filtered = agencies.filter((x) => x !== undefined);

  return (
    <div>
      <select
        name="agency_select"
        id="agency_select"
        onChange={(e) => parseInt(setSelectedAgency(e?.target?.value))}
      >
        {loginAgency === adminAgency && (
          <option value="010100" key="010100">
            Alle
          </option>
        )}
        {filtered.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

FileFilter.propTypes = {
  agencies: PropTypes.array.isRequired,
  setSelectedAgency: PropTypes.func.isRequired,
  loginAgency: PropTypes.string.isRequired,
};
