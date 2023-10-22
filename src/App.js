import React from "react";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import RegistrationForm from "./pages/RegistrationForm";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import PasswordRecovery from "./pages/PasswordRecovery";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./api/products";
import "./pages/Cart.css";

function App() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filteredResults = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [products, search]);

  // Add a class to the body element when the user is on the Cart page
  useEffect(() => {
    if (location.pathname === "/cart") {
      document.body.classList.add("CartPage");
    } else {
      document.body.classList.remove("CartPage");
    }
  }, [location.pathname]);

  return (
    <div className="App">
      <Header title="Zenith wal-mart" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home products={searchResults} />}
        ></Route>
        <Route exact path="/sign-in" element={<RegistrationForm />}></Route>
        <Route
          path="/product/:id"
          element={<ProductDetails products={products} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
        <Route path="/cart" element={<Cart products={products} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
