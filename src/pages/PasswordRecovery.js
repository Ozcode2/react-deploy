import React, { useState } from "react";
import "./Form.css";
import { useNavigate, Link } from "react-router-dom";
import CartMessage from "../components/CartMessage";

const PasswordRecovery = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const [recoveryStatus, setRecoveryStatus] = useState(null);
  const [cartMessage, setCartMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Perform email validation as the user types
    if (name === "email") {
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
    }
  };


  const handleRecovery = async (e) => {
    e.preventDefault();

    const getEmail = localStorage.getItem("registeredEmail")
    const getPassword = localStorage.getItem("registeredPassword")
      if (formData.email === getEmail) {
        setCartMessage("your password is " + getPassword)
      }
  };

  return (
    <>
    <CartMessage message={cartMessage} />
    <div className="Form">
      {recoveryStatus === "success" ? (
        <div className="success-container">
          <div className="success-message">Password recovery email sent!</div>
          <button
            className="okay-button"
            onClick={() => {
              setRecoveryStatus(null);
              navigate("/login");
            }}
          >
            Okay
          </button>
        </div>
      ) : (
        <form onSubmit={handleRecovery}>
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
            <button type="submit">Recover Password</button>
            <p className="toLogin">
              <Link to="/login">Remember your password? Login</Link>
            </p>
          </div>
        </form>
      )}
    </div>
    </>
  );
};

export default PasswordRecovery;
