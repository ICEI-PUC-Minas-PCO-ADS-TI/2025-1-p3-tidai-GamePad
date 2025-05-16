import React from 'react';
import './register.css';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className='containerRegister'>
      <div className='containerImageRegister'></div>
      <div className="containerFormRegister">
        <div className='headerTitleRegister'>
          <h1>Registro</h1>
          <p className="descriptionRegister">Bem vindo! Faça seu cadastro para acessar o conteúdo do site.</p>
        </div>

        <form>
          <div className="contentInputRegister">
            <label htmlFor="name-text">Nome</label>
            <input type="text" name="name-text" id="name-text" />
          </div>
          <div className="contentInputRegister">
            <label htmlFor="cnpj-text">E-mail</label>
            <input type="text" name="cnpj-text" id="cnpj-text" />
          </div>
          <div className="contentInputRegister">
            <label htmlFor="email-text">Senha</label>
            <input type="email" name="email-text" id="email-text" />
          </div>
          <div className="contentInputRegister">
            <label htmlFor="senha-text">Repetir a senha</label>
            <input type="password" name="senha-text" id="senha-text" />
          </div>
          <button type="submit">Cadastrar</button>
          <div className="containerNavRegister">
            <Link to='/login'>
              <p>Já possui uma conta? <a href='#'>Entrar</a></p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
