import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Pedidos({ PedidosLista }) {
  // Extracting restaurantId from URL parameters using the useParams hook
  const { restaurantId } = useParams();
  // State to store the list of orders for the specific restaurant
  const [pedidosLista, setPedidosLista] = useState([]);
  // State to store the list of restaurants
  const [restaurantes, setRestaurantes] = useState([]);
  // State to store the list of users
  const [usersList, setUsersList] = useState([]);

  // useEffect to fetch the list of restaurants when the component mounts
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // Get the authentication token from localStorage
        const token = localStorage.getItem("token");
        // API endpoint for fetching the list of restaurants
        const url = "http://localhost:9000/user/restaurants";
        // Sending a GET request to fetch the list of restaurants
        const response = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        const data = response.data.restaurantes;
        // Update the state with the fetched list of restaurants
        setRestaurantes(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    // Calling the fetchRestaurants function when the component mounts
    fetchRestaurants();
  }, []);

  // useEffect to fetch the list of orders for the specific restaurant when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Get the authentication token from localStorage
        const token = localStorage.getItem("token");
        // API endpoint for fetching the list of orders
        const url = `http://localhost:9000/system/order`;
        // Sending a GET request to fetch the list of orders
        const response = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        const data = response.data;
        // If the API request is successful, filter the orders for the specific restaurant
        if (data.success) {
          const filteredOrders = data.orders.filter(
            (order) => order.campanyId === restaurantId
          );
          // Update the state with the filtered list of orders
          setPedidosLista(filteredOrders);
        } else {
          console.error("API request for orders was not successful");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    // Calling the fetchOrders function when the component mounts or when restaurantId changes
    fetchOrders();
  }, [restaurantId]);

  // Function to handle accepting an order
  const handleAccept = async (orderId) => {
    try {
      // Get the authentication token from localStorage
      const token = localStorage.getItem("token");
      // API endpoint for updating the order status to 'Accepted'
      const url = `http://localhost:9000/system/order/${orderId}`;
      // Sending a PATCH request to update the order status
      const response = await axios.patch(
        url,
        { orderStatus: "Accepted" },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = response.data;
      // If the API request is successful, update the state with the modified list of orders
      if (data.success) {
        setPedidosLista(data.orders);
        // Refresh the page to reflect the changes
        window.location.reload();
      } else {
        console.error(
          "API request for updating order status was not successful"
        );
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Function to handle rejecting an order
  const handleReject = async (orderId) => {
    try {
      // Get the authentication token from localStorage
      const token = localStorage.getItem("token");
      // API endpoint for updating the order status to 'Rejeitado'
      const url = `http://localhost:9000/system/order/${orderId}`;
      // Sending a PATCH request to update the order status
      const response = await axios.patch(
        url,
        { orderStatus: "Rejeitado" },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = response.data;
      // If the API request is successful, update the state with the modified list of orders
      if (data.success) {
        setPedidosLista(data.orders);
        // Refresh the page to reflect the changes
        window.location.reload();
      } else {
        console.error(
          "API request for updating order status was not successful"
        );
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // JSX for rendering the component
  return (
    <div>
      {/* Table to display the list of orders */}
      <table className="tableAdmin">
        <thead>
          <tr>
            <th>Items</th>
            <th>Preço Total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping through pedidosLista and displaying each order */}
          {pedidosLista.map((pedido) => (
            <tr key={pedido._id}>
              {/* Displaying order items */}
              <td>
                {pedidosLista && pedidosLista.length > 0
                  ? pedido.orderItems
                      .map((item, index) => `${item.name}(${item.quantity})`)
                      .join(",")
                      .slice(0, 30)
                  : "No items"}
                {pedido.orderItems &&
                pedido.orderItems.length > 0 &&
                pedido.orderItems
                  .map((item, index) => `${item.name}(${item.quantity})`)
                  .join(",").length > 30
                  ? "..."
                  : ""}
              </td>
              {/* Displaying order total price */}
              <td>{pedido.orderTotal + "€"}</td>
              {/* Displaying order status and buttons for actions */}
              <td>
                {pedido.orderStatus === "Pending" ? (
                  <>
                    <button onClick={() => handleAccept(pedido._id)}>
                      Aceitar
                    </button>
                    <button onClick={() => handleReject(pedido._id)}>
                      Rejeitar
                    </button>
                  </>
                ) : (
                  <span>{pedido.orderStatus}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Pedidos;
