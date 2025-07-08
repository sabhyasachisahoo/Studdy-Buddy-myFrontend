// /components/ui/avatar.js
import React from "react";
import PropTypes from "prop-types";

const Avatar = ({ src, alt, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-full ${className}`}
    />
  );
};
Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Avatar;
// export default Avatar;
