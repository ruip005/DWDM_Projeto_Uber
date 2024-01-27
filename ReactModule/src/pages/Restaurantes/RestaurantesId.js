import React, { useState, useEffect } from "react";
import RestaurantesList from "../Restaurantes/RestaurantesLista";
import ProductsLista from "../MyRestaurante/ProductsLista";
import { useNavigate, useParams } from "react-router-dom";
import "./RestaurantesId.css";
import axios from "axios";

const RestaurantesId = ({ cartItems, setCartItems }) => {
  const { restaurantId } = useParams();
  const Navigate = useNavigate();
  const [restaurant, setRestaurant] = useState({});


  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `http://localhost:9000/user/restaurants/${restaurantId}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        const data = response.data.restaurante;
        setRestaurant(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, [restaurantId]);

  const filteredProducts = ProductsLista.filter(
    (produto) => produto.restaurantId === restaurantId
  );

  const addToCart = (produto) => {
    const isItemInCart = cartItems.some((item) => item.id === produto.id);
    if (isItemInCart) {
      alert("Produto já adicionado ao carrinho");
      return;
    }
    setCartItems([...cartItems, produto]);
  };

  return (
    <div className="container">
      <div className="MyRestaurante-Name">
        <h1 className="titulo_restaurante">
          {restaurant.campanyName}
          <img
            src={restaurant.logo}
            className="MyRestaurant-Logo"
            alt={`${restaurant.campanyName} Logo`}
          />
        </h1>
      </div>
      <div className="MyRestaurante-Products">
        <h3 style={{ marginTop: "10px" }}>Produtos</h3>
        <div className="grid-containerProduto">
          {filteredProducts.map((produto) => (
            <div className="grid-itemProduto" key={produto.id}>
              <img
                className="imagemProduto"
                src={produto.image}
                alt={produto.name}
              />
              <p>{produto.name}</p>
              <p>{produto.price + "€"}</p>
              <button onClick={() => addToCart(produto)}>Adicionar</button>
            </div>
          ))}
        </div>
      </div>
      <div className="ShoppingCart">
        <h3>Shopping Cart</h3>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
      <button onClick={() => Navigate("/admin")}> aaaaaa</button>
    </div>
  );
};

export default RestaurantesId;
