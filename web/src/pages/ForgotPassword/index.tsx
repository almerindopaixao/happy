import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import SidebarLogin from '../../components/SidebarLogin';

import './styles.css';

export default function ForgotPassword(): JSX.Element {
  return (
    <div id="page-login">
      <SidebarLogin />

      <div className="content-form">
        <Link to="/login" className="back-home">
          <FiArrowLeft size={24} color="#29B6D1" />
        </Link>
        <form className="login-form">
          <fieldset>
            <legend>Esqueci a senha</legend>

            <div className="description">
              <span>
                Sua redefinição de senha será enviada <br></br> para o e-mail
                cadastrado
              </span>
            </div>

            <div className="input-block">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" />
            </div>

            <button className="confirm-button" type="submit">
              Entrar
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
