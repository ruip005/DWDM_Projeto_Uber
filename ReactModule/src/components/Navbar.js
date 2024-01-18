import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import {Login} from "../pages/Login,Register/Login/Login.js";
import {Register} from "../pages/Login,Register/Register/Register.js";
import MyRestaurante from "../pages/MyRestaurante/MyRestaurante.js";
import axios from "axios";
import React, { useState, useEffect } from 'react';


const Navbar = () => {

  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = async () => {
    const url = "http://192.168.1.102:9000/user/infos";
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.get(url, { userId });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const checkUse = () => {
    const firstname = localStorage.getItem("firstName");
    const lastname = localStorage.getItem("lastName");
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    return firstname && lastname && email && token;
  };

  useEffect(() => {
    if (checkUse()) {
      getUserInfo().then(data => setUserInfo(data));
    }
  }, []);


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
    <NavLink to="/login" element={<Login />} className={styles.navLink}>
      Entrar
    </NavLink>
    <NavLink
      to="/register"
      element={<Register />}
      className={styles.navLink}
    >
      Registar
    </NavLink>
  </>
) : (
  <NavLink to="/logout" className={styles.navLink}>
    Logout
  </NavLink>
)}
          </div>
        </div>
      </nav>
    </>
  );

};

export default Navbar;
