import React from 'react';
import './login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='containerLogin'>
      <div className='containerImage'></div>
      <div className="containerFormLogin">
        <div className='headerTitle'>
          <h1>Login</h1>
          <p className="description">Bem vindo! Entre com seus dados para acessar o conteúdo do site.</p>
        </div>

        <form>
          <div className="contentInput">
            <label htmlFor="email-text">E-mail</label>
            <input type="email" name="email-text" id="email-text" />
          </div>
          <div className="contentInput">
            <label htmlFor="senha-text">Senha</label>
            <input type="password" name="senha-text" id="senha-text" />
          </div>
          <button type="submit">Entrar</button>
        </form>

        <div className="containerNav">
          <Link to='/register'><p>Novo usuário? <a href="#">Inscrever-se</a></p></Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
