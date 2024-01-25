import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductsLista from "../ProductsLista";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import RestaurantesId from "../../Restaurantes/RestaurantesId";

function AddNewProduct() {
  const { restaurantId } = useParams();
  const Navigate = useNavigate();

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  const [restaurant, setRestaurant] = useState({});

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `http://192.168.1.115:9000/user/restaurants/${restaurantId}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        const data = response.data.restaurante;
        console.log(data);
        setRestaurant(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, [restaurantId]);

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    getBase64(imageFile).then((base64Image) => {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        image: base64Image,
      }));
    });
  };

  /*   const handleAddProduct = () => {
      if (newProduct.name && newProduct.price && newProduct.description && newProduct.image) {
        const newProductWithId = {
          ...newProduct,
          id: ProductsLista.length + 1,
          restaurantId: restaurantId, 
        };

        ProductsLista.push(newProductWithId);

        setNewProduct({
          name: '',
          price: '',
          description: '',
          image: null,
          quantity: 1,
          restaurantId: {restaurantId}, 

        });

        Navigate(-1);
        console.log(ProductsLista);
      } else {
        alert('Please fill in all fields before adding the product.');
      }
    };*/

  const handleAddProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `http://192.168.1.115:9000/restaurant/product/`;

      const response = await axios.post(
        url,
        {
          name: newProduct.name,
          price: newProduct.price,
          description: newProduct.description,
          quantity: "1",
          userId: "teste",
        },
        {
          headers: {
            Authorization: token,
          },
          params: {
            id: restaurantId,
          },
        }
      );

      console.log(response.data);
      Navigate(-1);
    } catch (error) {
      console.error("Error making POST request:", error.message);
      console.log("Request config:", error.config);
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      }
    }
  };

  return (
    <div className="container">
      <div className="MyRestaurante-Name">
        <h1>
          {restaurant.campanyName}
          <img
            src={restaurant.logo}
            className="MyRestaurant-Logo"
            alt={restaurant.name + " Logo"}
          />
        </h1>
      </div>
      <div className="AddNewProduct-Form">
        <h2>Adicionar Novo Produto </h2>
        <form>
          <label>
            Nome do Produto:
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
            />
          </label>
          <p />
          <label>
            Preço:
            <input
              type="text"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
            />
          </label>
          <p />
          <label>
            Descrição:
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
            ></textarea>
          </label>
          <p />
          <label>
            Imagem:
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          <p />
<<<<<<< HEAD

=======
          
>>>>>>> a032e314c5620120528d8f240c502587b495ca1d
          <button type="button" onClick={handleAddProduct}>
            Adicionar Produto
          </button>
          <button type="button" onClick={() => Navigate(-1)}>
            Voltar
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNewProduct;