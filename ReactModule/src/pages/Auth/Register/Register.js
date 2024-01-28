import React, { useState, useRef } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import styles from "./RegisterForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Register = () => {
  const navigate = useNavigate();
  const confirmPasswordRef = useRef();
  const [userData, setUserData] = useState("");

  const setField = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const validatePasswords = () => {
    return userData.password === confirmPasswordRef.current.value;
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (!validatePasswords()) {
      toast.info("As senhas não coincidem!");
      //alert("As senhas não coincidem!");
      return;
    }

    if (!userData.lastName.trim()) {
      toast.info("O último nome é obrigatório!");
      //alert("O último nome é obrigatório!");
      return;
    }

    const url = "http://localhost:9000/user/profile";
    axios
      .post(url, {
        name: userData.lastName,
        email: userData.Email,
        phone: userData.Phone,
        password: userData.password,
      })
      .then(function (response) {
        setTimeout(() => {
          navigate("/Login");
        }, 3000);
        toast.success("Conta criada com sucesso!");
      })
      .catch(function (error) {
        try {
          console.log(error.response.data);
          toast.error(error.response.data.message);
        } catch (err) {
          toast.error("Erro ao criar conta!");
        }
      });
  };

  return (
    <>
      <ul class="background">
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
      <div className="wrappera">
        <form onSubmit={submitForm}>
          <h1>Registrar</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Nome (primeiro e último)"
              id="lastName"
              name="lastName"
              maxLength="20"
              pattern="^[a-zA-Z]+(\s[a-zA-Z]+)?$"
              title="Insira o último nome"
              required
              onChange={setField}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="Endereço Eletronico"
              id="Email"
              name="Email"
              required
              onChange={setField}
            />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Telemovel"
              id="Phone"
              name="Phone"
              title="Insira um numero com 9 digitos que começe por 9"
              pattern="^9\d{8}$"
              required
              onChange={setField}
            />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input
              name="password"
              type="password"
              placeholder="Palavra-Chave"
              id="PassWord"
              onChange={setField}
              required
            />
            <FaLock className="icon" />
          </div>
          <div className="input-box">
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirmar Palavra-Chave"
              ref={confirmPasswordRef}
              required
              onChange={setField}
            />
            <FaLock className="icon" />
          </div>
          <button>Criar Conta</button>
        </form>
        <div className="register-link">
          <a href="/Login">Voltar</a>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </>
  );
};
