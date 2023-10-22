import { Link } from "react-router-dom";
import { useState } from "react";
import { FaCartPlus, FaUser, FaHome, FaInfo } from "react-icons/fa";
import { useCart } from "../context/CartContext"; // Import useCart from your CartContext file
import { useUsername } from "../context/UsernameContext";

const Nav = ({ search, setSearch }) => {
  const { cart, clearCart } = useCart(); // Use the cart context
  const { clearUsername } = useUsername();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Calculate the total quantity of all products in the cart
  const totalQuantity = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.setItem("store", JSON.stringify(cart));
    // Clear the cart and username when logging out
    clearCart({});
    clearUsername();
  };

  return (
    <nav className="Nav">
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search Products</label>
        <input
          id="search"
          type="text"
          placeholder="Search Products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <ul>
        <li>
          <Link to="/" title="Home">
            <FaHome className="icon" />
            Home
          </Link>
        </li>
        <li
          className="account-dropdown"
          onClick={toggleDropdown}
          onBlur={() => setDropdownVisible(false)}
        >
          <FaUser className="icon" />
          Account
          {dropdownVisible && (
            <ul className="dropdown-content">
              <li>
                <a id="register" href="/sign-in" title="Register">
                  Register
                </a>
              </li>
              <li>
                <a id="login" href="/login" title="Login">
                  Login
                </a>
              </li>
              <li>
                <a
                  id="logout"
                  href="/"
                  onClick={handleLogout}
                  title="Logout"
                >
                  Logout
                </a>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/about" title="About">
            <FaInfo className="icon" />
            About
          </Link>
        </li>
        <li>
          <Link to="/cart" title="Cart">
            <div className="cart-icon-container">
              <FaCartPlus className="icon" id="trolley" />
              Cart
              {totalQuantity > 0 && (
                <span className="cart-quantity-badge">{totalQuantity}</span>
              )}
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
