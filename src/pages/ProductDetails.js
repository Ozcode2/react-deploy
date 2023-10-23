import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaCartPlus, FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import CartMessage from "../components/CartMessage";

function ProductDetail({ products }) {
  const { id } = useParams();
  const product = products.find((product) => String(product.id) === id);

  const { cart, addToCart, removeFromCart } = useCart();
  const initialQuantity = cart[id] || 1;

  const [cartOpen, setCartOpen] = useState(false);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [loading, setLoading] = useState(false); // Initialize loading as false
  const [cartMessage, setCartMessage] = useState("");

  const [incrementLoading, setIncrementLoading] = useState(false); // Loading state for increment
  const [decrementLoading, setDecrementLoading] = useState(false); // Loading state for decrement

  const registeredUsername = localStorage.getItem("registeredUsername");
  const registeredPassword = localStorage.getItem("registeredPassword");
  const savedUsername = localStorage.getItem("savedRegisteredUsername");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  const handleIncrement = () => {
    if (registeredPassword && registeredUsername && savedUsername) {
      setIncrementLoading(true); // Set loading to true when increment is clicked
      addToCart(id, 1);
      setTimeout(() => {
        setIncrementLoading(false); // Set loading to false after some delay
        setQuantity(quantity + 1);
        setCartMessage("1 item added to cart");
      }, 2000); // Simulate a delay of 1 second (you can adjust this)
    }
  };

  const handleDecrement = () => {
    if (
      quantity > 1 &&
      registeredPassword &&
      registeredUsername &&
      savedUsername
    ) {
      setDecrementLoading(true); // Set loading to true when decrement is clicked
      addToCart(id, -1);
      setTimeout(() => {
        setDecrementLoading(false); // Set loading to false after some delay
        setQuantity(quantity - 1);
        setCartMessage("1 item removed from cart");
      }, 2000); // Simulate a delay of 1 second (you can adjust this)
    } else if (registeredPassword && registeredUsername && savedUsername) {
      setCartOpen(false);
      removeFromCart(id);
      setCartMessage("item removed from cart");
    }
  };

  useEffect(() => {
    setQuantity(cart[id] || 0);
  }, [cart, id]);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="pro-section">
      <CartMessage message={cartMessage} />
      <section key={id} className="details-section">
        <img
          src={process.env.PUBLIC_URL + product.image}
          className="image"
          alt=""
        ></img>
        <div>
          <h3 id="name">{product.title}</h3>
          <p id="cost">₦{product.price}</p>
          <p id="cut-off">₦{product.cut}</p>
          {loading && cartOpen ? (
            <div className="loading-animation"></div>
          ) : cartOpen ? (
            <div className="cart-button">
              <button
                className="cart-minus"
                onClick={handleDecrement}
                disabled={decrementLoading}
              >
                {decrementLoading ? (
                  <div className="loading-display"></div>
                ) : (
                  <FaMinus />
                )}
              </button>
              <span className="cart-quantity">{quantity}</span>
              <button
                className="cart-plus"
                onClick={handleIncrement}
                disabled={incrementLoading}
              >
                {incrementLoading ? (
                  <div className="loading-display"></div>
                ) : (
                  <FaPlus />
                )}
              </button>
              <span className="cart-detail">{`${quantity} (item(s) added)`}</span>
            </div>
          ) : (
            <button className="cart-button" onClick={() => setCartOpen(true)}>
              <FaCartPlus className="cart" />
              Add To Cart
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
