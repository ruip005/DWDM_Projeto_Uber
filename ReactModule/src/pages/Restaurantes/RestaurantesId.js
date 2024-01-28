import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./RestaurantesId.css";

const RestaurantesId = ({ cartItems, setCartItems }) => {
  // Estado para armazenar a lista de produtos do restaurante
  const [productsLista, setProductsLista] = useState([]);

  // Obter o ID do restaurante a partir dos parâmetros da URL
  const { restaurantId } = useParams();

  // Utilizar o hook de navegação do React Router
  const Navigate = useNavigate();

  // Estado para armazenar informações sobre o restaurante
  const [restaurant, setRestaurant] = useState({});

  // Efeito useEffect para buscar os produtos e informações do restaurante ao carregar o componente
  useEffect(() => {
    // Função assíncrona para buscar os produtos do restaurante
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

    // Função assíncrona para buscar as informações do restaurante
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

    // Chamar as funções de busca
    fetchProducts();
    fetchRestaurants();
  }, [restaurantId]);

  // Função para adicionar um produto ao carrinho
  const addToCart = (produto) => {
    const isItemInCart = cartItems.some((item) => item._id === produto._id);
    if (isItemInCart) {
      alert("Produto já adicionado ao carrinho");
      return;
    }
    setCartItems([...cartItems, produto]);
    console.log(cartItems);
  };

  // Componente de renderização
  return (
    <div className="container">
      <div className="MyRestaurante-Name">
        <h1 className="titulo_restaurante">
          {/* Nome do restaurante e exibição do logo */}
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
          {/* Mapear e exibir a lista de produtos */}
          {productsLista.map((produto) => (
            <div className="grid-itemProduto" key={produto._id}>
              <img
                className="imagemProduto"
                src={`http://localhost:9000/system/image/${produto._id}`}
                alt={produto.itemName}
              />
              <p>{produto.itemName}</p>
              <p>{produto.itemPrice + "€"}</p>
              {/* Botão para adicionar o produto ao carrinho */}
              <button onClick={() => addToCart(produto)}>Adicionar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantesId;
