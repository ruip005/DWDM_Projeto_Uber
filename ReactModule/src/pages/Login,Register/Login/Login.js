import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import "./LoginForm.css"


export const Login = () => {
  return (
    
      <div className='wrapper'>
        <form>
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder='Endreço Eletronico' required />
            <FaUser className="icon"/>
          </div>
          <div className="input-box">
            <input type="password" placeholder='Palavra-Chave' required />
            <FaLock className="icon"/>
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />Lembrar-me
            </label>
            <a href="#">Esqueceu Password</a>
          </div>
          <button>Login</button>
          <div className="register-link">
            Não tem conta? <a href="/Register">Registra-te</a>
          </div>
        </form>
      </div>
    );
    
  
}

    