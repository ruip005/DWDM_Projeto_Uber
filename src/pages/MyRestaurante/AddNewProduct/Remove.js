import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Remove = () => {
  const productId = window.location.pathname.split("/").pop();
    const Navigate = useNavigate();
  const [productsLista, setProductsLista] = useState({});

  useEffect(() => {
    console.log("Fetching data for productId: " + productId);
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `http://localhost:9000/restaurant/product/${productId}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        const data = response.data;
        console.log("API Response:", data);
        if (data.success) {
          setProductsLista(data.product); // Assuming the product is nested under the 'product' key
          console.log("Product data set:", data.product);
        } else {
          console.error("API request for products was not successful");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [productId]);

  useEffect(() => {
    console.log("Product data set:", productsLista);
  }, [productsLista]);

  const handleRemover = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `http://localhost:9000/restaurant/product/${productId}`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: token,
        },
      });
      const data = response.data;
      console.log("API Response:", data);
      if (data.success) {
        Navigate(-1);
      } else {
        console.error("API request for products was not successful");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  return (
    <div className="container">
      <div className="MyRestaurante-Name">
        {productsLista.itemName ? (
          <>
            <h1>
              {productsLista.itemName}
              <img
                src={`http://localhost:9000/system/image/${productsLista._id}`}
                className="MyRestaurant-Logo"
                alt="Product Logo"
              />
            </h1>
            <h6>{productsLista.itemPrice}</h6>
            <h6>{productsLista.itemDescription}</h6>
            <button onClick={handleRemover}>Remover</button>
            <button onClick={() => Navigate(-1)}>Voltar</button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Remove;
