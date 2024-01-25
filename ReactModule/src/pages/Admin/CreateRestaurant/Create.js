import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./create.css";

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
    category: "",
    image: null,
  });

  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
<<<<<<< HEAD
        const url = "http://192.168.1.115:9000/admin/users";
=======
        const url = "http://192.168.1.2:9000/admin/users";
>>>>>>> a032e314c5620120528d8f240c502587b495ca1d
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Lê o arquivo como base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewRestaurant((prevRestaurant) => ({
          ...prevRestaurant,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

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
<<<<<<< HEAD
      const url = "http://192.168.1.115:9000/admin/restaurants";
=======
      const url = "http://192.168.1.2:9000/admin/restaurants";
>>>>>>> a032e314c5620120528d8f240c502587b495ca1d
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
          staffId: newRestaurant.UserId,
          category: newRestaurant.category,
          img: newRestaurant.image,
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
          category: "",
        });
        toast.success("Restaurante criado com sucesso!");
        setTimeout(() => {
          Navigate("/admin");
        }, 4000);
      } else {
        toast.error("Não conseguimos criar o seu restaurante!");
      }
    } catch (error) {
      console.error("Error creating restaurant:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div>
        <div className="border-item">
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
            Select Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
          <p />

          {/* Exibir a imagem */}
          {newRestaurant.image && (
            <img
              src={newRestaurant.image}
              alt="Selected Restaurant Image"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                borderRadius: "200px",
                bordercolor: "black",
              }}
            />
          )}
        </div>
        <div className="border-last-item">
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
          <p></p>
          <br />

          <label>
            Categoria:
            <select
              name="category"
              value={newRestaurant.category}
              onChange={handleInputChange}
            >
              <option value="">Seleciona a categoria</option>
              <option value="pizza">Pizza</option>
              <option value="cafe">Café</option>
              <option value="fastfood">FastFood</option>
              <option value="asiatico">Asiatico</option>
              <option value="sandes">Sandes</option>
              <option value="gelataria">Gelataria</option>
              <option value="pastelaria">Pastelaria</option>
            </select>
          </label>
          <p></p>
          <br />

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
<<<<<<< HEAD
              {usersList.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
          </label>
        </div>
=======
            ))}
          </select>
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
        <p> </p>
>>>>>>> a032e314c5620120528d8f240c502587b495ca1d

        <button onClick={createRestaurant}>Create Restaurant</button>
      </div>
      {/* ToastContainer for displaying notifications */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </>
  );
}

export default CreateRestaurant;
