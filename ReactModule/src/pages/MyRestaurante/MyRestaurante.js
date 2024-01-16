import React, { useState } from 'react';
import './MyRestaurante.css';
import ProductsLista from './ProductsLista';
import { useNavigate } from 'react-router-dom';

export const MyRestaurante = () => {
    const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'];
    const Navigate = useNavigate();
    const abertura = 8;
    const fecho = 20;

    const [openingHours, setOpeningHours] = useState({});

    const handleHoursChange = (day, hours) => {
        setOpeningHours(prevHours => ({
            ...prevHours,
            [day]: hours,
        }));
    };

    return (
        <div className="container">
            <div className="MyRestaurante-Name">
                <h1>McDonalds<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png" className='MyRestaurant-Logo' /></h1>
            </div>
            <div className="MyRestaurante-Info">
                <h3>Working Hours</h3>
                {daysOfWeek.map(day => (
                    <div key={day}>
                        <label style={{ fontWeight: 'bold', padding: '10px' }}>{day}</label>
                        <div>
                            <label>Horas de Abertura:</label>
                            <span className='Horas' style={{marginLeft:'40px'}} >{abertura}</span>
                        </div>
                        <div>
                            <label>Horas de Encerramento:</label>
                            <span  className='Horas'>{fecho}</span>
                        </div>
                    </div>
    ))}
    
</div>
<button onClick={() => Navigate('MyRestauranteEdit')}>Editar</button>

            <div className="MyRestaurante-Products">
                <h3 style={{marginTop:'10px'}}>Produtos</h3>
                <button style={{marginBottom:'10px'}} onClick={() => Navigate('AddNewProduct')}>Adicionar Produto</button>
                {/* Ainda é preciso mudar o css td, este é o do restaurantes */}
                <div className="grid-containerProduto">
                {ProductsLista.map((produto) => (
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
