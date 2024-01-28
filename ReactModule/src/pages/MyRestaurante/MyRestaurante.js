import React, { useState, useEffect } from "react";
import "./MyRestaurante.css";
import ProductsLista from "./ProductsLista";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const MyRestaurante = () => {
  const [productsLista, setProductsLista] = useState([]);
  const { restaurantId } = useParams();
  const Navigate = useNavigate();
  const [restaurant, setRestaurant] = useState({});

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `http://localhost:9000/restaurants/${restaurantId}/boxes`;
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
  fetchProducts();
}, [restaurantId]);


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

  useEffect(() => {
    console.log(restaurantId);
    console.log(restaurant);
  }, [restaurant]);

  return (
    <div className="container">
      <div className="MyRestaurante-Name">
        <h1>
          {restaurant.campanyName}
          <img
            src={`http://localhost:9000/system/image/${restaurant._id}`}
            className="MyRestaurant-Logo"
            alt={`${restaurant.campanyName} Logo`}
          />
        </h1>
        <button onClick={() => Navigate("Pedidos")}>Pedidos</button>
      </div>
      <br />
      <div className="MyRestaurante-Info">
        <div>
          <h3 className="titulo">Working Hours</h3>
          {restaurant.businessHours &&
            Object.keys(restaurant.businessHours).map((day) => (
              <div className="label-item" key={day}>
              <label style={{ fontWeight: "bold", padding: "10px" }}>{day}</label>
              {restaurant.businessHours[day].open === restaurant.businessHours[day].close ? (
                <div className="closedHours">
                  <label>Status:</label>
                  <span className="Horas">FECHADO</span>
                </div>
              ) : (
                <div>
                  <label>Horas de Abertura:</label>
                  <span className="Horas" style={{ marginLeft: "40px" }}>
                    {restaurant.businessHours[day].open + ":00h"}
                  </span>
                  <div>
                    <label>Horas de Encerramento:</label>
                    <span className="Horas">
                      {restaurant.businessHours[day].close + ":00h"}
                    </span>
                  </div>
                </div>
              )}
            </div>
            ))}
        </div>
      </div>
      <button onClick={() => Navigate("MyRestauranteEdit")}>Editar</button>
      <div className="MyRestaurante-Products">
        <button
          style={{ marginBottom: "10px" }}
          onClick={() => Navigate("AddNewProduct")}
        >
          Adicionar Produto
        </button>
        <h3 className="Produtos_h3">Produtos</h3>
        <div className="grid-containerProduto">
          {productsLista
            .filter((produto) => produto.restaurantId === restaurantId)
            .map((produto) => (
              <div className="grid-itemProduto" key={produto.id}>
                <img
                  className="imagemProduto"
                  src={produto.image}
                  alt={produto.name}
                />
                <p>{produto.name}</p>
                <p>{produto.price + "€"}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyRestaurante;
