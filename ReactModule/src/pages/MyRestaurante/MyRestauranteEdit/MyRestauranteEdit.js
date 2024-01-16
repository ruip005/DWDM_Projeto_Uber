import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MyRestauranteEdit() {
    const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'];
   
    const Navigate = useNavigate();

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
                  <label style={{fontWeight:'bold',padding:'10px'}}>{day}</label>
                        <div>
                     <label>Horas de Abertura‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ </label>
                        <input
                type="text"
                value={openingHours[day]?.opening || ''}
                onChange={(e) => handleHoursChange(day, { ...openingHours[day], opening: e.target.value })}
               
            />
        </div>
        <div>
            <label>Horas de Encerramento</label>
            <input
                type="text"
                value={openingHours[day]?.closing || ''}
                onChange={(e) => handleHoursChange(day, { ...openingHours[day], closing: e.target.value })}
                
            />
        </div>
    </div>
))}

</div>
<button>Salvar</button>
<p/>    
<button onClick={() => Navigate(-1)}>Voltar</button>
    </div>
    );
}

export default MyRestauranteEdit;
