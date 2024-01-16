import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import {Login} from "../pages/Login,Register/Login/Login.js";
import {Register} from "../pages/Login,Register/Register/Register.js";
import { MyRestaurante } from "../pages/MyRestaurante/MyRestaurante.js";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <img className={styles.navImg} src="./logo.png" alt="Logo" />

      <ul className={styles.navList}>
        <li>
          <NavLink to="/admin" className={styles.navLink}>
            Admin
          </NavLink>
        </li>
        <li>
          <NavLink to="/myrestaurant" element={<MyRestaurante/>}className={styles.navLink}>
            MyRestaurant
          </NavLink>
        </li>
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
          <NavLink to="/login" element={<Login />} className={styles.navLink}>
            Entrar
          </NavLink>
          <NavLink to="/register" element={<Register/>} className={styles.navLink}>
            Registar
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
