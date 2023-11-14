import React from "react";

const Rating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={
        index + 1 == rating
          ? "star-filled"
          : "star-empty"
      }
      style={{
        color: index + 1 <= rating ? "orange" : "gray",
      }}
    >
      &#9733; {/* Unicode character for a star */}
    </span>
  ));

  return <div className="rating">{stars}</div>;
};

export default Rating;
