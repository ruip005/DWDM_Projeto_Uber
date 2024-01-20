import pedidos from '../Cart/PedidosLista';
import { useParams, Link } from 'react-router-dom';
import RestaurantesList from '../Restaurantes/RestaurantesLista';
import { useState, useEffect } from 'react';

function Pedidos() {
  const { restaurantId } = useParams();

  const [restaurantInfo, setRestaurantInfo] = useState({
    name: '',
    logo: '',
    workingDays: {},
  });

  useEffect(() => {
    const fetchedRestaurant = RestaurantesList.find(restaurant => restaurant.id === restaurantId);

    if (fetchedRestaurant) {
      setRestaurantInfo({
        name: fetchedRestaurant.name,
        logo: fetchedRestaurant.image,
        workingDays: fetchedRestaurant.workingDays,
      });
    }
  }, [restaurantId]);

  return (
    <div>
      <h1>{restaurantInfo.name} Pedidos</h1>
      <table className='tableAdmin'>
        <thead>
          <tr>
            <th>User</th>
            <th>Restaurant</th>
            <th>Items</th>
            <th>Preço Total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.user}</td>
              <td>{pedido.restaurant}</td>
              <td>
                {pedido.items.map((item, index) => (
                  `${item.name}(${item.quantity})`
                )).join(',').slice(0, 30)}
                {pedido.items.map((item, index) => (
                  `${item.name}(${item.quantity})`
                )).join(',').length > 30 ? '...' : ''}
              </td>
              <td>{pedido.total_price + '€'}</td>
              <td>
                {pedido.status === 'Pendente' ? (
                  <Link to={`/Pedidos/${pedido.id}`}>
                    <button>Pendente</button>
                  </Link>
                ) : (
                  <span>{pedido.status}</span>
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
