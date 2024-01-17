import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductsLista from '../ProductsLista';

function AddNewProduct() {
    const Navigate = useNavigate();
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: '',
        image: null,
    });

    function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
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
        getBase64(imageFile).then(base64Image => {
          setNewProduct((prevProduct) => ({
            ...prevProduct,
            image: base64Image,
          }));
        });
      };

    const handleAddProduct = () => {
        if (newProduct.name && newProduct.price && newProduct.description && newProduct.image) {
            const newProductWithId = {
                ...newProduct,
                id: ProductsLista.length + 1,
            };

            ProductsLista.push(newProductWithId);


            setNewProduct({
                name: '',
                price: '',
                description: '',
                image: null,
            });

            Navigate(-1);
        } else {
            alert('Please fill in all fields before adding the product.');
        }
    };


  return (
    <div className="container">
      <div className="MyRestaurante-Name">
        <h1>
          McDonalds
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png"
            className="MyRestaurant-Logo"
            alt="McDonald's Logo"
          />
        </h1>
      </div>
      <div className="AddNewProduct-Form">
        <h2>Adicionar Novo Produto</h2>
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
