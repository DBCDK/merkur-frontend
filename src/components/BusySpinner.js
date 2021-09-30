import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";

export const BusySpinner = ({ label }) => {
  return (
    <div>
      <Spinner animation="border" role="status" /> {label}
    </div>
  );
};

BusySpinner.propTypes = {
  label: PropTypes.string.isRequired,
};
