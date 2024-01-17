import React, { useState } from 'react';
import './Admin.css';
import RestaurantesList from '../Restaurantes/RestaurantesLista';
import CreateRestaurant from './CreateRestaurant/Create'; // Import the CreateRestaurant component
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [selectedTable, setSelectedTable] = useState('');
  const [restaurantes, setRestaurantes] = useState(RestaurantesList);
  const Navigate = useNavigate();


  const handleRestaurantClick = (restaurantId) => {
    // Redirect to the specific restaurant page
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

  const pedidos = [
    {
      id: 1,
      user: 'Administrador',
      restaurant: 'McDonalds',
      items: [
        { name: 'Fumo Azul', quantity: 2 },
        { name: 'Fumo Vermelho', quantity: 1 },
      ],
    },
    {
      id: 2,
      user: 'DonoMcDonalds',
      restaurant: 'Burguer King',
      items: [
        { name: 'Hamburger', quantity: 1 },
        { name: 'Batatas Fritas', quantity: 3 },
      ],
    },
  ];

  return (
    <div>
      <h1>Admin Page</h1>
      <button onClick={() => setSelectedTable('Restaurantes')}>Restaurantes</button>
      <button onClick={() => setSelectedTable('Pedidos')}>Pedidos</button>
      <button onClick={() => setSelectedTable('Users')}>Users</button>

      {selectedTable === 'Restaurantes' && (
        <div>
          <button onClick={() => Navigate('./create')}>Criar Restaurante</button>
          <table className='tableAdmin'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {restaurantes.map((restaurante) => (
                <tr key={restaurante.id}>
                  <td>{restaurante.id}</td>
                  <td
                    style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                    onClick={() => handleRestaurantClick(restaurante.id)}
                  >
                    {restaurante.name}
                  </td>
                  <td>
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
              <th>ID</th>
              <th>User</th>
              <th>Restaurant</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.user}</td>
                <td>{pedido.restaurant}</td>
                <td>{pedido.items.map(item => `${item.name} (${item.quantity})`).join(', ')}</td>
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
                  {/* Dropdown for the 'Role' column */}
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
