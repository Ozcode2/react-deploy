import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import CartMessage from "../components/CartMessage";
import "./Cart.css"

function Cart({ products }) {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartMessage, setCartMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [incrementLoading, setIncrementLoading] = useState(false); // Loading state for increment
  const [decrementLoading, setDecrementLoading] = useState(false); // Loading state for decrement

  // Retrieve the registered username and password from local storage
  const registeredUsername = localStorage.getItem("registeredUsername");
  const registeredPassword = localStorage.getItem("registeredPassword");
  const savedUsername = localStorage.getItem("savedRegisteredUsername");

  useEffect(() => {
    // Simulate a loading delay (you can replace this with an actual API call)
    setTimeout(() => {
      setLoading(false);
    }, 2000); // 4 seconds delay for demonstration purposes
  }, []);

  const handleIncrement = (productId) => {
    if (registeredPassword && registeredUsername && savedUsername) {
      setIncrementLoading({ ...incrementLoading, [productId]: true }); // Set loading state for the item
      addToCart(productId, 1);
      setCartMessage("1 item added to cart");
      setTimeout(() => {
        setIncrementLoading({ ...incrementLoading, [productId]: false }); // Reset loading state
      }, 2000); // You can adjust the delay as needed
    }
  };

  const handleDecrement = (productId) => {
    if (
      cart[productId] > 1 &&
      registeredPassword &&
      registeredUsername &&
      savedUsername
    ) {
      setDecrementLoading({ ...decrementLoading, [productId]: true }); // Set loading state for the item
      addToCart(productId, -1);
      setCartMessage("1 item removed from cart");
      setTimeout(() => {
        setDecrementLoading({ ...decrementLoading, [productId]: false }); // Reset loading state
      }, 2000); // You can adjust the delay as needed
    } else if (registeredPassword && registeredUsername) {
      setDecrementLoading({ decrementLoading, [productId]: true }); // Set loading state for the item
      removeFromCart(productId);
      setCartMessage("item removed from cart");
      setTimeout(() => {
        setDecrementLoading({ ...decrementLoading, [productId]: false }); // Reset loading state
      }, 2000); // You can adjust the delay as needed
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    Object.keys(cart).forEach((productId) => {
      const product = products.find((p) => String(p.id) === productId);
      if (product) {
        const productPrice = parseFloat(product.price.replace(",", ""));
        totalPrice += productPrice * cart[productId];
      }
    });
    return totalPrice;
  };

  const handleCheckout = async () => {
    setLoading(true); // Set loading to true when the checkout button is clicked

    // Simulate a delay to show the loading animation (5 seconds)
    setTimeout(async () => {
      const totalPrice = calculateTotalPrice();
      const formattedTotalPrice = `₦ ${totalPrice.toLocaleString()}`;
      // Create an array of product items with quantity and title
      const productItems = Object.keys(cart).map((productId) => {
        const product = products.find((p) => String(p.id) === productId);
        return {
          id: productId,
          title: product.title,
          quantity: cart[productId],
        };
      });

      const cartData = {
        products: productItems, // Use the modified productItems array
        totalPrice: formattedTotalPrice,
      };

      try {
        // Send a POST request to your JSON server
        const response = await fetch("http://localhost:3800/cartData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartData),
        });

        if (response.ok) {
          const responseData = await response.json();
          setResponseData(responseData);
          setShowSuccessMessage(true); // Show the success message and OK button
        } else {
          console.error("Error:", response.statusText);
          setLoading(false); // Hide the loading animation in case of an error
        }
      } catch (error) {
        console.error("Error:", error);
        setLoading(false); // Hide the loading animation in case of an error
      }
    }, 3000); // 5 seconds delay for demonstration purposes
  };

  const handleOkButtonClick = () => {
    setShowSuccessMessage(false); // Hide the success message and OK button
    setLoading(false);
    // Clear cart data and products displayed
    clearCart({});
  };

  const handleRemoveCart = (productId) => {
    if (
      cart[productId] >= 1 &&
      registeredPassword &&
      registeredUsername &&
      savedUsername
    ) {
      removeFromCart(productId);
      setCartMessage("item removed from cart");
    }
  };

  return (
    <>
      <CartMessage message={cartMessage} />
      <div className="Cart">
        {loading ? (
          <p className="loading-anime"></p>
        ) : Object.keys(cart).length === 0 ? (
          <p className="cart-alert">Your cart is empty.</p>
        ) : (
          <>
            {Object.keys(cart).map((productId) => {
              const product = products.find((p) => String(p.id) === productId);

              return (
                <div key={productId} className="cart-item">
                  <img
                    src={process.env.PUBLIC_URL + product.image}
                    className="image"
                    alt={product.title}
                  />
                  <div>
                    <h3 id="name">{product.title}</h3>
                    <p id="cost">₦{product.price}</p>
                    <p id="cut-off">₦{product.cut}</p>
                    <div className="detail">
                      <button
                        className="cart-minus"
                        onClick={() => handleDecrement(productId)}
                        disabled={decrementLoading[productId]}
                      >
                        {decrementLoading[productId] ? (
                          <div className="loading-display"></div>
                        ) : (
                          <FaMinus />
                        )}
                      </button>
                      <span className="cart-quantity">{cart[productId]}</span>
                      <button
                        className="cart-plus"
                        onClick={() => handleIncrement(productId)}
                        disabled={incrementLoading[productId]}
                      >
                        {incrementLoading[productId] ? (
                          <div className="loading-display"></div>
                        ) : (
                          <FaPlus />
                        )}
                      </button>
                      <span className="cart-detail">{`${cart[productId]} (item(s) added)`}</span>
                      <FaTrash
                        className="trash"
                        onClick={() => handleRemoveCart(productId)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="cart-card">
              <h2>Cart Summary</h2>
              <div className="total">
                Total: ₦ {calculateTotalPrice().toLocaleString("en-US")}{" "}
              </div>
              <button className="checkout-button" onClick={handleCheckout}>
                Checkout (₦ {calculateTotalPrice().toLocaleString("en-US")}){" "}
              </button>
            </div>
          </>
        )}
        {showSuccessMessage && (
          <div className="alert-container">
            <div className="success-alert">
              Successful checkout! Thank you for your order, expect your order
              soon remember that payment is on delivery.
            </div>
            <button className="ok-button" onClick={handleOkButtonClick}>
              Okay
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
