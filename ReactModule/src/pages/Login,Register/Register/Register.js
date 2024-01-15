import React, { useState,useRef } from 'react';

import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import styles from"./RegisterForm.css"
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const confirmPasswordRef = useRef();
    const [userData, setUserData] = useState({
        id: null,
        firstName: "",
        lastName: "",
        Phone: "",
        Email: "",
        PassWord: "",
      });

      const setField = (e) => {
        setUserData({
          ...userData,
          [e.target.name]: e.target.value
        });
      };

      const submitForm = (e) => {
        e.preventDefault();
      
        if (password !== confirmPasswordRef.current.value) {
            alert('As senhas não correspondem!');
            return;
          }
    
        navigate("/Login");
      };
  return (
    
    
      <div className='wrappera'>
       <form onSubmit={submitForm}>
          <h1>Registrar</h1>
          <div className="input-box">
            <input type="text" placeholder='Nome(primeiro e ultimo)' id="firstName" name="firstName"  maxLength="20"   pattern="^[a-zA-Z]+(\s[a-zA-Z]+)?$" title="Insira o primeiro nome"required />
            <FaUser className="icon"/>
          </div>
          <div className="input-box">
            <input type="text" placeholder='Nome(primeiro e ultimo)' id="lastName" name="lastName"  maxLength="20"   pattern="^[a-zA-Z]+(\s[a-zA-Z]+)?$" title="Insira o ultimo nome"required />
            <FaUser className="icon"/>
          </div>
          <div className="input-box">
            <input type="email" placeholder='Endereço Eletronico' id="Email" name="Email"  required />
            <FaEnvelope className="icon"/>
          </div>
          <div className="input-box">
            <input type="text" placeholder='Telemovel' id="Phone" name="Phone"  title="Insira um numero com 9 digitos que começe por 9"   pattern="^9\d{8}$" required />
            <FaEnvelope className="icon"/>
          </div>
          <div className="input-box">
            <input type="password" placeholder='Palavra-Chave' id="PassWord" name="PassWord" onChange={e => setPassword(e.target.value)}  required />
            <FaLock className="icon"/>
          </div>
          <div className="input-box">
            <input type="password" placeholder='Confirmar Palavra-Chave'  ref={confirmPasswordRef} required />
            <FaLock className="icon"/>
          </div>
          <button>Criar Conta</button>
        </form>
        <div className="register-link">
            <a href="/Login">Voltar</a>
          </div>
      </div>
    );
    
  
}

    