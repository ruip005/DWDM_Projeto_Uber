import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import RestaurantesList from "../Restaurantes/RestaurantesLista";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Modal.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const Cart = ({ cartItems, setCartItems, setPedidosLista, PedidosLista }) => {
  const [modal, setModal] = useState(false);
  const [price, setPrice] = useState(0);
  const [items, setItems] = useState([]);
  const [estado, setEstado] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [address, setAddress] = useState("");
  const Navigate = useNavigate();
  const restaurantId = cartItems[0]?.restaurantId;

  const token = localStorage.getItem("token");

  let decoded;

  try {
    decoded = jwtDecode(token);
    //console.log("Token decodificado:", decoded);
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
  }

  const toggleModal = () => {
    if (!restaurantId || cartItems.length === 0) {
      toast.error("Carrinho Vazio");
      return;
    }

    setModal(!modal);
  };

  const handleRemove = (itemToRemove) => {
    setCartItems(cartItems.filter((item) => item._id !== itemToRemove._id));
  };

  const handleAdd = (itemToAdd) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === itemToAdd._id) {
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
      } else if (item._id === itemToMinus._id) {
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
      ans += item.itemPrice * item.quantity;
    });
    setPrice(ans);
  };

  useEffect(() => {
    // Map the cart items whenever cartItems change
    const updatedItems = cartItems.map((item) => ({
      name: item.itemName,
      quantity: item.quantity,
    }));

    // Update the state with the new items
    setItems(updatedItems);
  }, [cartItems]);

  const handlePedido = async () => {
    try {
      const url = `http://localhost:9000/system/order`;

      const response = await axios.post(
        url,
        {
          userId: decoded.userId,
          restaurantId: restaurantId,
          items: items,
          orderAddress: address,
          orderCity: "a", // You may update this field based on your data
          orderState: decoded.state,
          orderZip: "A", // You may update this field based on your data
          orderPaymentMethod: paymentMethod,
          orderTotal: price,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log(response.data);
      setCartItems([]);
      Navigate("/");
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

  const handleEstadoChange = (event) => {
    setEstado(event.target.value);
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
              <div className={styles.cart_img}>
                <img src={item.image} alt={item.itemName} />
                <p>{item.itemName}</p>
              </div>
              <spam>
                <button onClick={() => handleAdd(item)}>+</button>
                <button>{item.quantity}</button>
                <button onClick={() => handleMinus(item)}>-</button>
              </spam>
              <div>
                <span>{item.itemPrice}</span>
                <button onClick={() => handleRemove(item)}>X</button>
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
                    <option value="paypal">Dinheiro</option>
                  </select>
                </label>
                <br />
                <label>
                  Estado:
                  <input
                    type="text"
                    value={decoded.state}
                    onChange={handleEstadoChange}
                  />
                </label>
                <br />
                <label>
                  Endereço:
                  <input
                    type="text"
                    value={decoded.address}
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
