import React, { useEffect, useState } from "react";
import "./Restaurantes.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export const Restaurantes = () => {
  // Extracting the 'id' from the URL parameters
  const { id } = useParams();
  // State to hold the list of restaurants
  const [restaurantesList, setRestaurantes] = useState([]);
  // State to handle filtered restaurant types
  const [filteredType, setFilteredType] = useState(null);

  // useEffect hook to fetch the list of restaurants when the component mounts
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // Get the authentication token from localStorage
        const token = localStorage.getItem("token");
        // API endpoint for fetching restaurants
        const url = "http://localhost:9000/user/restaurants";
        // Sending a GET request to fetch restaurant data
        const response = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        // Extracting restaurant data from the response
        const data = response.data.restaurantes;
        // Updating the state with the received restaurant data
        setRestaurantes(data);
        console.log("Data received:", data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    // Calling the fetchRestaurants function when the component mounts
    fetchRestaurants();
  }, []);

  // Function to handle filtering restaurants based on type
  const handleTypeFilter = (type) => {
    setFilteredType(type);
  };

  // Function to reset the restaurant type filter
  const resetTypeFilter = () => {
    setFilteredType(null);
  };

  // Filtering the restaurants based on the selected type
  const filteredRestaurants = filteredType
    ? restaurantesList.filter(
        (restaurante) => restaurante.type === filteredType
      )
    : restaurantesList;

  return (
    <>
      {/* Filter images for different restaurant types */}
      <div className="filter-images">
        <img
          className="fastfood"
          src="./fast-food.png"
          alt="fastfood"
          onClick={() => handleTypeFilter("fastfood")}
        />
        {/* Add similar images and click handlers for other types */}
        <button onClick={resetTypeFilter}>Resetar o Filtro</button>
      </div>

      {/* Grid container to display restaurants */}
      <div className="grid-container">
        {filteredRestaurants.map((restaurante) => (
          // Link to navigate to the specific restaurant details page
          <Link
            to={`/restaurantes/${restaurante._id}`}
            key={restaurante.id}
            style={{ textDecoration: "none" }}
          >
            {/* Individual grid item for each restaurant */}
            <div
              className="grid-item"
              key={restaurante.id}
              Link
              to={restaurante.id}
            >
              {/* Restaurant image */}
              <img
                className="imagem"
                src={`http://localhost:9000/system/image/${restaurante._id}`}
                alt={restaurante.campanyName}
              />
              {/* Restaurant name */}
              <p>{restaurante.campanyName}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
