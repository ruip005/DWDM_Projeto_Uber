import React, { useEffect, useState } from "react";
import "./Restaurantes.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export const Restaurantes = () => {
  const { id } = useParams();
  const [restaurantesList, setRestaurantes] = useState([]);
  const [filteredType, setFilteredType] = useState(null);
  const [restaurant, setRestaurant] = useState({}); // Make sure this line is here


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
  
  
  const handleTypeFilter = (type) => {
    setFilteredType(type);
  };

  const resetTypeFilter = () => {
    setFilteredType(null);
  };

  const filteredRestaurants = filteredType
    ? restaurantesList.filter(
        (restaurante) => restaurante.type === filteredType
      )
    : restaurantesList;

    const isRestaurantOpen = () => {
      const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
      const currentHour = new Date().getHours();
      const openHour = parseInt(restaurant.businessHours[today].open, 10);
      const closeHour = parseInt(restaurant.businessHours[today].close, 10);
  
      return currentHour >= openHour && currentHour < closeHour;
    };

  return (
    <>
      <div className="filter-images">
        <img
          className="fastfood"
          src="./fast-food.png"
          alt="fastfood"
          onClick={() => handleTypeFilter("fastfood")}
        />
        <img
          className="pizza"
          src="./pizza.png"
          alt="pizza"
          onClick={() => handleTypeFilter("pizza")}
        />
        <img
          className="sandwich"
          src="./sandwich.png"
          alt="sandwich"
          onClick={() => handleTypeFilter("sandwich")}
        />
        <img
          className="coffee"
          src="./coffee-cup.png"
          alt="coffecup"
          onClick={() => handleTypeFilter("coffee")}
        />
        <img
          className="asia"
          src="./1.png"
          alt="asia"
          onClick={() => handleTypeFilter("asia")}
        />
        <img
          className="ice"
          src="./2.png"
          alt="icecream"
          onClick={() => handleTypeFilter("icecream")}
        />
        <img
          className="pastelaria"
          src="./3.png"
          alt="crossaint"
          onClick={() => handleTypeFilter("pastelaria")}
        />
        {/* Add click handlers for other types as needed */}
<p/>
        <button onClick={resetTypeFilter}>Resetar o Filtro</button>
      </div>

      <div className="grid-container">
        {filteredRestaurants.map((restaurante) => {
          const isCurrentRestaurantOpen = () => {
            const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
            const currentHour = new Date().getHours();
            const openHour = parseInt(restaurante.businessHours[today].open, 10);
            const closeHour = parseInt(restaurante.businessHours[today].close, 10);

            return currentHour >= openHour && currentHour < closeHour;
          };

          const linkTo = `/restaurantes/${restaurante._id}`;
          const isDisabled = !isCurrentRestaurantOpen();

          return (
            <div
              className={`grid-item ${isDisabled ? "closed" : ""}`}
              key={restaurante.id}
            >
              {isDisabled ? (
                <div>
                  <img
                    className="imagem"
                    src={`http://localhost:9000/system/image/${restaurante._id}`}
                    alt={restaurante.campanyName}
                  />
                  <p>{restaurante.campanyName}</p>
                  <p>Closed Now</p>
                </div>
              ) : (
                <Link
                  to={linkTo}
                  key={restaurante.id}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    className="imagem"
                    src={`http://localhost:9000/system/image/${restaurante._id}`}
                    alt={restaurante.campanyName}
                  />
                  <p>{restaurante.campanyName}</p>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};