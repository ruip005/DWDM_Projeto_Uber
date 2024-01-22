// Requires etc..
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

// Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Search from "./components/Search";
import { Login } from "./pages/Auth/Login/Login.js";
import { Register } from "./pages/Auth/Register/Register.js";
import { Restaurantes } from "./pages/Restaurantes/Restaurantes.js";
import MyRestaurante from "./pages/MyRestaurante/MyRestaurante.js";
import MyRestauranteEdit from "./pages/MyRestaurante/MyRestauranteEdit/MyRestauranteEdit.js";
import AddNewProduct from "./pages/MyRestaurante/AddNewProduct/AddNewProduct.js";
import Admin from "./pages/Admin/Admin.js";
import CreateRestaurant from "./pages/Admin/CreateRestaurant/Create.js";
import RestaurantesLista from "./pages/Restaurantes/RestaurantesLista.js";
import RestaurantesId from "./pages/Restaurantes/RestaurantesId.js";
import Cart from "./pages/Cart/Cart.js";
import Pedidos from "./pages/Pedidos/Pedidos.js";
import Pendente from "./pages/Pedidos/Pendente.js";
import pedidos from "./pages/Cart/PedidosLista.js";

// Components
const App = () => {
  // Functions
  const [restaurantesLista, setRestaurantesLista] = useState(RestaurantesLista);
  const [cartItems, setCartItems] = useState([]);
  const [PedidosLista, setPedidosLista] = useState(pedidos);

  // Render
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar cartItems={cartItems} />
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
                <Navbar cartItems={cartItems} />
                <div className="container">
                  <About />
                </div>
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/restaurantes"
            element={
              <>
                <Navbar cartItems={cartItems} />
                <div className="container">
                  <Restaurantes />
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/myrestaurant/:restaurantId"
            element={
              <>
                <Navbar cartItems={cartItems} />
                <div className="container">
                  <MyRestaurante />
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/myrestaurant/MyRestauranteEdit"
            element={
              <>
                <Navbar cartItems={cartItems} />
                <div className="container">
                  <MyRestauranteEdit />
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/myrestaurant/:restaurantId/AddNewProduct"
            element={
              <>
                <Navbar cartItems={cartItems} />
                <div className="container">
                  <AddNewProduct />
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/admin"
            element={
              <>
                <Navbar cartItems={cartItems} />
                <div className="container">
                  <Admin
                    PedidosLista={PedidosLista}
                    setPedidosLista={setPedidosLista}
                  />
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/admin/create"
            element={
              <>
                <Navbar cartItems={cartItems} />
                <div className="container">
                  <CreateRestaurant
                    restaurantesLista={restaurantesLista}
                    setRestaurantesLista={setRestaurantesLista}
                  />
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/sobre"
            element={
              <>
                <Navbar cartItems={cartItems} />
                <div className="container">
                  <About />
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/restaurantes/:restaurantId"
            element={
              <>
                <Navbar cartItems={cartItems} />
                <div className="container">
                  <RestaurantesId
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                  />
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <Navbar cartItems={cartItems} />
                <div className="container">
                  <Cart
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    PedidosLista={PedidosLista}
                    setPedidosLista={setPedidosLista}
                  />
                </div>
                <Footer />
              </>
            }
          />

          <Route
            path="/myrestaurant/:restaurantId/Pedidos"
            element={
              <>
                <Navbar cartItems={cartItems} />
                <div className="container">
                  <Pedidos
                    PedidosLista={PedidosLista}
                    setPedidosLista={setPedidosLista}
                  />
                </div>
                <Footer />
              </>
            }
          />

          <Route
            path="/Pedidos/:pedidoId"
            element={
              <>
                <Navbar cartItems={cartItems} />
                <div className="container">
                  <Pendente setPedidosLista={setPedidosLista} />
                </div>
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

// Export
export default App;
