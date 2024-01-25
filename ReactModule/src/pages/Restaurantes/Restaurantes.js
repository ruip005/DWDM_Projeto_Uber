import React, { useEffect, useState } from "react";
import "./Restaurantes.css";
import RestaurantesList from "./RestaurantesLista";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export const Restaurantes = () => {
  const { id } = useParams();
  const [restaurantesList, setRestaurantesList] = useState([]);

  useEffect(() => {
    const url = "https://98a3-89-155-175-148.ngrok-free.app/user/restaurants";
    axios
      .get(url)
      .then((response) => {
        setRestaurantesList(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <img className="fastfood" src="./fast-food.png" alt="fastfood" />
      <img className="pizza" src="./pizza.png" alt="pizza" />
      <img className="sandwich" src="./sandwich.png" alt="sandwich" />
      <img className="coffee" src="./coffee-cup.png" alt="coffecup" />

      <div className="grid-container">
        {RestaurantesList.map((restaurante) => (
          <Link to={restaurante.id} key={restaurante.id}>
            <div
              className="grid-item"
              key={restaurante.id}
              Link
              to={restaurante.id}
            >
              <img
                className="imagem"
                src={restaurante.image}
                alt={restaurante.name}
              />
              <p>{restaurante.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
