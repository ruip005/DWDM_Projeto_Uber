import React, { useState, useEffect } from 'react';
import styles from './Cart.module.css';
import pedidos from './PedidosLista'; // Make sure this import is correct
import RestaurantesList from '../Restaurantes/RestaurantesLista';

const Cart = ({ cartItems, setCartItems,}) => {
  const [price, setPrice] = useState(0);

  const [restaurantInfo, setRestaurantInfo] = useState( RestaurantesList);

  const handleRemove = (itemToRemove) => {
    setCartItems(cartItems.filter(item => item !== itemToRemove));
  };

  const handleAdd = (itemToAdd) => {
    const updatedCartItems = cartItems.map(item => {
      if (item === itemToAdd) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const handleMinus = (itemToMinus) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.quantity === 1) {
        console.log('Não pode ter menos que 1 item no carrinho');
      } else if (item === itemToMinus) {
        return {
          ...item,
          quantity: item.quantity - 1
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  }

  const handlePrice = () => {
    let ans = 0;
    cartItems.forEach(item => {
      ans += item.price * item.quantity;
    });
    setPrice(ans);
  };

  useEffect(() => {
    handlePrice();
  }, [cartItems]); 

const handlePedido = () => {
   
    const restaurantId = cartItems[0].restaurantId;

   
    const restaurant = RestaurantesList.find(restaurant => restaurant.id === restaurantId);

    
    const newOrder = {
        id: pedidos.length + 1, 
        user: 'algumuser',
        restaurant: restaurant.name,
        items: cartItems.map(item => ({ name: item.name, quantity: item.quantity })) ,
        total_price: price,
        status: 'Pendente'
    };

  
    pedidos.push(newOrder);

  
    setCartItems([]);

    console.log('New order:', newOrder);
};

  return (
    <article>
      {
        cartItems?.map((item) => (
          <div className={styles.cart_box} key={item.id}>
            <div className={styles['cart_img']}>
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </div>
            <div>
              <button className={styles['botao-feio']} onClick={() => handleAdd(item)}>+</button>
              <button className={styles['botao-feio']}>{item.quantity}</button>
              <button className={styles['botao-feio']}onClick={() => handleMinus(item)}>-</button>
            </div>
            <div>
              <span>{item.price}</span>
              <button className={styles['botao-feio']} onClick={() => handleRemove(item)}>Remove</button>
            </div>
          </div>
        ))
      }
      <div className={styles.total}>
        <span>Preço Total:</span>
        <span>{price}€</span>
      </div>
      <button className={styles.finishbuy} onClick={handlePedido}>Finalizar Compra</button>
    </article>
  );
};

export default Cart;
