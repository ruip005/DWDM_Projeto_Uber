import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateRestaurant({ restaurantesLista, setRestaurantesLista }) {
  const Navigate = useNavigate();
  const [newRestaurant, setNewRestaurant] = useState({
    campanyName: '',
    deliveryFee: 0.0,
    businessHours: {
      Monday: { open: '', close: '' },
      Tuesday: { open: '', close: '' },
      Wednesday: { open: '', close: '' },
      Thursday: { open: '', close: '' },
      Friday: { open: '', close: '' },
      Saturday: { open: '', close: '' },
      Sunday: { open: '', close: '' },
    },
    contactEmail: '',
    contactPhone: '',
    deliversToHome: false,
    Address: '',
    UserId: '',
    closingDays: {},
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRestaurant((prevRestaurant) => ({
      ...prevRestaurant,
      [name]: value,
    }));
  };

  const handleBusinessHoursChange = (day, type, value) => {
    setNewRestaurant((prevRestaurant) => {
      const updatedHours = { ...prevRestaurant.businessHours };
      updatedHours[day][type] = value;
      return { ...prevRestaurant, businessHours: updatedHours };
    });
  };

  const handleCheckboxChange = (day) => {
    setNewRestaurant((prevRestaurant) => {
      const updatedClosingDays = { ...prevRestaurant.closingDays };
      updatedClosingDays[day] = !updatedClosingDays[day];
      const updatedBusinessHours = { ...prevRestaurant.businessHours };
      if (updatedClosingDays[day]) {
        updatedBusinessHours[day] = { open: '', close: '' };
      }
      return {
        ...prevRestaurant,
        closingDays: updatedClosingDays,
        businessHours: updatedBusinessHours,
      };
    });
  };

  const createRestaurant = () => {
    for (let day in newRestaurant.businessHours) {
      if (
        !newRestaurant.closingDays[day] &&
        Number(newRestaurant.businessHours[day].open) >=
          Number(newRestaurant.businessHours[day].close)
      ) {
        alert(
          `Opening hours must be less than closing hours on ${day}`
        );
        return;
      }
    }

    const updatedRestaurantList = [...restaurantesLista, newRestaurant];
    setRestaurantesLista(updatedRestaurantList); // Update the restaurant list in the parent component

    // Reset form fields
    setNewRestaurant({
      campanyName: '',
      deliveryFee: 0.0,
      businessHours: {
        Monday: { open: '', close: '' },
        Tuesday: { open: '', close: '' },
        Wednesday: { open: '', close: '' },
        Thursday: { open: '', close: '' },
        Friday: { open: '', close: '' },
        Saturday: { open: '', close: '' },
        Sunday: { open: '', close: '' },
      },
      contactEmail: '',
      contactPhone: '',
      deliversToHome: false,
      Address: '',
      UserId: '',
      closingDays: {},
    });

    Navigate('/admin');

    console.log(updatedRestaurantList);
    console.log(newRestaurant);
    console.log(restaurantesLista);
    console.log(restaurantesLista);
  };

  return (
    <div>
      <label>
        Company Name:
        <input
          type="text"
          name="campanyName"
          value={newRestaurant.campanyName}
          onChange={handleInputChange}
        />
      </label>
      <p />

      <label>
        Delivery Fee:
        <input
          type="number"
          name="deliveryFee"
          value={newRestaurant.deliveryFee}
          onChange={handleInputChange}
        />
      </label>
      <p />

      {/* Input fields for business hours */}
      {Object.keys(newRestaurant.businessHours).map((day) => (
        <div key={day}>
          <label>
            {day}:
            <input
              type="number"
              min="0"
              max="24"
              value={newRestaurant.businessHours[day].open}
              onChange={(e) =>
                handleBusinessHoursChange(day, 'open', e.target.value)
              }
              placeholder="Open"
              disabled={newRestaurant.closingDays[day]}
            />
            <input
              type="number"
              min="0"
              max="24"
              value={newRestaurant.businessHours[day].close}
              onChange={(e) =>
                handleBusinessHoursChange(day, 'close', e.target.value)
              }
              placeholder="Close"
              disabled={newRestaurant.closingDays[day]}
            />
            <label>
              Closing Day:
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(day)}
              />
            </label>
          </label>
        </div>
      ))}

      <label>
        Contact Email:
        <input
          type="email"
          name="contactEmail"
          value={newRestaurant.contactEmail}
          onChange={handleInputChange}
        />
      </label>
      <p />

      <label>
        Contact Phone:
        <input
          type="text"
          name="contactPhone"
          value={newRestaurant.contactPhone}
          onChange={handleInputChange}
        />
      </label>
      <p />

      <label>
        Delivers to Home:
        <input
          type="checkbox"
          name="deliversToHome"
          checked={newRestaurant.deliversToHome}
          onChange={() =>
            setNewRestaurant((prevRestaurant) => ({
              ...prevRestaurant,
              deliversToHome: !prevRestaurant.deliversToHome,
            }))
          }
        />
      </label>
      <p />

      <label>
        Address:
        <input
          type="text"
          name="Address"
          value={newRestaurant.Address}
          onChange={handleInputChange}
        />
      </label>
      <p />

      <label>
        User ID:
        <input
          type="text"
          name="UserId"
          value={newRestaurant.UserId}
          onChange={handleInputChange}
        />
      </label>
      <p />

      <button onClick={createRestaurant}>Create Restaurant</button>
    </div>
  );
}

export default CreateRestaurant;
