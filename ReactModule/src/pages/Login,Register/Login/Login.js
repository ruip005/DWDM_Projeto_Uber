import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import styles from "./LoginForm.css"


export const Login = () => {
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
      </ul>
      <div className={styles.wrapper}>
  <form>
    <h1>Login</h1>
    <div className={styles.inputBox}>
      <input type="text" placeholder='Endreço Eletronico' required />
      <FaUser className={styles.icon}/>
    </div>
    <div className={styles.inputBox}>
      <input type="password" placeholder='Palavra-Chave' required />
      <FaLock className={styles.icon}/>
    </div>
    <div className={styles.rememberForgot}>
      <label>
        <input type="checkbox" />Lembrar-me
      </label>
      <a href="#">Esqueceu Password</a>
    </div>
    <button>Login</button>
    <div className={styles.registerLink}>
      Não tem conta? <a href="/Register">Registra-te</a>
    </div>
  </form>
</div>
    </>
    );
    
  
}

    