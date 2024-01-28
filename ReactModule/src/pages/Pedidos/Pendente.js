import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Pendente = () => {
  // Extracting pedidoId from the URL parameters
  const { pedidoId } = useParams();
  // State to store pedidoInfo (information about the specific pedido/order)
  const [pedidoInfo, setPedidoInfo] = useState({});
  // useNavigate hook to navigate programmatically
  const Navigate = useNavigate();
  // State to store the list of orders (assuming it's needed for updating status)
  const [pedidosLista, setPedidosLista] = useState([]);

  // useEffect to fetch order details when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Get the authentication token from localStorage
        const token = localStorage.getItem("token");
        // API endpoint for fetching order details based on pedidoId
        const url = `http://localhost:9000/system/orders/${pedidoId}`;
        // Sending a GET request to fetch order details
        const response = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        const data = response.data;
        // If the API request is successful, update the state with order details
        if (data.success) {
          setPedidoInfo(data.order);
        } else {
          console.error("API request for order details was not successful");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    // Calling the fetchOrders function when the component mounts
    fetchOrders();
  }, [pedidoId]);

  // Function to handle accepting the order
  const handleAccept = () => {
    // Assuming pedidoInfo is the current pedido based on pedidoId
    // Update the status of the pedido to 'Aceite'
    const updatedPedidosLista = pedidosLista.map((pedido) =>
      pedido.id === pedidoId ? { ...pedido, status: "Aceite" } : pedido
    );

    // Update the state with the modified list of orders
    setPedidosLista(updatedPedidosLista);
    console.log(updatedPedidosLista);

    // Navigate back to the previous page
    Navigate(-1);
  };

  return (
    <div>
      {/* Displaying order details */}
      <h1>Detalhes do pedido</h1>
      <h3>Restaurante: {pedidoInfo.restaurant}</h3>
      <h3>Cliente: {pedidoInfo.user}</h3>
      <h3>Items</h3>
      <ul>
        {/* Mapping through pedidoInfo.items and displaying each item */}
        {pedidoInfo.items &&
          pedidoInfo.items.map((item) => (
            <li key={item.name}>
              {item.name} - {item.quantity}
            </li>
          ))}
      </ul>
      <h3>Preço Total {pedidoInfo.total_price}€</h3>
      <h3>Estado: {pedidoInfo.status}</h3>

      {/* Buttons to accept and reject the order */}
      <button onClick={() => handleAccept()}>Aceitar</button>
      <button>Recusar</button>
    </div>
  );
};

export default Pendente;
