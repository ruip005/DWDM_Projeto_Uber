import React from 'react';
import { useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { useEffect, } from 'react';
import axios from 'axios';

function MyRestauranteEdit() {
    const { restaurantId } = useParams();
    const Navigate = useNavigate();
    const [newRestaurant, setRestaurant] = useState({});

    const handleBusinessHoursChange = (day, type, value) => {
        setRestaurant((prevRestaurant) => {
          const updatedHours = { ...prevRestaurant.businessHours };
          updatedHours[day][type] = value;
          return { ...prevRestaurant, businessHours: updatedHours };
        });
      };
       const handleCheckboxChange = (day) => {
    setRestaurant((prevRestaurant) => {
      const updatedClosingDays = { ...prevRestaurant.closingDays };
      updatedClosingDays[day] = !updatedClosingDays[day];
      const updatedBusinessHours = { ...prevRestaurant.businessHours };
      if (updatedClosingDays[day]) {
        updatedBusinessHours[day] = { open: "", close: "" };
      }
      return {
        ...prevRestaurant,
        closingDays: updatedClosingDays,
        businessHours: updatedBusinessHours,
      };
    });};


    const handleEditar = async () => {

        try {
            const token = localStorage.getItem("token");
            const url = `http://localhost:9000/admin/restaurants/${restaurantId}`;
            const response = await axios.put(url, newRestaurant, {
                headers: {
                    Authorization: token,
                },
            });
            const data = response.data.restaurante;
            setRestaurant(data);
        } catch (error) {
            console.error("Error fetching restaurants:", error);
        }
    }
    
    

    useEffect(() => {
        const fetchRestaurants = async () => {
          try {
            const token = localStorage.getItem("token");
            const url = `http://localhost:9000/user/restaurants/${restaurantId}`;
            const response = await axios.get(url, {
              headers: {
                Authorization: token,
              },
            });
            const data = response.data.restaurante;
            setRestaurant(data || {});
          } catch (error) {
            console.error("Error fetching restaurants:", error);
          }
        };
    
        fetchRestaurants();
      }, [restaurantId]);

    return (
        <div className="container">
        <div className="MyRestaurante-Name">
            <h1>{newRestaurant.campanyName}<img src={newRestaurant.img} className='MyRestaurant-Logo' /></h1>
        </div>
        <div className="MyRestaurante-Info">
             <h3>Working Hours</h3>
             {Object.keys(newRestaurant.businessHours || {}).map((day) => (
  <div key={day}>
    <label>
      {day}:
      <input
        type="number"
        min="0"
        max="24"
        value={(newRestaurant.businessHours && newRestaurant.businessHours[day]?.open) || ''}
        onChange={(e) =>
          handleBusinessHoursChange(day, 'open', e.target.value)
        }
        placeholder="Open"
        disabled={newRestaurant.closingDays && newRestaurant.closingDays[day]}
      />
      <input
        type="number"
        min="0"
        max="24"
        value={(newRestaurant.businessHours && newRestaurant.businessHours[day]?.close) || ''}
        onChange={(e) =>
          handleBusinessHoursChange(day, 'close', e.target.value)
        }
        placeholder="Close"
        disabled={newRestaurant.closingDays && newRestaurant.closingDays[day]}
      />
      <label>
        Closing Day:
        <input
          type="checkbox"
          onChange={() => handleCheckboxChange(day)}
          checked={
            newRestaurant.businessHours[day]?.open === '' &&
            newRestaurant.businessHours[day]?.close === ''
          }
        />
      </label>
    </label>
  </div>
))}


</div>
<button onClick={handleEditar}>Editar</button>
<p/>    
<button onClick={() => Navigate(-1)}>Voltar</button>
    </div>
    );
}


export default MyRestauranteEdit;
