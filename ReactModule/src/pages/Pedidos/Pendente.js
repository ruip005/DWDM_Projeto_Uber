import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import pedidos from '../Cart/PedidosLista';
import { useNavigate } from 'react-router-dom';

const Pendente = ({ setPedidosLista }) => {
  const { pedidoId } = useParams();
  const Navigate = useNavigate();

  const [pedidoInfo, setpedidoInfo] = useState({
    user: '',
    restaurant: '',
    items: [],
    total_price: '',
    status: '',
  });

  const handleAccept = () => {
    const updatedPedidosLista = pedidos.map(pedido =>
      pedido.id === Number(pedidoId) ? { ...pedido, status: 'Aceite' } : pedido
    );

    setPedidosLista(updatedPedidosLista);
    console.log(updatedPedidosLista);

    Navigate(-1);
  }

  useEffect(() => {
    const fetchedPedido = pedidos.find(pedido => pedido.id === Number(pedidoId));

    if (fetchedPedido) {
      setpedidoInfo({
        user: fetchedPedido.user,
        restaurant: fetchedPedido.restaurant,
        items: fetchedPedido.items,
        total_price: fetchedPedido.total_price,
        status: fetchedPedido.status,
      });
    } else {
      console.log('Order not found');
    }
  }, [pedidoId]);

  return (
    <div>
      <h1>Detalhes do pedido</h1>
      <h3>Restaurante: {pedidoInfo.restaurant}</h3>
      <h3>Cliente: {pedidoInfo.user}</h3>
      <h3>Items</h3>
      <ul>
        {pedidoInfo.items.map(item => (
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
