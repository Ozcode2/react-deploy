import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App"
import { BrowserRouter as Router } from "react-router-dom";
import { UsernameProvider } from "./context/UsernameContext";
import { CartProvider } from "./context/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <CartProvider>
        <UsernameProvider>
          <App />
        </UsernameProvider>
      </CartProvider>
    </Router>
  </React.StrictMode>
);

