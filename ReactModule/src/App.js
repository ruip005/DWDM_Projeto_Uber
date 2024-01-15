// Requires etc..
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";


// Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Search from "./components/Search";
import {Login} from "./pages/Login,Register/Login/Login.js";
import {Register} from "./pages/Login,Register/Register/Register.js";
import { Restaurantes } from "./pages/Restaurantes/Restaurantes.js";


// Components
const App = () => {
  // Functions


  // Render
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Search />
                <div className="container">
                  <Home />
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <div className="container">
                  <About />
                </div>
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restaurantes" element={
              <>
                <Navbar />
                <div className="container">
                  <Restaurantes/>
                </div>
                <Footer />
              </>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

// Export
export default App;
