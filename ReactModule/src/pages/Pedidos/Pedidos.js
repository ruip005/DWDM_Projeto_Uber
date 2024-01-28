import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Pedidos({ PedidosLista }) {
  const { restaurantId } = useParams();
  const [pedidosLista, setPedidosLista] = useState([]);
  const [restaurantes, setRestaurantes] = useState([]);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = "http://localhost:9000/user/restaurants";
        const response = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        const data = response.data.restaurantes;
        setRestaurantes(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `http://localhost:9000/system/order`;
        const response = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        const data = response.data;
        if (data.success) {
          const filteredOrders = data.orders.filter(order => order.campanyId === restaurantId);
          setPedidosLista(filteredOrders);
        } else {
          console.error("API request for orders was not successful");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [restaurantId]);

  const handleAccept = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const url = `http://localhost:9000/system/order/${orderId}`;
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
      if (data.success) {
        setPedidosLista(data.orders);
        window.location.reload(); 

      } else {
        console.error("API request for updating order status was not successful");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  

  const handleReject = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const url = `http://localhost:9000/system/order/${orderId}`;
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
      if (data.success) {
        setPedidosLista(data.orders);
        window.location.reload(); // Refresh the page

      } else {
        console.error("API request for updating order status was not successful");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div>
      <table className='tableAdmin'>
        <thead>
          <tr>
            <th>Items</th>
            <th>Preço Total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {pedidosLista.map((pedido) => (
            <tr key={pedido._id}>
              <td>
              {pedidosLista && pedidosLista.length > 0 ? (
                  pedido.orderItems.map((item, index) => (
                    `${item.name}(${item.quantity})`
                  )).join(',').slice(0, 30)
                ) : (
                  'No items'
                )}
                {pedido.orderItems && pedido.orderItems.length > 0 && pedido.orderItems.map((item, index) => (
                  `${item.name}(${item.quantity})`
                )).join(',').length > 30 ? '...' : ''}
              </td>
              <td>{pedido.orderTotal + '€'}</td>
              <td>
                {pedido.orderStatus === 'Pending' ? (
                   <>
                   <button onClick={() => handleAccept(pedido._id)}>Aceitar</button>
                   <button onClick={() => handleReject(pedido._id)}>Rejeitar</button>
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
