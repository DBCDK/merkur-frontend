import PropTypes from "prop-types";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const BusySpinner = ({ label }) => {
  return (
    <div>
      <FontAwesomeIcon icon={faSpinner} spin />
      &nbsp;{label}
    </div>
  );
};

BusySpinner.propTypes = {
  label: PropTypes.string.isRequired,
};
