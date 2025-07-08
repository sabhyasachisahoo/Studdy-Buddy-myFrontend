// /components/ui/card.js
import React from "react";
import PropTypes from "prop-types";

const Card = ({ className, children }) => {
  return (
    <div className={`bg-white shadow-lg rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
};
Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Card;
// export default Card;
