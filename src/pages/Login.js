import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUsername } from "../context/UsernameContext";
import { useCart } from "../context/CartContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const { setCart } = useCart();
  const { saveUsername, setRegisteredUsername } = useUsername();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // // Retrieve the registered username and password from local storage
    const registeredUsername = localStorage.getItem("registeredUsername");
    const registeredPassword = localStorage.getItem("registeredPassword");

    if (
      formData.username === registeredUsername ||
      (saveUsername && formData.password === registeredPassword)
    ) {
      setRegistrationStatus("success"); // Set login success to true

      // Retrieve the cart data from local storage
      const savedCart = localStorage.getItem("store");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // You can set the cart data back in your cart context
        setCart(parsedCart);
      }

      try {
        const response = await fetch("http://localhost:3700/loginData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Send the login data as JSON
        });

        if (response.ok) {
          // The login data was sent successfully to the server
          // You can handle the server response here if needed
          setRegisteredUsername(formData.username);
          localStorage.setItem("registeredUsername", formData.username);
        } else {
          // Handle errors in sending data to the server
          console.error("Failed to send login data to the server");
        }
      } catch (error) {
        console.error("An error occurred while sending login data:", error);
      }
    } else {
      // Login failed
      setErrors({
        username: "Invalid username or password",
        password: "Invalid username or password",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [showPassword, setShowPassword] = useState(false); // State to show/hide password

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="Form">
      {registrationStatus === "success" ? (
        <div className="success-container">
          <div className="success-message">Login successful!</div>
          <button
            className="okay-button"
            onClick={() => {
              setRegistrationStatus(null);
              navigate("/react-deploy");
            }}
          >
            Okay
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="userID">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div className="userID">
            <label>Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <i
              className={`password-toggle-icon ${
                showPassword ? <FaEyeSlash /> : <FaEye />
              }`}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </i>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="userID">
            <button type="submit">Login</button>
            <p className="toRecover">
              <Link to="/password-recovery">Forgot password?</Link>
            </p>
            <p className="toLogin">
              <Link to="/sign-in">Don't have an account? Register</Link>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
