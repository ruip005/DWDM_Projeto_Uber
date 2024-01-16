import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddNewProduct() {
    const Navigate = useNavigate(); 
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: '',
        image: null, // Store the selected image file
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            image: imageFile,
        }));
    };

    const handleAddProduct = () => {
        // Implement your logic to add the new product
        console.log('New Product:', newProduct);
        // You can reset the form or perform other actions after adding the product
    };

    return (
        <div className="container">
            <div className="MyRestaurante-Name">
                <h1>McDonalds<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png" className='MyRestaurant-Logo' alt="McDonald's Logo" /></h1>
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
                    <p/>
                    <label>
                        Preço:
                        <input
                            type="text"
                            name="price"
                            value={newProduct.price}
                            onChange={handleInputChange}
                        />
                    </label>
                    <p/>
                    <label>
                        Descrição:
                        <textarea
                            name="description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                        ></textarea>
                    </label>
                    <p/>
                    <label>
                        Imagem:
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </label>
                    <p/>
                    <button type="button" onClick={handleAddProduct}>
                        Adicionar Produto
                    </button>
                    <button type='button' onClick={() => Navigate(-1)}>Voltar</button>
                </form>
            </div>
        </div>
    );
}

export default AddNewProduct;
