// /components/ui/progress.js
import React from "react";
import PropTypes from "prop-types";

const Progress = ({ value, className }) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div
        className="bg-yellow-500 h-2 rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
Progress.propTypes = {
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default Progress;
// export default Progress;
