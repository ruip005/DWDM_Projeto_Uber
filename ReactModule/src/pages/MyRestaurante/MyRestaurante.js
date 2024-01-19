import React, { useState, useEffect } from 'react';
import './MyRestaurante.css';
import ProductsLista from './ProductsLista';
import { useNavigate, useParams } from 'react-router-dom';
import RestaurantesList from '../Restaurantes/RestaurantesLista';

const MyRestaurante = () => {
    const { restaurantId } = useParams();
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
                <button onClick={() => Navigate('Pedidos')}>Pedidos</button>
            </div>
            <div className="MyRestaurante-Info">
                <h3>Working Hours</h3>
                {Object.keys(restaurantInfo.workingDays).map(day => (
                    <div key={day}>
                        <label style={{ fontWeight: 'bold', padding: '10px' }}>{day}</label>
                        <div>
                            <label>Horas de Abertura:</label>
                            <span className='Horas' style={{ marginLeft: '40px' }}>{restaurantInfo.workingDays[day].openingHours}</span>
                        </div>
                        <div>
                            <label>Horas de Encerramento:</label>
                            <span className='Horas'>{restaurantInfo.workingDays[day].closingHours}</span>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => Navigate('MyRestauranteEdit')}>Editar</button>
            <div className="MyRestaurante-Products">
                <h3 style={{ marginTop: '10px' }}>Produtos</h3>
                <button style={{ marginBottom: '10px' }} onClick={() => Navigate('AddNewProduct')}>Adicionar Produto</button>
                <div className="grid-containerProduto">
                 {ProductsLista.filter(produto => produto.restaurantId === restaurantId).map((produto) => (
                     <div className="grid-itemProduto" key={produto.id}>
                          <img className="imagemProduto" src={produto.image} alt={produto.name} />
                          <p>{produto.name}</p>
                   <p>{produto.price +'€'}</p>
                    </div>
             ))}
                </div>
            </div>
        </div>
    );
}

export default MyRestaurante;
