import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logoLogin from '../../assets/images/logoLogin.svg';

import './styles.css';

export default function Login(): JSX.Element {
  return (
    <div id="page-login">
      <aside>
        <img src={logoLogin} alt="Logo" />
        <div className="location">
          <strong>Entre-Rios</strong>
          <span>Bahia</span>
        </div>
      </aside>

      <div className="content-form">
        <Link to="/" className="back-home">
          <FiArrowLeft size={24} color="#29B6D1" />
        </Link>
        <form className="login-form">
          <fieldset>
            <legend>Fazer Login</legend>

            <div className="input-block">
              <label htmlFor="email">Email</label>
              <input type="email" />
            </div>

            <div className="input-block">
              <label htmlFor="password">Senha</label>
              <input id="password" type="password" />
            </div>

            <div className="input-block remember">
              <label htmlFor="remember">
                <input id="remember" type="checkbox" />
                Lembrar-me
              </label>

              <Link to="/login/retrieve">Esqueci minha senha</Link>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
