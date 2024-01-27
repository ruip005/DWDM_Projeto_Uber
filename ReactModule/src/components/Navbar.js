import { NavLink, Navigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { Login } from "../pages/Auth/Login/Login.js";
import { Register } from "../pages/Auth/Register/Register.js";
import MyRestaurante from "../pages/MyRestaurante/MyRestaurante.js";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const Navbar = (cartItems) => {
  const checkUser = () => {
    if (localStorage.getItem("token") == null) {
      return null;
    }
    const token = jwtDecode(localStorage.getItem("token"));

    if (token.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      return null;
    }
    return token;
  };

  return (
    <>
      <nav className={styles.navbar}>
        <img className={styles.navImg} src="./logo.png" alt="Logo" />
        <ul className={styles.navList}>
          {checkUser() != null && checkUser().isAdmin && (
            <li>
              <NavLink to="/admin" className={styles.navLink}>
                Admin
              </NavLink>
            </li>
          )}
          {checkUser() != null && checkUser().isStaff != null && (
            <li>
              <NavLink
                to={`/myrestaurant/${checkUser().isStaff}`}
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
            {checkUser() == null ? (
              <>
                <NavLink
                  to="/login"
                  element={<Login />}
                  className={styles.navLink}
                >
                  Entrar
                </NavLink>
              </>
            ) : (
              <>
                <span className={styles.cart}>
                  <Link to="/cart">
                    <FaShoppingCart
                      style={{ position: "absolute", right: "170px" }}
                    />
                    <span className={styles.cartCount}>
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
