import React, { useState } from 'react';
import RestaurantesList from '../Restaurantes/RestaurantesLista';
import ProductsLista from '../MyRestaurante/ProductsLista';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import './RestaurantesId.css';

const RestaurantesId = ({cartItems,setCartItems}) => {
    const { restaurantId } = useParams();
    const [warning, setWarning] = useState(false);
    const Navigate = useNavigate();

    const [restaurantInfo, setRestaurantInfo] = useState({
        name: '',
        logo: '',
        workingDays: {},
    });

    useEffect(() => {
        const fetchedRestaurant = RestaurantesList.find(restaurant => restaurant.id === restaurantId);

        if (fetchedRestaurant) {
            setRestaurantInfo({
                name: fetchedRestaurant.name,
                logo: fetchedRestaurant.image,
                workingDays: fetchedRestaurant.workingDays,
            });
        }
    }, [restaurantId]);

    const addToCart = (produto) => {
        const isItemInCart = cartItems.some(item => item.id === produto.id);
        if (isItemInCart) {
           alert('Produto já adicionado ao carrinho');
            return;
        }
        setCartItems([...cartItems, produto]);
    };
    return (
        <div className="container">
            <div className="MyRestaurante-Name">
                <h1>
                    {restaurantInfo.name}
                    <img
                        src={restaurantInfo.logo}
                        className='MyRestaurant-Logo'
                        alt={`${restaurantInfo.name} Logo`}
                    />
                </h1>
            </div>
            <div className="MyRestaurante-Products">
                <h3 style={{ marginTop: '10px' }}>Produtos</h3>
                <div className="grid-containerProduto">
                    {ProductsLista.map((produto) => (
                        <div className="grid-itemProduto" key={produto.id}>
                            <img className="imagemProduto" src={produto.image} alt={produto.name} />
                            <p>{produto.name}</p>
                            <p>{produto.price + '€'}</p>
                            <button onClick={() => addToCart(produto)}>Adicionar</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="ShoppingCart">
                <h3>Shopping Cart</h3>
                <ul>
                    {cartItems.map((item, index) => (   
                        <li key={index}>{item.name}</li>
                    ))}
                </ul>
            </div>
              <button onClick={() => Navigate("/admin")}> aaaaaa</button>
          </div>
    );
};

export default RestaurantesId;
