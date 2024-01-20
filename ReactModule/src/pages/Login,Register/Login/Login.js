import React, { useState, useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import styles from "./Login.module.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Recupera as informações de lembrar-me do localStorage durante a inicialização
  useEffect(() => {
    const storedUsername = localStorage.getItem("rememberedUsername");
    const storedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (storedRememberMe && storedUsername) {
      setUsername(storedUsername);
      setRememberMe(storedRememberMe);
    }
  }, []);

  const login = () => {
    const url = "http://localhost:9000/user/login";

    axios
      .post(url, {
        username: username,
        password: password,
      })
      .then(function (response) {
        localStorage.setItem("token", response.data.token);

        // Se o usuário marcou a opção "lembrar-me", armazene as informações
        if (rememberMe) {
          localStorage.setItem("rememberedUsername", username);
          localStorage.setItem("rememberMe", true);
        } else {
          // Caso contrário, remova as informações antigas
          localStorage.removeItem("rememberedUsername");
          localStorage.removeItem("rememberMe");
        }

        setTimeout(() => {
          navigate("/");
        }, 4000);
        toast.success("Login realizado com sucesso!");
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.response.data.message || "Erro ao realizar login!");
        setPassword("");
      });
  };

  return (
    <>
      <ul className={styles.background}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
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
            <>
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Lembrar-me
              </label>
            </>
          </div>
          <button type="button" onClick={login}>
            Entrar
          </button>
          <div className={styles.registerLink}>
            Não tem uma conta? <a href="/Register">Registre-se</a>
          </div>
        </form>
      </div>
      {/* ToastContainer for displaying notifications */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </>
  );
};

export default Login;
