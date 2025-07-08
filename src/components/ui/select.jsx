// /components/ui/select.js
import React from "react";
import PropTypes from "prop-types";

const Select = ({ value, onChange, children }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="p-2 border rounded-md bg-white dark:bg-gray-800 dark:border-gray-600"
    >
      {children}
    </select>
  );
};
Select.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Select;
// export default Select;
