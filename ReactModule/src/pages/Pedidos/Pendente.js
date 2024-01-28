import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Pendente = () => {
  const { pedidoId } = useParams();
  const [pedidoInfo, setPedidoInfo] = useState({});
  const Navigate = useNavigate();
  const [pedidosLista, setPedidosLista] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `http://localhost:9000/system/orders/${pedidoId}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        const data = response.data;
        if (data.success) {
          setPedidoInfo(data.order);
        } else {
          console.error("API request for order details was not successful");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrders();
  }, [pedidoId]);

  const handleAccept = () => {
    // Assuming pedidoInfo is the current pedido based on pedidoId
    const updatedPedidosLista = pedidosLista.map(pedido =>
      pedido.id === pedidoId ? { ...pedido, status: 'Aceite' } : pedido
    );

    setPedidosLista(updatedPedidosLista);
    console.log(updatedPedidosLista);

    Navigate(-1);
  }

  return (
    <div>
      <h1>Detalhes do pedido</h1>
      <h3>Restaurante: {pedidoInfo.restaurant}</h3>
      <h3>Cliente: {pedidoInfo.user}</h3>
      <h3>Items</h3>
      <ul>
        {pedidoInfo.items && pedidoInfo.items.map(item => (
          <li key={item.name}>
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>
      <h3>Preço Total {pedidoInfo.total_price}€</h3>
      <h3>Estado: {pedidoInfo.status}</h3>
      <button onClick={() => handleAccept()}>Aceitar</button>
      <button>Recusar</button>
    </div>
  );
};

export default Pendente;
