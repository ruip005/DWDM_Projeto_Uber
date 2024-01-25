import React, { useState, useEffect } from "react";
import "./Admin.css";
import RestaurantesList from "../Restaurantes/RestaurantesLista";
import CreateRestaurant from "./CreateRestaurant/Create";
import { useNavigate, Link } from "react-router-dom";
import pedidos from "../Cart/PedidosLista";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Admin({ PedidosLista }) {
  const [selectedTable, setSelectedTable] = useState("");
  const [restaurantes, setRestaurantes] = useState([]);
  const Navigate = useNavigate();
  const [usersList, setUsersList] = useState([]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = "http://192.168.1.115:9000/admin/users";
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

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = "http://192.168.1.115:9000/user/restaurants";
        const response = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        const data = response.data.restaurantes; // Access 'restaurantes' property
        setRestaurantes(data);
        const url2 = "http://192.168.1.115:9000/system/image";
        const response2 = await axios.get(url2, {
          headers: {
            Authorization: token,
          },
        });
        const data2 = response2.data.image;
        console.log(data2);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleRestaurantClick = (restaurantId) => {
    Navigate(`/myrestaurant/${restaurantId}`);
  };

  const [users, setUsers] = useState([usersList]);

  useEffect(() => {
    console.log(usersList);
  });

  useEffect(() => {
    const updateRestaurantes = (updatedList) => {
      setRestaurantes(updatedList);
    };
  }, []);

  return (
    <div>
      <h1>Admin Page</h1>
      <button
        onClick={() => {
          setSelectedTable("Restaurantes");
          //  getRestaurants();
        }}
      >
        Restaurantes
      </button>
      <button onClick={() => setSelectedTable("Pedidos")}>Pedidos</button>
      <button onClick={() => setSelectedTable("Users")}>Users</button>

      {selectedTable === "Restaurantes" && (
        <div>
          <Link to="./create">
            <button>Criar Restaurante</button>
          </Link>
          <table className="tableAdmin">
            <thead>
              <tr className="grid-container-admin">
                <th className="grid-item-admin ">Nome</th>
                <th className="grid-item-admin"> Ícone</th>
              </tr>
            </thead>
            <tbody>
              {restaurantes.map((restaurante) => (
                <tr key={restaurante._id}>
                  <td onClick={() => handleRestaurantClick(restaurante._id)}>
                    {restaurante.campanyName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedTable === "Pedidos" && (
        <table className="tableAdmin">
          <thead>
            <tr>
              <th>User</th>
              <p className="espaco"></p>
              <th>Restaurant</th>
              <p className="espaco"></p>
              <th>Items</th>
              <p className="espaco"></p>
              <th>Preço </th>
              <p className="espaco"></p>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {PedidosLista.map((pedido) => (
              <tr key={pedido.id}>
                <td className="pedido_user">{pedido.user}</td>
                <td>{pedido.restaurant}</td>
                <p></p>
                <td>
                  {pedido.items
                    .map((item, index) => `${item.name}(${item.quantity})`)
                    .join(",")
                    .slice(0, 30)}
                  {pedido.items
                    .map((item, index) => `${item.name}(${item.quantity})`)
                    .join(",").length > 30
                    ? "..."
                    : ""}
                </td>
                <p></p>
                <td>{pedido.total_price + "€"}</td>
                <p></p>
                <td>{pedido.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedTable === "Users" && (
        <table className="tableAdmin">
          <thead>
            <tr className="topicsAdmin">
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Admin;
