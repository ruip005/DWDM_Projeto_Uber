import React, { useEffect, useState } from 'react';
import "./Restaurantes.css";
import RestaurantesList from "./RestaurantesLista";
import axios from 'axios';

export const Restaurantes = () => {
    const [restaurantesList, setRestaurantesList] = useState([]);

    useEffect(() => {
        const url = 'localhost:6969/user/restaurants';
        axios.get(url)
            .then(response => {
                response.json();
                console.log(response)
            })
            .then(data => setRestaurantesList(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            <div className="grid-container">
                {RestaurantesList.map((restaurante) => (
                    <div className="grid-item" key={restaurante.id}>
                        <img className="imagem" src={restaurante.image} alt={restaurante.name} />
                        <p>{restaurante.name}</p>
                    </div>
                ))}
            </div>
        </>
    );
};
