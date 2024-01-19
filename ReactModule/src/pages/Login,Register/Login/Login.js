import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import styles from "./Login.module.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const login = () => {
    const url = 'http://192.168.1.102:9000/user/login';

    axios.post(url, {
      username: username,
      password: password
    })
    .then(function (response) {
      toast.success("Login realizado com sucesso!");
      localStorage.setItem("token", response.data.token);
    })
    .catch(function (error) {
      console.log(error);
      toast.error("Erro ao realizar login!");
    });
  }

  return (
    <>
      <ul className={styles.background}>
      </ul>
      <div className={styles.wrapper}>
        <form>
          <h1>Login</h1>
          <div className={styles.inputBox}>
            <input
              type="text"
              placeholder="Endereço Eletrônico"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUser className={styles.icon} />
          </div>
          <div className={styles.inputBox}>
            <input
              type="password"
              placeholder="Palavra-chave"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className={styles.icon} />
          </div>
          <div className={styles.rememberForgot}>
            <label>
              <input type="checkbox" />Lembrar-me
            </label>
            <a href="#">Esqueceu a senha</a>
          </div>
          <button type="button" onClick={login}>
            Entrar
          </button>
          <div className={styles.registerLink}>
            Não tem uma conta? <a href="/Register">Registre-se</a>
          </div>
        </form>

        {/* ToastContainer for displaying notifications */}
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      </div>
    </>
  );
};

export default Login;
