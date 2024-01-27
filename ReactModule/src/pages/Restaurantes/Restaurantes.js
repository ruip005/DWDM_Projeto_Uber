import React, { useEffect, useState } from "react";
import "./Restaurantes.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export const Restaurantes = () => {
  const { id } = useParams();
  const [RestaurantesList, setRestaurantes] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = "http://localhost:9000/user/restaurants";
        const response = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        const data = response.data.restaurantes;
        setRestaurantes(data);
        console.log("Data received:", data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <>
      <img className="fastfood" src="./fast-food.png" alt="fastfood" />
      <img className="pizza" src="./pizza.png" alt="pizza" />
      <img className="sandwich" src="./sandwich.png" alt="sandwich" />
      <img className="coffee" src="./coffee-cup.png" alt="coffecup" />

      <div className="grid-container">
        {RestaurantesList.map((restaurante) => (
          <Link to={`/restaurantes/${restaurante._id}`} key={restaurante.id}>
            <div
              className="grid-item"
              key={restaurante.id}
              Link
              to={restaurante.id}
            >
              <img
                className="imagem"
                src={`http://localhost:9000/system/image/${restaurante._id}`}
                alt={restaurante.campanyName}
              />
              <p>{restaurante.campanyName}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
