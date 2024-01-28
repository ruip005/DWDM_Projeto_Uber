import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./RestaurantesId.css";

const RestaurantesId = ({ cartItems, setCartItems }) => {
  const [productsLista, setProductsLista] = useState([]);
  const { restaurantId } = useParams();
  const Navigate = useNavigate();
  const [restaurant, setRestaurant] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `http://localhost:9000/restaurant/products/${restaurantId}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        const data = response.data;
        if (data.success) {
          setProductsLista(data.products);
        } else {
          console.error("API request for products was not successful");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

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

    fetchProducts();
    fetchRestaurants();
  }, [restaurantId]);

  const addToCart = (produto) => {
    const isItemInCart = cartItems.some((item) => item._id === produto._id);
    if (isItemInCart) {
      alert("Produto já adicionado ao carrinho");
      return;
    }
    setCartItems([...cartItems, produto]);
    console.log(cartItems)
  };

  return (
    <div className="container">
      <div className="MyRestaurante-Name">
        <h1 className="titulo_restaurante">
          {restaurant.campanyName}
          <img
            src={`http://localhost:9000/system/image/${restaurant._id}`}
            className="MyRestaurant-Logo"
            alt={`${restaurant.campanyName} Logo`}
          />
        </h1>
      </div>
      <div className="MyRestaurante-Products">
        <h3 style={{ marginTop: "10px" }}>Produtos</h3>
        <div className="grid-containerProduto">
          {productsLista.map((produto) => (
            <div className="grid-itemProduto" key={produto._id}>
              <img
                className="imagemProduto"
                src={produto.image}
                alt={produto.itemName}
              />
              <p>{produto.itemName}</p>
              <p>{produto.itemPrice + "€"}</p>
              <button onClick={() => addToCart(produto)}>Adicionar</button>
            </div>
          ))}
        </div>
      </div>
     
    </div>
  );
};

export default RestaurantesId;
