import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { useUsername } from "../context/UsernameContext";

const Home = ({ products }) => {
  const { registeredUsername } = useUsername();
  const [loading, setLoading] = useState(true);
  const [usernameFromLocalStorage, setUsernameFromLocalStorage] = useState("");

  // Load the logged-in user from localStorage
  useEffect(() => {
    const getUserName = localStorage.getItem("registeredUsername");
    if (getUserName) {
      setUsernameFromLocalStorage(getUserName);
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulating a 2-second delay
  }, []);

  return (
    <div className="Home">
      {loading ? (
        <p className="loading-effect"></p>
      ) : (
        <div>
          <div className="greeting" id="userGreeting">
            <p>Hi, {registeredUsername || usernameFromLocalStorage} !</p>
          </div>
          <div className="container">
            <div className="wrapper">
              <marquee className="marquee-speed">
                Buy Your Fresh And Edible Groceries With 25% Off Sales
              </marquee>
            </div>
            {Array.isArray(products) && products.length > 0 ? (
              <Card products={products} />
            ) : (
              <p className="search-alert" style={{ marginTop: "2rem" }}>
                No matching products found.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
