import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateRestaurant({ restaurantesLista, setRestaurantesLista }) {
  const Navigate = useNavigate();
  const [newRestaurant, setNewRestaurant] = useState({
    campanyName: "",
    deliveryFee: 0.0,
    businessHours: {
      Monday: { open: "", close: "" },
      Tuesday: { open: "", close: "" },
      Wednesday: { open: "", close: "" },
      Thursday: { open: "", close: "" },
      Friday: { open: "", close: "" },
      Saturday: { open: "", close: "" },
      Sunday: { open: "", close: "" },
    },
    contactEmail: "",
    contactPhone: "",
    deliversToHome: false,
    Address: "",
    UserId: "",
    closingDays: {},
  });

  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = "http://localhost:9000/admin/users";
        const response = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        const data = response.data.utilizadores;
        setUsersList(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

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
        updatedBusinessHours[day] = { open: "", close: "" };
      }
      return {
        ...prevRestaurant,
        closingDays: updatedClosingDays,
        businessHours: updatedBusinessHours,
      };
    });
  };

  const createRestaurant = async () => {
    for (let day in newRestaurant.businessHours) {
      if (
        !newRestaurant.closingDays[day] &&
        Number(newRestaurant.businessHours[day].open) >=
          Number(newRestaurant.businessHours[day].close)
      ) {
        alert(`Opening hours must be less than closing hours on ${day}`);
        return;
      }
    }

    try {
      const token = localStorage.getItem("token");
      const url = "http://localhost:9000/admin/restaurants";
      const response = await axios.post(
        url,
        {
          campanyName: newRestaurant.campanyName,
          deliveryFee: newRestaurant.deliveryFee,
          businessHours: newRestaurant.businessHours,
          contactEmail: newRestaurant.contactEmail,
          contactPhone: newRestaurant.contactPhone,
          deliversToHome: newRestaurant.deliversToHome,
          Address: newRestaurant.Address,
          userId: newRestaurant.UserId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Verifica se a requisição foi bem-sucedida
      if (response.status === 201) {
        const createdRestaurant = response.data.restaurant;
        const updatedRestaurantList = [...restaurantesLista, createdRestaurant];
        setRestaurantesLista(updatedRestaurantList);

        setNewRestaurant({
          campanyName: "",
          deliveryFee: 0.0,
          businessHours: {
            Monday: { open: "", close: "" },
            Tuesday: { open: "", close: "" },
            Wednesday: { open: "", close: "" },
            Thursday: { open: "", close: "" },
            Friday: { open: "", close: "" },
            Saturday: { open: "", close: "" },
            Sunday: { open: "", close: "" },
          },
          contactEmail: "",
          contactPhone: "",
          deliversToHome: false,
          Address: "",
          UserId: "",
          closingDays: {},
        });

        Navigate("/admin");
      } else {
        // Handle error or display appropriate message
        alert("Failed to create restaurant");
      }
    } catch (error) {
      console.error("Error creating restaurant:", error);
      alert("Failed to create restaurant. Please try again.");
    }
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
                handleBusinessHoursChange(day, "open", e.target.value)
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
                handleBusinessHoursChange(day, "close", e.target.value)
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
        User ID:
        <select
          name="UserId"
          value={newRestaurant.UserId}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Select a user
          </option>
          {usersList.map((user) => (
            <option key={user._id} value={user._id}>
              {user.firstName} {user.lastName}
            </option>
          ))}
        </select>
      </label>
      <p />

      <button onClick={createRestaurant}>Create Restaurant</button>
    </div>
  );
}

export default CreateRestaurant;
