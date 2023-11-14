import React, { useEffect, useState } from "react";

function CartMessage({ message }) {
  const [displayStyle, setDisplayStyle] = useState("none");

  useEffect(() => {
    if (message) {
      setDisplayStyle("block");
      setTimeout(() => {
        setDisplayStyle("none");
      }, 5000); // Hide the message after 3 seconds
    }
  }, [message]);

  const cartMessageStyle = {
    display: displayStyle, // Set the display style based on the state
  };

  const closeMessage = () => {
    setDisplayStyle("none");
  };

  return (
    <div className="cart-message-container" style={cartMessageStyle}>
      <div className="cart-message">
        {message}
      </div>
      <button type="button" className="close" aria-label="Close" onClick={closeMessage}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

export default CartMessage;

