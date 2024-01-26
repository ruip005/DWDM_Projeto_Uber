import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import pedidos from "./PedidosLista"; // Make sure this import is correct
import RestaurantesList from "../Restaurantes/RestaurantesLista";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Modal.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const Cart = ({ cartItems, setCartItems, setPedidosLista, PedidosLista }) => {
  const [modal, setmodal] = useState(false);
  const [price, setPrice] = useState(0);
  const [items, setItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [address, setAddress] = useState("");
  const Navigate = useNavigate();
  const restaurantId = cartItems[0]?.restaurantId;

  const token = localStorage.getItem("token");

  let decoded;

  try {
    decoded = jwtDecode(token);
    console.log("Token decodificado:", decoded);
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
  }

  const restaurant = RestaurantesList.find(
    (restaurant) => restaurant.id === restaurantId
  );

  const toggleModal = () => {
    if (!restaurantId || cartItems.length === 0) {
      toast.error("Carrinho Vazio");
      return;
    }

    setmodal(!modal);
  };

  const [usersList, setUsersList] = useState([]);

  const handleRemove = (itemToRemove) => {
    setCartItems(cartItems.filter((item) => item !== itemToRemove));
  };

  const handleAdd = (itemToAdd) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item === itemToAdd) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const handleMinus = (itemToMinus) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.quantity === 1) {
        console.log("Cannot have less than 1 item in the cart");
      } else if (item === itemToMinus) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const handlePrice = () => {
    let ans = 0;
    cartItems.forEach((item) => {
      ans += item.price * item.quantity;
    });
    setPrice(ans);
  };
  useEffect(() => {
    // Map the cart items whenever cartItems change
    const updatedItems = cartItems.map((item) => ({
      name: item.name,
      quantity: item.quantity,
    }));

    // Update the state with the new items
    setItems(updatedItems);
  }, [cartItems]);

  /*const handlePedido = () => {
    const restaurantId = cartItems[0]?.restaurantId;

    if (!restaurantId) {
      console.log('No items in the cart or invalid restaurant ID.');
      return;
    }

    const restaurant = RestaurantesList.find(restaurant => restaurant.id === restaurantId);

    const newOrder = {
      id: pedidos.length + 1,
      user: 'algumuser',
      restaurant: restaurant.name,
      items: cartItems.map(item => ({ name: item.name, quantity: item.quantity })),
      total_price: price,
      status: 'Pendente'
    };

    setPedidosLista(prevPedidos => [...prevPedidos, newOrder]); 

    setCartItems([]);
    Navigate('/cart/confirmation');
    console.log('New order:', newOrder);
  };*/
  const handlePedido = async () => {
    try{
      console.log("1")
      //const token = localStorage.getItem("token");
      const url = `http://localhost:9000/system/order`;
      console.log("2")
      
      const response = await axios.post(
        url,
        {
          userId: decoded.userId,
          restaurantId: restaurant.id,
          items: items,
          orderAddress: "adaw",
          //add user.adress,user.city,user.state,user.zip
          orderCity: "a",
          orderState: decoded.state,
          orderZip: "A",
          orderPaymentMethod: paymentMethod,
          orderTotal: price,
        },
        {
          headers: {
            Authorization: token,
          },
        },     
         );

      console.log(response.data);
      Navigate(-1);
    } catch (error) {
      console.error("Error making POST request:", error.message);
      console.log("Request config:", error.config);
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      }
    }
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    handlePrice();
  }, [cartItems]);

  return (
    <>
      <article>
        {cartItems?.map((item) => {
          return (
            <div className={styles.cart_box} key={item.id}>
              <div className={styles["cart_img"]}>
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
              </div>
              <div>
                <button
                  className={styles["botao-feio"]}
                  onClick={() => handleAdd(item)}
                >
                  +
                </button>
                <button className={styles["botao-feio"]}>
                  {item.quantity}
                </button>
                <button
                  className={styles["botao-feio"]}
                  onClick={() => handleMinus(item)}
                >
                  -
                </button>
              </div>
              <div>
                <span>{item.price}</span>
                <button
                  className={styles["botao-feio"]}
                  onClick={() => handleRemove(item)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}

        <div className={styles.total}>
          <span>Preço Total:</span>
          <span>{price}€</span>
        </div>
        <button className={styles.finishbuy} onClick={toggleModal}>
          Finalizar Compra
        </button>
      </article>

      {modal && (
        <div className="modal">
          <div className="overlay">
            <div className="modal-content">
              <h1>Confirmation Page</h1>
              <form onSubmit={handleSubmit}>
                <label>
                  Payment Method:
                  <select
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                  >
                    <option value="">Select Payment Method</option>
                    <option value="mbway">MBWay</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </label>
                <br />
                <label>
                  Estado:
                  <input
                    type="text"
                    value={decoded.state}
                    onChange={handleAddressChange}
                  />
                </label>
                <br />
                <button
                  type="submit"
                  onClick={() => {
                    handlePedido();
                  }}
                >
                  Confirm
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </>
  );
};

export default Cart;
