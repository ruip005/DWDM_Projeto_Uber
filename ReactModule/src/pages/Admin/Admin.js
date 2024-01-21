import React, { useState, useEffect } from 'react';
import './Admin.css';
import RestaurantesList from '../Restaurantes/RestaurantesLista';
import CreateRestaurant from './CreateRestaurant/Create';
import { useNavigate, Link } from 'react-router-dom';
import pedidos from '../Cart/PedidosLista';

function Admin({ PedidosLista }) {
  const [selectedTable, setSelectedTable] = useState('');
  const [restaurantes, setRestaurantes] = useState(RestaurantesList);
  const Navigate = useNavigate();

  const handleRestaurantClick = (restaurantId) => {
    Navigate(`/myrestaurant/${restaurantId}`);
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Administrador',
      role: 'Admin',
      isAdmin: true,
    },
    {
      id: 2,
      name: 'DonoMcDonalds',
      role: 'McDonalds',
      isAdmin: false,
    },
  ]);

  useEffect(() => {
    const updateRestaurantes = (updatedList) => {
      setRestaurantes(updatedList);
    };
  }, []);

  return (
    <div>
      <h1>Admin Page</h1>
      <button onClick={() => setSelectedTable('Restaurantes')}>Restaurantes</button>
      <button onClick={() => setSelectedTable('Pedidos')}>Pedidos</button>
      <button onClick={() => setSelectedTable('Users')}>Users</button>

      {selectedTable === 'Restaurantes' && (
        <div>
          <Link to="./create">
            <button>Criar Restaurante</button>
          </Link>
          <table className='tableAdmin'>
            <thead>
              <tr className='grid-container-admin'>
                <th className='grid-item-admin '>Name</th>
                <th className='grid-item-admin'> Image</th>
              </tr>
            </thead>
            <tbody>
              {restaurantes.map((restaurante) => (
                <tr key={restaurante.id}>
                  <button
                    type='button'
                    onClick={() => handleRestaurantClick(restaurante.id)}
                  >
                    {restaurante.name}
                  </button>
                  <td className='restaurante-img'>
                    <img
                      src={restaurante.image}
                      alt={restaurante.name}
                      style={{ width: '50px', height: '50px' }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedTable === 'Pedidos' && (
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
            {PedidosLista.map((pedido) => (
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
                <td>{pedido.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedTable === 'Users' && (
        <table className='tableAdmin'>
          <thead>
            <tr className='topicsAdmin'>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>IsAdmin?</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) =>
                      setUsers((prevUsers) =>
                        prevUsers.map((u) =>
                          u.id === user.id ? { ...u, role: e.target.value } : u
                        )
                      )
                    }
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                    {restaurantes.map((restaurante) => (
                      <option key={restaurante.id} value={restaurante.name}>
                        {restaurante.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  {/* Checkbox for the 'Admin' role */}
                  <input
                    type='checkbox'
                    checked={user.isAdmin}
                    onChange={(e) =>
                      setUsers((prevUsers) =>
                        prevUsers.map((u) =>
                          u.id === user.id ? { ...u, isAdmin: e.target.checked } : u
                        )
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Admin;
