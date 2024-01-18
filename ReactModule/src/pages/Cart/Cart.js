import React, { useState } from 'react';
import styles from'./Cart.module.css';
import { useEffect } from 'react';

const Cart = ({ cartItems, setCartItems }) => {
    const [price, setPrice] = useState(0);

    const handleRemove = (itemToRemove) => {
        setCartItems(cartItems.filter(item => item !== itemToRemove));
    };

    const handleadd = (itemToAdd) => {
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

    useEffect(() => {
        handleprice();
    });


    const handleprice = () => {
        let ans = 0;
        cartItems.map(item => {
            ans += item.price * item.quantity;
        });
        setPrice(ans);
    };

    const handleminus = (itemToMinus) => {
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


    return (
        <article>
{
    cartItems?.map((item) => (
        <div className={styles.cart_box}>
            <div className={styles['cart_img']}>
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
            </div>
            <div>
                <button onClick={() => handleadd(item)}>+</button>
                <button>{item.quantity}</button>
                <button onClick={() => handleminus(item)}>-</button>
            </div>
            <div>
                <span>{item.price}</span>
                <button onClick={() => handleRemove(item)}>Remove</button>  
            </div>
        </div>
    ))
}
        <div className={styles.total}>
            <span>Preço Total:</span>
            <span>{price}€</span>
        </div>
       <button className={styles.finishbuy}>Finalizar Compra</button>
        </article>
    );
};

export default Cart;
