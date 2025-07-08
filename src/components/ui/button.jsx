// /components/ui/button.js
import React from "react";
import PropTypes from "prop-types";

const Button = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Button;
// export default Button;
