import React, { useState } from "react";
import "./Form.css";
import { useNavigate } from "react-router-dom";
import { useUsername } from "../context/UsernameContext";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const RegistrationForm = () => {
  const { setRegisteredUsername } = useUsername();
  const { clearCart } = useCart(); // Use the cart context
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Perform validation as the user types
    if (name === "username") {
      if (value.length < 6) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: "Username must be at least 6 characters long.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: "",
        }));
      }
    } else if (name === "address") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          address: "Address is required.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          address: "",
        }));
      }
    } else if (name === "email") {
      if (!value.includes("@") || !value.includes(".com")) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email must contain '@' and end with '.com'.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "",
        }));
      }
    } else if (name === "password") {
      if (value.length < 8) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password must be at least 8 characters long.",
        }));
      } else if (
        !/[a-zA-Z]/.test(value) ||
        !/\d/.test(value) ||
        !/[^a-zA-Z\d]/.test(value)
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password:
            "Password must contain at least one letter, one number, and one special character.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add password confirmation validation here
    if (formData.password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match.",
      }));
      return;
    }

    // Create an object containing the form data
    const userData = {
      username: formData.username,
      address: formData.address,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    try {
      // Send a POST request to your JSON server
      const response = await fetch("http://localhost:3500/formData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Data sent successfully
        setRegistrationStatus("success");
        // Save the registered username in localStorage
        var getUsername = localStorage.setItem("registeredUsername", formData.username);
        localStorage.setItem("savedRegisteredUsername", getUsername);

        localStorage.setItem("registeredPassword", formData.password);
        localStorage.setItem("registeredEmail", formData.email);
        clearCart({});
        setRegisteredUsername(formData.username);
      } else {
        // Handle error here
        setRegistrationStatus("error");
        console.error("Error sending user data to the server.");
      }
    } catch (error) {
      setRegistrationStatus("error");
      console.error("Error:", error);
    }
  };

  const [showPassword, setShowPassword] = useState(false); // State to show/hide password

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [displayPassword, setDisplayPassword] = useState(false); // State to show/hide password

  const togglePasswordDisplay = () => {
    setDisplayPassword((prevDisplayPassword) => !prevDisplayPassword);
  };


  return (
    <div className="Form">
      {registrationStatus === "success" ? (
        <div className="success-container">
          <div className="success-message">Registration successful!</div>
          <button
            className="okay-button"
            onClick={() => {
              setRegistrationStatus(null);
              navigate(`/?username=${formData.username}`);
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
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            {errors.address && <p className="error">{errors.address}</p>}
          </div>
          <div className="userID">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
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
            <label>Confirm Password:</label>
            <input
              type={displayPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <i
              className={`password-toggle-icon ${
                displayPassword ? <FaEyeSlash /> : <FaEye />
              }`}
              onClick={togglePasswordDisplay}
            >
              {displayPassword ? <FaEye /> : <FaEyeSlash />}
            </i>
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
          </div>
          <div className="userID">
            <button type="submit">Register</button>
            <p className="toLogin">
              <Link to="/login">Already have an account? Login</Link>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;
