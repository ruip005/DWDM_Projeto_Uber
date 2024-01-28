import React, { useState, useEffect } from "react";
import "./MyRestaurante.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const MyRestaurante = () => {
  // State to store the list of products
  const [productsLista, setProductsLista] = useState([]);
  // Extracting restaurantId from URL parameters using the useParams hook
  const { restaurantId } = useParams();
  // Hook to navigate between pages
  const Navigate = useNavigate();
  // State to store the details of the restaurant
  const [restaurant, setRestaurant] = useState({});

  // useEffect to fetch products and restaurant details when the component mounts or when restaurantId changes
  useEffect(() => {
    // Function to fetch products
    const fetchProducts = async () => {
      try {
        // Get the authentication token from localStorage
        const token = localStorage.getItem("token");
        // API endpoint for fetching the list of products for the restaurant
        const url = `http://localhost:9000/restaurant/products/${restaurantId}`;
        // Sending a GET request to fetch the products
        const response = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        const data = response.data;
        // If the API request is successful, update the state with the list of products
        if (data.success) {
          setProductsLista(data.products);
        } else {
          console.error("API request for products was not successful");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Function to fetch restaurant details
    const fetchRestaurants = async () => {
      try {
        // Get the authentication token from localStorage
        const token = localStorage.getItem("token");
        // API endpoint for fetching the details of the restaurant
        const url = `http://localhost:9000/user/restaurants/${restaurantId}`;
        // Sending a GET request to fetch the restaurant details
        const response = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        const data = response.data.restaurante;
        // Update the state with the fetched restaurant details
        setRestaurant(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    // Call the fetchProducts and fetchRestaurants functions
    fetchProducts();
    fetchRestaurants();
  }, [restaurantId]);

  // JSX for rendering the component
  return (
    <div className="container">
      {/* Displaying restaurant name and logo */}
      <div className="MyRestaurante-Name">
        <h1>
          {restaurant.campanyName}
          <img
            src={`http://localhost:9000/system/image/${restaurant._id}`}
            className="MyRestaurant-Logo"
            alt={`${restaurant.campanyName} Logo`}
          />
        </h1>
        {/* Button to navigate to the "Pedidos" page */}
        <button onClick={() => Navigate("Pedidos")}>Pedidos</button>
      </div>
      <br />
      {/* Displaying working hours information */}
      <div className="MyRestaurante-Info">
        <div>
          <h3 className="titulo">Working Hours</h3>
          {/* Mapping through business hours and displaying information for each day */}
          {restaurant.businessHours &&
            Object.keys(restaurant.businessHours).map((day) => (
              <div className="label-item" key={day}>
                <label style={{ fontWeight: "bold", padding: "10px" }}>
                  {day}
                </label>
                {/* Checking if the restaurant is open or closed on the specified day */}
                {restaurant.businessHours[day].open ===
                restaurant.businessHours[day].close ? (
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
      {/* Button to navigate to the "MyRestauranteEdit" page for editing */}
      <button onClick={() => Navigate("MyRestauranteEdit")}>Editar</button>
      {/* Displaying the list of products */}
      <div className="MyRestaurante-Products">
        {/* Button to navigate to the "AddNewProduct" page */}
        <button
          style={{ marginBottom: "10px" }}
          onClick={() => Navigate("AddNewProduct")}
        >
          Adicionar Produto
        </button>
        <h3 className="Produtos_h3">Produtos</h3>
        {/* Mapping through the list of products and displaying product information */}
        <div className="grid-containerProduto">
          {productsLista.map((produto) => (
            <Link to={`/myrestaurant/edit/${produto._id}`} key={produto._id}>
              <div className="grid-itemProduto">
                <img
                  className="imagemProduto"
                  src={`http://localhost:9000/system/image/${produto._id}`}
                  alt={produto.itemName}
                />
                <p>{produto.itemName}</p>
                <p>{produto.itemPrice + "€"}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyRestaurante;
