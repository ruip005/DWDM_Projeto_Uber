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
import MyRestaurante from "./pages/MyRestaurante/MyRestaurante.js";
import MyRestauranteEdit from "./pages/MyRestaurante/MyRestauranteEdit/MyRestauranteEdit.js";
import AddNewProduct from "./pages/MyRestaurante/AddNewProduct/AddNewProduct.js";
import Admin from "./pages/Admin/Admin.js";
import CreateRestaurant from "./pages/Admin/CreateRestaurant/Create.js";


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
              <Route path="/myrestaurant/:restaurantId" element={
              <>
                <Navbar />
                <div className="container">
                  <MyRestaurante/>
                </div>
                <Footer />
              </>} />
              <Route path="/myrestaurant/MyRestauranteEdit" element={
              <>
                <Navbar />
                <div className="container">
                  <MyRestauranteEdit/>
                </div>
                <Footer />
              </>} />
              <Route path="/myrestaurant/AddNewProduct" element={
              <>
                <Navbar />
                <div className="container">
                  <AddNewProduct/>
                </div>
                <Footer />
              </>} />
              <Route path="/admin" element={
              <>
                <Navbar />
                <div className="container">
                  <Admin/>
                </div>
                <Footer />
              </>} />
              <Route path="/admin/create" element={
              <>
                <Navbar />
                <div className="container">
                <CreateRestaurant/>

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
