import React from "react";
import PropTypes from "prop-types";
// import "./src/FlipCard.css";

const FlipCard = ({ frontImage, backText }) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        {/* Front (Image Side) */}
        <div className="flip-card-front">
          <img src={frontImage} alt="Front" className="card-image" />
        </div>

        {/* Back (Text Side) */}
        <div className="flip-card-back">
          <p className="card-text">{backText}</p>
        </div>
      </div>
    </div>
  );
};

FlipCard.propTypes = {
  frontImage: PropTypes.string.isRequired,
  backText: PropTypes.string.isRequired,
};

export default FlipCard;
