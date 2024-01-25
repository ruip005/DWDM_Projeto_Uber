import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { Login } from "../pages/Auth/Login/Login.js";
import { Register } from "../pages/Auth/Register/Register.js";
import MyRestaurante from "../pages/MyRestaurante/MyRestaurante.js";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = (cartItems) => {
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = async () => {
    const url = `http://192.168.1.115:9000/user/infos`;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        // Lidar com a ausência de token, se necessário
        return null;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      // Lidar com erros de requisição
      console.log(error);
    }
  };

  const checkUse = () => {
    const token = localStorage.getItem("token");

    return token;
  };

  useEffect(() => {
    if (checkUse()) {
      getUserInfo().then((data) => {
        setUserInfo(data);
        console.log(data);
      });
    }
  }, []);
  console.log(cartItems.cartItems);

  return (
    <>
      <nav className={styles.navbar}>
        <img className={styles.navImg} src="./logo.png" alt="Logo" />
        <ul className={styles.navList}>
          {userInfo?.haveAdmin && (
            <li>
              <NavLink to="/admin" className={styles.navLink}>
                Admin
              </NavLink>
            </li>
          )}
          {userInfo?.haveStaff && (
            <li>
              <NavLink
                to="/myrestaurant"
                element={<MyRestaurante />}
                className={styles.navLink}
              >
                MyRestaurant
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/" className={styles.navLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/restaurantes" className={styles.navLink}>
              Restaurantes
            </NavLink>
          </li>
          <li>
            <NavLink to="/sobre" className={styles.navLink}>
              Sobre
            </NavLink>
          </li>
        </ul>
        <div className={styles.itemNav}>
          <div className={styles.optionsNav}>
            {!checkUse() ? (
              <>
                <NavLink
                  to="/login"
                  element={<Login />}
                  className={styles.navLink}
                >
                  Entrar
                </NavLink>
                {/*<NavLink
                  to="/register"
                  element={<Register />}
                  className={styles.navLink}
                >
                  Registar
            </NavLink>*/}
              </>
            ) : (
              <>
                <span className={styles.cart}>
                  <Link to="/cart">
                    <FaShoppingCart
                      style={{ position: "absolute", right: "170px" }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        right: "154px",
                        top: "10px",
                      }}
                      className={styles.cartCount}
                    >
                      {cartItems.cartItems.length}
                    </span>
                  </Link>
                </span>
                <NavLink
                  to="/"
                  className={styles.navLink}
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  }}
                >
                  Logout
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
